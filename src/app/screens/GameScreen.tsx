import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  BackHandler,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { OptionCard } from "../../ui/components";
import { useGameStore } from "../../state/gameStore";

type Props = NativeStackScreenProps<RootStackParamList, "Game">;

export const GameScreen: React.FC<Props> = ({ navigation }) => {
  const {
    getCurrentExercise,
    answerQuestion,
    nextExercise,
    finishGame,
    isLastExercise,
    currentExerciseIndex,
    exercises,
    correctAnswers,
  } = useGameStore();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  // Resetear estado cuando cambia el ejercicio
  useEffect(() => {
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
    fadeAnim.setValue(1);
  }, [currentExerciseIndex]);

  // Manejar el botón "atrás" del dispositivo
  useEffect(() => {
    const backAction = () => {
      // Si ya está navegando, no hacer nada
      if (isNavigating) {
        return true;
      }

      // Mostrar alerta para confirmar salida
      Alert.alert(
        "¿Salir del juego?",
        "Si sales ahora, perderás tu progreso. ¿Estás seguro?",
        [
          {
            text: "No, seguir jugando",
            style: "cancel",
            onPress: () => {},
          },
          {
            text: "Sí, salir",
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
              });
            },
          },
        ],
        { cancelable: false }
      );
      return true; // Prevenir el comportamiento por defecto
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation, isNavigating]);

  const currentExercise = getCurrentExercise();

  if (!currentExercise) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No hay ejercicios disponibles</Text>
      </View>
    );
  }

  const handleOptionPress = (option: number) => {
    if (showFeedback || isNavigating) return; // Ya respondió o está navegando

    const correct = option === currentExercise.correctAnswer;
    setSelectedOption(option);
    setIsCorrect(correct);
    setShowFeedback(true);

    // Registrar respuesta
    answerQuestion(correct);

    // Esperar 1.5 segundos antes de continuar
    setTimeout(() => {
      if (isLastExercise()) {
        // Es el último ejercicio, navegar a resultados
        setIsNavigating(true);
        finishGame();
        
        // Usar setTimeout para asegurar que el estado se actualice
        setTimeout(() => {
          navigation.replace("Result");
        }, 100);
      } else {
        // No es el último, continuar al siguiente
        // Animación de salida
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          nextExercise();
          // El estado se resetea en el useEffect que escucha currentExerciseIndex
        });
      }
    }, 1500);
  };

  const progress = ((currentExerciseIndex + 1) / exercises.length) * 100;

  return (
    <View style={styles.container}>
      {/* Header con decoración */}
      <View style={styles.header}>
        {/* Barra de progreso mejorada */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBg}>
            <Animated.View
              style={[styles.progressFill, { width: `${progress}%` }]}
            />
          </View>
          <Text style={styles.progressText}>{Math.round(progress)}%</Text>
        </View>

        {/* Estadísticas */}
        <View style={styles.statsRow}>
          <View style={styles.statBadge}>
            <Text style={styles.statIcon}>📝</Text>
            <Text style={styles.statText}>
              {currentExerciseIndex + 1}/{exercises.length}
            </Text>
          </View>

          <View style={[styles.statBadge, styles.correctBadge]}>
            <Text style={styles.statIcon}>✅</Text>
            <Text style={styles.statText}>{correctAnswers}</Text>
          </View>
        </View>
      </View>

      {/* Contenido principal */}
      <View style={styles.mainContent}>
        {/* Tarjeta de pregunta mejorada */}
        <Animated.View style={[styles.questionCard, { opacity: fadeAnim }]}>
          <View style={styles.questionHeader}>
            <Text style={styles.questionLabel}>
              Pregunta {currentExerciseIndex + 1}
            </Text>
          </View>
          <View style={styles.questionContent}>
            <Text style={styles.question}>{currentExercise.question}</Text>
          </View>
        </Animated.View>

        {/* Feedback más destacado */}
        {showFeedback && (
          <Animated.View
            style={[
              styles.feedbackContainer,
              isCorrect ? styles.feedbackCorrect : styles.feedbackWrong,
            ]}
          >
            <Text style={styles.feedbackEmoji}>{isCorrect ? "🎉" : "💪"}</Text>
            <Text style={styles.feedbackText}>
              {isCorrect ? "¡Muy bien!" : "¡Intenta de nuevo!"}
            </Text>
          </Animated.View>
        )}

        {/* Opciones con mejor layout */}
        <Animated.View style={[styles.optionsContainer, { opacity: fadeAnim }]}>
          <View style={styles.optionsGrid}>
            {currentExercise.options.map((option, index) => (
              <View key={option} style={styles.optionWrapper}>
                <OptionCard
                  value={option}
                  onPress={() => handleOptionPress(option)}
                  isSelected={selectedOption === option}
                  isCorrect={
                    showFeedback &&
                    selectedOption === option &&
                    option === currentExercise.correctAnswer
                  }
                  isWrong={
                    showFeedback &&
                    selectedOption === option &&
                    option !== currentExercise.correctAnswer
                  }
                  disabled={showFeedback}
                />
              </View>
            ))}
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
  },
  // Header mejorado
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  progressBarBg: {
    flex: 1,
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 10,
  },
  progressText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    minWidth: 45,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    minWidth: 100,
    justifyContent: "center",
  },
  correctBadge: {
    backgroundColor: "#E8F5E9",
  },
  statIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  statText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  // Contenido principal
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  // Tarjeta de pregunta mejorada
  questionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#1976D2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#BBDEFB",
  },
  questionHeader: {
    backgroundColor: "#1976D2",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  questionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  questionContent: {
    padding: 30,
    backgroundColor: "#FFFFFF",
  },
  question: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1976D2",
    textAlign: "center",
    lineHeight: 45,
  },
  // Feedback mejorado
  feedbackContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  feedbackCorrect: {
    backgroundColor: "#E8F5E9",
  },
  feedbackWrong: {
    backgroundColor: "#FFF9C4",
  },
  feedbackEmoji: {
    fontSize: 60,
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1976D2",
  },
  // Opciones mejoradas
  optionsContainer: {
    marginTop: 20,
    paddingBottom: 20,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  optionWrapper: {
    width: "45%",
    marginBottom: 15,
  },
  errorText: {
    fontSize: 20,
    color: "#F44336",
    textAlign: "center",
    marginTop: 100,
  },
});
