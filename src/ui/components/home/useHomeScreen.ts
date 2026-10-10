import { useState, useRef, useEffect, useCallback } from 'react';
import { Animated } from 'react-native';
import { useGameStore } from '../../../state/gameStore';
import { useProgressStore } from '../../../state/progressStore';
import { GenerateExercisesUseCase } from '../../../domain/usecases/generateExercises';
import { ExerciseCategory } from '../../../domain/models/Exercise';
import { DifficultyLevel } from '../../../domain/models/Progress';
import { getDifficultyLabel } from './homeConstants';

export const useHomeScreen = () => {
  const totalPoints = useGameStore(state => state.totalPoints);
  const resetGame = useGameStore(state => state.resetGame);
  const startGameInStore = useGameStore(state => state.startGame);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory>('suma');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('easy');
  const [exerciseCount, setExerciseCount] = useState<number>(10);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.03,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();

    return () => animation.stop();
  }, [pulseAnim]);

  const handleStartGame = useCallback(
    (onSuccess: () => void) => {
      resetGame();

      const minNumber = difficulty === 'expert' ? 100 : 1;
      const maxNumber =
        difficulty === 'expert'
          ? 999
          : difficulty === 'hard'
            ? 50
            : difficulty === 'medium'
              ? 20
              : 10;

      const generator = new GenerateExercisesUseCase();
      const exercises = generator.execute(exerciseCount, minNumber, maxNumber, selectedCategory);

      useProgressStore.getState().startSession(selectedCategory, difficulty);
      startGameInStore(exercises, selectedCategory);
      onSuccess();
    },
    [difficulty, exerciseCount, resetGame, selectedCategory, startGameInStore],
  );

  return {
    totalPoints,
    selectedCategory,
    setSelectedCategory,
    difficulty,
    setDifficulty,
    exerciseCount,
    setExerciseCount,
    isSettingsVisible,
    setIsSettingsVisible,
    pulseAnim,
    difficultyLabel: getDifficultyLabel(difficulty),
    handleStartGame,
  };
};
