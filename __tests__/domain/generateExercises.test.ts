import { GenerateExercisesUseCase } from '../../src/domain/usecases/generateExercises';

describe('GenerateExercisesUseCase', () => {
  let useCase: GenerateExercisesUseCase;

  beforeEach(() => {
    useCase = new GenerateExercisesUseCase();
  });

  it('should generate addition exercises by default', () => {
    const exercises = useCase.execute(10, 1, 10);

    expect(exercises).toHaveLength(10);
    exercises.forEach((ex) => {
      expect(ex.category).toBe('suma');
      expect(ex.options).toHaveLength(4);
      expect(ex.options).toContain(ex.correctAnswer);
    });
  });

  it('should generate subtraction exercises when requested', () => {
    const exercises = useCase.execute(8, 1, 10, 'resta');

    expect(exercises).toHaveLength(8);
    exercises.forEach((ex) => {
      expect(ex.category).toBe('resta');
      expect(Number(ex.correctAnswer)).toBeGreaterThanOrEqual(0);
    });
  });

  it('should generate comparison exercises when requested', () => {
    const exercises = useCase.execute(6, 1, 10, 'comparacion');

    expect(exercises).toHaveLength(6);
    exercises.forEach((ex) => {
      expect(ex.category).toBe('comparacion');
      expect(ex.options).toEqual(['>', '=', '<']);
    });
  });

  it('should generate anterior_posterior exercises when requested', () => {
    const exercises = useCase.execute(6, 1, 10, 'anterior_posterior');

    expect(exercises).toHaveLength(6);
    exercises.forEach((ex) => {
      expect(ex.category).toBe('anterior_posterior');
      expect(ex.options).toHaveLength(4);
    });
  });

  it('should generate suma_incompleta exercises when requested', () => {
    const exercises = useCase.execute(6, 1, 10, 'suma_incompleta');

    expect(exercises).toHaveLength(6);
    exercises.forEach((ex) => {
      expect(ex.category).toBe('suma_incompleta');
      expect(ex.options).toHaveLength(4);
    });
  });

  it('should generate resta_incompleta exercises when requested', () => {
    const exercises = useCase.execute(6, 1, 10, 'resta_incompleta');

    expect(exercises).toHaveLength(6);
    exercises.forEach((ex) => {
      expect(ex.category).toBe('resta_incompleta');
      expect(ex.options).toHaveLength(4);
    });
  });

  it('should support executeHybrid combining static and generated exercises', () => {
    const staticExercises = [
      {
        id: 101,
        question: '¿Cuánto es 2 + 2?',
        correctAnswer: 4,
        options: [4, 3, 5, 6],
        category: 'suma' as const,
        difficulty: 1,
      },
    ];

    const result = useCase.executeHybrid(staticExercises, 5);
    expect(result).toHaveLength(5);
  });
});
