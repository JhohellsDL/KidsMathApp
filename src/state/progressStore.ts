import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SessionRecord, ProgressSummary, DifficultyLevel } from '../domain/models/Progress';
import { ExerciseCategory } from '../domain/models/Exercise';
import { calculateProgressSummary } from '../domain/validators/progressCalculator';

interface ProgressState {
  sessions: SessionRecord[];
  
  // Estado de la sesión activa en memoria
  activeSessionId: string | null;
  activeCategory: ExerciseCategory;
  activeDifficulty: DifficultyLevel;
  sessionStartTime: number | null; // Date.now()
  pauseStartTime: number | null;
  pausedSecondsAccumulated: number;
  questionsAnswered: number;
  correctAnswers: number;
  isPaused: boolean;

  // Acciones de ciclo de vida de sesión
  startSession: (category: ExerciseCategory, difficulty: DifficultyLevel) => void;
  recordAnswer: (isCorrect: boolean) => void;
  pauseSession: () => void;
  resumeSession: () => void;
  finishSession: (isCompleted: boolean) => SessionRecord | null;
  clearHistory: () => void;

  // Getters
  getSummary: () => ProgressSummary;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      sessions: [],

      activeSessionId: null,
      activeCategory: 'suma',
      activeDifficulty: 'easy',
      sessionStartTime: null,
      pauseStartTime: null,
      pausedSecondsAccumulated: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      isPaused: false,

      startSession: (category: ExerciseCategory, difficulty: DifficultyLevel) => {
        const id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        set({
          activeSessionId: id,
          activeCategory: category,
          activeDifficulty: difficulty,
          sessionStartTime: Date.now(),
          pauseStartTime: null,
          pausedSecondsAccumulated: 0,
          questionsAnswered: 0,
          correctAnswers: 0,
          isPaused: false,
        });
      },

      recordAnswer: (isCorrect: boolean) => {
        set(state => ({
          questionsAnswered: state.questionsAnswered + 1,
          correctAnswers: isCorrect ? state.correctAnswers + 1 : state.correctAnswers,
        }));
      },

      pauseSession: () => {
        const state = get();
        if (!state.sessionStartTime || state.isPaused) return;

        set({
          isPaused: true,
          pauseStartTime: Date.now(),
        });
      },

      resumeSession: () => {
        const state = get();
        if (!state.sessionStartTime || !state.isPaused || !state.pauseStartTime) return;

        const additionalPause = Math.max(0, Math.floor((Date.now() - state.pauseStartTime) / 1000));
        set({
          isPaused: false,
          pauseStartTime: null,
          pausedSecondsAccumulated: state.pausedSecondsAccumulated + additionalPause,
        });
      },

      finishSession: (isCompleted: boolean) => {
        const state = get();
        if (!state.activeSessionId || !state.sessionStartTime) return null;

        const now = Date.now();
        let totalElapsedSeconds = Math.max(0, Math.floor((now - state.sessionStartTime) / 1000));

        let currentPaused = state.pausedSecondsAccumulated;
        if (state.isPaused && state.pauseStartTime) {
          currentPaused += Math.max(0, Math.floor((now - state.pauseStartTime) / 1000));
        }

        const netDurationSeconds = Math.max(1, totalElapsedSeconds - currentPaused);

        // Si es una sesión interrumpida sin ninguna pregunta respondida, no la guardamos
        if (!isCompleted && state.questionsAnswered === 0) {
          set({
            activeSessionId: null,
            sessionStartTime: null,
            pauseStartTime: null,
            isPaused: false,
          });
          return null;
        }

        const newRecord: SessionRecord = {
          id: state.activeSessionId,
          category: state.activeCategory,
          startedAt: new Date(state.sessionStartTime).toISOString(),
          endedAt: new Date(now).toISOString(),
          durationSeconds: netDurationSeconds,
          questionsAnswered: state.questionsAnswered,
          correctAnswers: state.correctAnswers,
          totalPointsEarned: state.correctAnswers * 10,
          status: isCompleted ? 'completed' : 'interrupted',
          difficulty: state.activeDifficulty,
        };

        set({
          sessions: [newRecord, ...state.sessions],
          activeSessionId: null,
          sessionStartTime: null,
          pauseStartTime: null,
          pausedSecondsAccumulated: 0,
          questionsAnswered: 0,
          correctAnswers: 0,
          isPaused: false,
        });

        return newRecord;
      },

      clearHistory: () => {
        set({ sessions: [] });
      },

      getSummary: () => {
        return calculateProgressSummary(get().sessions);
      },
    }),
    {
      name: 'kids_math_progress_storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        sessions: state.sessions,
      }),
    },
  ),
);
