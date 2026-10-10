export type ExerciseCategory =
  | 'suma'
  | 'resta'
  | 'comparacion'
  | 'anterior_posterior'
  | 'suma_incompleta'
  | 'resta_incompleta'
  | 'multiplicacion'
  | 'division';

export type ComparisonSymbol = '>' | '<' | '=';

export interface Exercise<T = number | string> {
  id: number;
  question: string;
  subtext?: string;
  correctAnswer: T;
  options: T[];
  category: ExerciseCategory;
  difficulty: number;
  explanation?: string;
  operand1?: number;
  operand2?: number;
  operatorSymbol?: string;
  layout?: 'horizontal' | 'vertical';
}

export interface GameSession {
  totalExercises: number;
  currentExerciseIndex: number;
  correctAnswers: number;
  totalPoints: number;
  category: ExerciseCategory;
  exercises: Exercise[];
}

export interface ExerciseGeneratorConfig {
  count?: number;
  minNumber?: number;
  maxNumber?: number;
  difficulty?: number;
}
