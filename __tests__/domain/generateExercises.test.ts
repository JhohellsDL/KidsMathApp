import { GenerateExercisesUseCase } from '../../src/domain/usecases/generateExercises';

describe('GenerateExercisesUseCase', () => {
  let useCase: GenerateExercisesUseCase;

  beforeEach(() => {
    useCase = new GenerateExercisesUseCase();
  });

  it('should generate the exact requested number of exercises', () => {
    const count = 10;
    const exercises = useCase.execute(count, 1, 10);

    expect(exercises).toHaveLength(count);
  });

  it('should generate exercises with 4 unique options including the correct answer', () => {
    const exercises = useCase.execute(5, 1, 10);

    exercises.forEach((exercise) => {
      expect(exercise.options).toHaveLength(4);
      expect(new Set(exercise.options).size).toBe(4);
      expect(exercise.options).toContain(exercise.correctAnswer);
      expect(exercise.category).toBe('suma');
      expect(exercise.difficulty).toBeGreaterThanOrEqual(1);
    });
  });

  it('should generate distinct question pairs without immediate duplicates', () => {
    const exercises = useCase.execute(15, 1, 10);
    const questions = exercises.map((e) => e.question);
    const uniqueQuestions = new Set(questions);

    expect(uniqueQuestions.size).toBe(exercises.length);
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
