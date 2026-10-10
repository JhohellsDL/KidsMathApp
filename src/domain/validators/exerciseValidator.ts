import { Exercise } from '../models/Exercise';

export interface ValidationFeedback {
  isCorrect: boolean;
  message: string;
  explanation: string;
}

/**
 * Validador puro desacoplado de la UI para verificar respuestas de cualquier tipo de ejercicio.
 */
export const validateExerciseAnswer = (
  exercise: Exercise,
  selectedAnswer: number | string,
): ValidationFeedback => {
  const isCorrect = String(exercise.correctAnswer).trim() === String(selectedAnswer).trim();

  let defaultExplanation = '';
  if (exercise.explanation) {
    defaultExplanation = exercise.explanation;
  } else if (exercise.category === 'suma' && exercise.operand1 !== undefined && exercise.operand2 !== undefined) {
    defaultExplanation = `${exercise.operand1} + ${exercise.operand2} = ${exercise.correctAnswer}`;
  } else if (exercise.category === 'resta' && exercise.operand1 !== undefined && exercise.operand2 !== undefined) {
    defaultExplanation = `${exercise.operand1} − ${exercise.operand2} = ${exercise.correctAnswer}`;
  } else {
    defaultExplanation = `La respuesta correcta es ${exercise.correctAnswer}`;
  }

  return {
    isCorrect,
    message: isCorrect ? '¡Muy bien!' : '¡Sigue practicando!',
    explanation: defaultExplanation,
  };
};
