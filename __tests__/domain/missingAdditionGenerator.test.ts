import { MissingAdditionGenerator } from '../../src/domain/generators/MissingAdditionGenerator';

describe('MissingAdditionGenerator (MAT-03: Sumas incompletas)', () => {
  let generator: MissingAdditionGenerator;

  beforeEach(() => {
    generator = new MissingAdditionGenerator();
  });

  it('should generate requested number of exercises', () => {
    const exercises = generator.generate({ count: 10, minNumber: 1, maxNumber: 10 });
    expect(exercises).toHaveLength(10);
  });

  it('should produce mathematically sound missing addends', () => {
    const exercises = generator.generate({ count: 15, minNumber: 1, maxNumber: 20 });

    exercises.forEach((exercise) => {
      expect(exercise.category).toBe('suma_incompleta');
      expect(exercise.options).toHaveLength(4);
      expect(exercise.options).toContain(exercise.correctAnswer);

      const op1 = exercise.operand1!;
      const total = exercise.operand2!;
      const missing = exercise.correctAnswer as number;

      expect(op1 + missing).toBe(total);
      expect(missing).toBeGreaterThanOrEqual(1);

      const uniqueOptions = new Set(exercise.options);
      expect(uniqueOptions.size).toBe(4);
    });
  });
});
