import { ExerciseCategory } from './Exercise';

export type SessionStatus = 'completed' | 'interrupted';
export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

export interface SessionRecord {
  id: string;
  category: ExerciseCategory;
  startedAt: string; // ISO 8601 UTC
  endedAt: string; // ISO 8601 UTC
  durationSeconds: number;
  questionsAnswered: number;
  correctAnswers: number;
  totalPointsEarned: number;
  status: SessionStatus;
  difficulty: DifficultyLevel;
}

export interface CategoryProgress {
  sessionsCount: number;
  totalSeconds: number;
  correctAnswers: number;
  questionsAnswered: number;
}

export interface ProgressSummary {
  totalPracticeSeconds: number;
  todayPracticeSeconds: number;
  completedSessionsCount: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  accuracyPercentage: number;
  categoryStats: Partial<Record<ExerciseCategory, CategoryProgress>>;
}
