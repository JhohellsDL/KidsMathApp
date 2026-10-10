import { SubtractionGenerator } from '../../src/domain/generators/SubtractionGenerator';

describe('SubtractionGenerator', () => {
  let generator: SubtractionGenerator;

  beforeEach(() => {
    generator = new SubtractionGenerator();
  });

  it('should generate valid subtractions without negative results', () => {
    const exercises = generator.generate({ count: 10, minNumber: 1, maxNumber: 15 });

    expect(exercises).toHaveLength(10);
    exercises.forEach((exercise) => {
      expect(exercise.category).toBe('resta');
      expect(exercise.operand1).toBeGreaterThanOrEqual(exercise.operand2!);
      expect(exercise.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(exercise.options).toHaveLength(4);
      expect(exercise.options).toContain(exercise.correctAnswer);
      expect(new Set(exercise.options).size).toBe(4);
    });
  });
});
