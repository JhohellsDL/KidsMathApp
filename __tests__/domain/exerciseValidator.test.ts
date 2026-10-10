import { validateExerciseAnswer } from '../../src/domain/validators/exerciseValidator';
import { Exercise } from '../../src/domain/models/Exercise';

describe('validateExerciseAnswer (Validador puro)', () => {
  it('should validate numeric addition correctly', () => {
    const exercise: Exercise<number> = {
      id: 1,
      question: '¿Cuánto es 3 + 4?',
      correctAnswer: 7,
      options: [6, 7, 8, 9],
      category: 'suma',
      difficulty: 1,
      operand1: 3,
      operand2: 4,
    };

    const validResult = validateExerciseAnswer(exercise, 7);
    expect(validResult.isCorrect).toBe(true);
    expect(validResult.message).toBe('¡Muy bien!');

    const invalidResult = validateExerciseAnswer(exercise, 6);
    expect(invalidResult.isCorrect).toBe(false);
    expect(invalidResult.message).toBe('¡Sigue practicando!');
  });

  it('should validate comparison symbols with explanation', () => {
    const exercise: Exercise<string> = {
      id: 2,
      question: '¿Cuál es el signo correcto?',
      correctAnswer: '>',
      options: ['>', '=', '<'],
      category: 'comparacion',
      difficulty: 1,
      operand1: 8,
      operand2: 3,
      explanation: '8 es mayor que 3',
    };

    const validResult = validateExerciseAnswer(exercise, '>');
    expect(validResult.isCorrect).toBe(true);
    expect(validResult.explanation).toBe('8 es mayor que 3');

    const invalidResult = validateExerciseAnswer(exercise, '<');
    expect(invalidResult.isCorrect).toBe(false);
    expect(invalidResult.explanation).toBe('8 es mayor que 3');
  });
});
