import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  BackHandler,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ButtonBig, AdBanner, StatsOverview, PointsCard } from '../../ui/components';
import { useGameStore } from '../../state/gameStore';
import { useRewardedAd } from '../../utils/useRewardedAd';
import { COLORS } from '../../ui/theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export const ResultScreen = ({ navigation }: Props) => {
  const totalExercises = useGameStore(state => state.exercises.length);
  const correctAnswers = useGameStore(state => state.correctAnswers);
  const totalPoints = useGameStore(state => state.totalPoints);
  const activeCategory = useGameStore(state => state.activeCategory);
  const doublePoints = useGameStore(state => state.doublePoints);

  const { showRewardedAd, loaded: isRewardedLoaded } = useRewardedAd();
  const [hasDoubled, setHasDoubled] = useState(false);
  const insets = useSafeAreaInsets();

  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      return true;
    });

    return () => backHandler.remove();
  }, [scaleAnim, fadeAnim, navigation]);

  const percentage = totalExercises > 0 ? Math.round((correctAnswers / totalExercises) * 100) : 0;

  const getMessage = () => {
    if (percentage === 100) return '¡Excelente Trabajo! 🏆';
    if (percentage >= 80) return '¡Muy Bien Hecho! 🌟';
    if (percentage >= 60) return '¡Buen Esfuerzo! 👏';
    return '¡A Seguir Practicando! 💪';
  };

  const getCategoryName = () => {
    switch (activeCategory) {
      case 'resta':
        return 'Práctica de Restas';
      case 'comparacion':
        return 'Mayor, menor o igual';
      case 'suma':
      default:
        return 'Práctica de Sumas';
    }
  };

  const handlePlayAgain = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const handleDoublePoints = () => {
    showRewardedAd(() => {
      doublePoints();
      setHasDoubled(true);
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top, paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.content,
            {
              transform: [{ scale: scaleAnim }],
              opacity: fadeAnim,
            },
          ]}>
          {/* Badge de actividad */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{getCategoryName()}</Text>
          </View>

          {/* Emoji y Título de Felicitación */}
          <View style={styles.headerContainer}>
            <Text style={styles.emoji}>
              {percentage === 100 ? '🏆' : percentage >= 80 ? '🎉' : percentage >= 60 ? '🌟' : '💪'}
            </Text>
            <Text style={styles.title}>{getMessage()}</Text>
          </View>

          {/* Estadísticas de la Sesión */}
          <StatsOverview
            correctAnswers={correctAnswers}
            totalExercises={totalExercises}
            percentage={percentage}
          />

          {/* Puntos Ganados y Total */}
          <PointsCard
            earnedPoints={correctAnswers * 10}
            totalPoints={totalPoints}
          />

          {/* Mensaje Pedagógico Formativo */}
          <View style={styles.motivationalBox}>
            <Text style={styles.motivationalText}>
              {percentage === 100
                ? '¡Dominaste todos los ejercicios! Sigue así para convertirte en un experto.'
                : percentage >= 80
                  ? '¡Gran desempeño! Cada ronda te ayuda a pensar más rápido.'
                  : percentage >= 60
                    ? '¡Buen avance! Practicar un poco cada día hace la diferencia.'
                    : '¡Los errores son parte de aprender! Prueba otra ronda para mejorar.'}
            </Text>
          </View>
        </Animated.View>

        {/* Video Opcional para Duplicar Puntos (Cumplimiento COPPA) */}
        {!hasDoubled && isRewardedLoaded && (
          <View style={styles.rewardButtonContainer}>
            <Text style={styles.optionalAdText}>Opcional:</Text>
            <ButtonBig
              title="🎁 Ver video para duplicar puntos"
              onPress={handleDoublePoints}
              backgroundColor="#7C3AED"
            />
          </View>
        )}

        {/* Banner no invasivo */}
        <AdBanner />

        {/* Botón de Jugar de Nuevo */}
        <View style={styles.buttonContainer}>
          <ButtonBig
            title="🎮 Jugar otra ronda"
            onPress={handlePlayAgain}
            backgroundColor={COLORS.primary}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  categoryBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  emoji: {
    fontSize: 84,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  motivationalBox: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 16,
    width: '100%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  motivationalText: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },
  rewardButtonContainer: {
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  optionalAdText: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 6,
    fontWeight: '600',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
  },
});

