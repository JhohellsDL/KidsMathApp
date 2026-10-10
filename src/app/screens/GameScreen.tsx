import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, BackHandler } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  OptionCard,
  GameHeader,
  ComparisonArena,
  FeedbackBanner,
  ExitConfirmModal,
} from '../../ui/components';
import { useGameStore } from '../../state/gameStore';
import { validateExerciseAnswer, ValidationFeedback } from '../../domain/validators/exerciseValidator';
import { COLORS } from '../../ui/theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

export const GameScreen = ({ navigation }: Props) => {
  const currentExercise = useGameStore(state => state.getCurrentExercise());
  const answerQuestion = useGameStore(state => state.answerQuestion);
  const nextExercise = useGameStore(state => state.nextExercise);
  const finishGame = useGameStore(state => state.finishGame);
  const isLast = useGameStore(state => state.isLastExercise());
  const currentExerciseIndex = useGameStore(state => state.currentExerciseIndex);
  const totalExercises = useGameStore(state => state.exercises.length);
  const correctAnswers = useGameStore(state => state.correctAnswers);
  const insets = useSafeAreaInsets();

  const [selectedOption, setSelectedOption] = useState<number | string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackInfo, setFeedbackInfo] = useState<ValidationFeedback | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isExitModalVisible, setIsExitModalVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // Entrada animada suave al cargar cada ejercicio
  useEffect(() => {
    setSelectedOption(null);
    setShowFeedback(false);
    setFeedbackInfo(null);

    slideAnim.setValue(30);
    fadeAnim.setValue(0);

    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 70,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentExerciseIndex, slideAnim, fadeAnim]);

  useEffect(() => {
    const backAction = () => {
      if (isNavigating) return true;
      setIsExitModalVisible(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [isNavigating]);

  const handleConfirmExit = () => {
    setIsExitModalVisible(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  if (!currentExercise) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No hay ejercicios disponibles</Text>
      </View>
    );
  }

  const handleOptionPress = (option: number | string) => {
    if (showFeedback || isNavigating) return;

    const validation = validateExerciseAnswer(currentExercise, option);
    setSelectedOption(option);
    setFeedbackInfo(validation);
    setShowFeedback(true);

    answerQuestion(validation.isCorrect);

    // Tiempo de permanencia dinámico: rápido para acierto, tiempo de lectura para error
    const dwellTime = validation.isCorrect ? 1000 : 1750;

    setTimeout(() => {
      if (isLast) {
        setIsNavigating(true);
        finishGame();
        setTimeout(() => {
          navigation.replace('Result');
        }, 100);
      } else {
        // Transición de salida suave hacia la izquierda
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: -30,
            duration: 180,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 180,
            useNativeDriver: true,
          }),
        ]).start(() => {
          nextExercise();
        });
      }
    }, dwellTime);
  };

  const progress = totalExercises > 0 ? ((currentExerciseIndex + 1) / totalExercises) * 100 : 0;
  const isComparison = currentExercise.category === 'comparacion';

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <GameHeader
        progress={progress}
        currentIndex={currentExerciseIndex}
        totalExercises={totalExercises}
        points={correctAnswers * 10}
        correctAnswers={correctAnswers}
        onExitPress={() => setIsExitModalVisible(true)}
      />

      <View style={styles.mainContent}>
        <Animated.View
          style={[
            styles.exerciseCard,
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
            },
          ]}>
          <Text style={styles.questionText}>{currentExercise.question}</Text>

          {isComparison ? (
            <ComparisonArena
              operand1={currentExercise.operand1}
              operand2={currentExercise.operand2}
              selectedOption={selectedOption}
              showFeedback={showFeedback}
              isCorrect={feedbackInfo?.isCorrect}
            />
          ) : (
            <View style={styles.operationBox}>
              <Text style={styles.operationText}>
                {currentExercise.operand1} {currentExercise.operatorSymbol ?? '+'} {currentExercise.operand2} = ?
              </Text>
            </View>
          )}

          {currentExercise.subtext && !showFeedback && (
            <Text style={styles.subtext}>{currentExercise.subtext}</Text>
          )}
        </Animated.View>

        {showFeedback && feedbackInfo && (
          <FeedbackBanner
            isCorrect={feedbackInfo.isCorrect}
            message={feedbackInfo.message}
            explanation={feedbackInfo.explanation}
          />
        )}

        <Animated.View
          style={[
            styles.optionsArea,
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
            },
          ]}>
          <View style={[styles.optionsGrid, isComparison && styles.optionsGridComparison]}>
            {currentExercise.options.map(option => {
              const isSelected = selectedOption === option;
              const isCorrectAnswer = String(option).trim() === String(currentExercise.correctAnswer).trim();
              const isCorrect = showFeedback && isSelected && isCorrectAnswer;
              const isWrong = showFeedback && isSelected && !isCorrectAnswer;
              const isRevealedCorrect = Boolean(
                showFeedback && !feedbackInfo?.isCorrect && isCorrectAnswer
              );
              const isDimmed = Boolean(showFeedback && !isSelected && !isRevealedCorrect);

              return (
                <View
                  key={String(option)}
                  style={[styles.optionItem, isComparison && styles.optionItemComparison]}>
                  <OptionCard
                    value={option}
                    onPress={() => handleOptionPress(option)}
                    isSelected={isSelected}
                    isCorrect={isCorrect}
                    isRevealedCorrect={isRevealedCorrect}
                    isWrong={isWrong}
                    isDimmed={isDimmed}
                    disabled={showFeedback}
                  />
                </View>
              );
            })}
          </View>
        </Animated.View>
      </View>

      <ExitConfirmModal
        visible={isExitModalVisible}
        onConfirm={handleConfirmExit}
        onCancel={() => setIsExitModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  exerciseCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
    marginBottom: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 14,
    textAlign: 'center',
  },
  operationBox: {
    marginVertical: 8,
    paddingVertical: 6,
  },
  operationText: {
    fontSize: 40,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtext: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 6,
  },
  optionsArea: {
    flex: 1,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  optionsGridComparison: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 10,
  },
  optionItem: {
    width: '48%',
  },
  optionItemComparison: {
    flex: 1,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.danger,
    textAlign: 'center',
    marginTop: 100,
  },
});

