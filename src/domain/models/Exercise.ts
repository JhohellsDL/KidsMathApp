export interface Exercise {
  id: number;
  question: string;
  correctAnswer: number;
  options: number[];
  category: 'suma' | 'resta' | 'multiplicacion' | 'division';
  difficulty: number;
}

export interface GameSession {
  totalExercises: number;
  currentExerciseIndex: number;
  correctAnswers: number;
  totalPoints: number;
  exercises: Exercise[];
}

