import { create } from 'zustand';
import { Exercise, ExerciseCategory } from '../domain/models/Exercise';

interface GameState {
  // Estado del juego
  exercises: Exercise[];
  currentExerciseIndex: number;
  correctAnswers: number;
  totalPoints: number;
  isGameActive: boolean;
  activeCategory: ExerciseCategory;

  // Acciones
  startGame: (exercises: Exercise[], category?: ExerciseCategory) => void;
  answerQuestion: (isCorrect: boolean) => void;
  nextExercise: () => void;
  finishGame: () => void;
  resetGame: () => void;
  doublePoints: () => void;

  // Getters
  getCurrentExercise: () => Exercise | null;
  getProgress: () => number;
  isLastExercise: () => boolean;
}

export const useGameStore = create<GameState>((set, get) => ({
  // Estado inicial
  exercises: [],
  currentExerciseIndex: 0,
  correctAnswers: 0,
  totalPoints: 0,
  isGameActive: false,
  activeCategory: 'suma',

  // Acciones
  startGame: (exercises: Exercise[], category: ExerciseCategory = 'suma') => {
    set({
      exercises,
      currentExerciseIndex: 0,
      correctAnswers: 0,
      totalPoints: 0,
      isGameActive: true,
      activeCategory: category,
    });
  },

  answerQuestion: (isCorrect: boolean) => {
    if (isCorrect) {
      set(state => ({
        correctAnswers: state.correctAnswers + 1,
        totalPoints: state.totalPoints + 10,
      }));
    }
  },

  nextExercise: () => {
    set(state => ({
      currentExerciseIndex: state.currentExerciseIndex + 1,
    }));
  },

  finishGame: () => {
    set({ isGameActive: false });
  },

  resetGame: () => {
    set({
      exercises: [],
      currentExerciseIndex: 0,
      correctAnswers: 0,
      totalPoints: 0,
      isGameActive: false,
    });
  },

  doublePoints: () => {
    set(state => ({
      totalPoints: state.totalPoints * 2,
    }));
  },

  // Getters
  getCurrentExercise: () => {
    const state = get();
    return state.exercises[state.currentExerciseIndex] || null;
  },

  getProgress: () => {
    const state = get();
    if (state.exercises.length === 0) return 0;
    return ((state.currentExerciseIndex + 1) / state.exercises.length) * 100;
  },

  isLastExercise: () => {
    const state = get();
    return state.currentExerciseIndex >= state.exercises.length - 1;
  },
}));
