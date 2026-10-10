import { MissingSubtractionGenerator } from '../../src/domain/generators/MissingSubtractionGenerator';

describe('MissingSubtractionGenerator (MAT-04: Restas incompletas)', () => {
  let generator: MissingSubtractionGenerator;

  beforeEach(() => {
    generator = new MissingSubtractionGenerator();
  });

  it('should generate requested number of exercises', () => {
    const exercises = generator.generate({ count: 10, minNumber: 1, maxNumber: 15 });
    expect(exercises).toHaveLength(10);
  });

  it('should produce valid non-negative subtraction components', () => {
    const exercises = generator.generate({ count: 15, minNumber: 1, maxNumber: 20 });

    exercises.forEach((exercise) => {
      expect(exercise.category).toBe('resta_incompleta');
      expect(exercise.options).toHaveLength(4);
      expect(exercise.options).toContain(exercise.correctAnswer);

      const uniqueOptions = new Set(exercise.options);
      expect(uniqueOptions.size).toBe(4);

      exercise.options.forEach((opt) => {
        expect(opt).toBeGreaterThanOrEqual(1);
      });
    });
  });
});
