import { ComparisonGenerator } from '../../src/domain/generators/ComparisonGenerator';

describe('ComparisonGenerator (MAT-01: Mayor, menor o igual)', () => {
  let generator: ComparisonGenerator;

  beforeEach(() => {
    generator = new ComparisonGenerator();
  });

  it('should generate the exact requested number of comparison exercises', () => {
    const count = 12;
    const exercises = generator.generate({ count, minNumber: 1, maxNumber: 10 });

    expect(exercises).toHaveLength(count);
  });

  it('should contain options [">", "=", "<"] for all exercises', () => {
    const exercises = generator.generate({ count: 6, minNumber: 1, maxNumber: 10 });

    exercises.forEach((exercise) => {
      expect(exercise.category).toBe('comparacion');
      expect(exercise.options).toEqual(['>', '=', '<']);
      expect(['>', '<', '=']).toContain(exercise.correctAnswer);
      expect(exercise.operand1).toBeDefined();
      expect(exercise.operand2).toBeDefined();
    });
  });

  it('should accurately calculate the comparison logic', () => {
    const exercises = generator.generate({ count: 15, minNumber: 1, maxNumber: 20 });

    exercises.forEach((exercise) => {
      const { operand1, operand2, correctAnswer, explanation } = exercise;

      if (operand1! > operand2!) {
        expect(correctAnswer).toBe('>');
        expect(explanation).toContain('mayor que');
      } else if (operand1! < operand2!) {
        expect(correctAnswer).toBe('<');
        expect(explanation).toContain('menor que');
      } else {
        expect(correctAnswer).toBe('=');
        expect(explanation).toContain('igual a');
      }
    });
  });

  it('should generate a balanced mix of greater, less, and equal cases', () => {
    const exercises = generator.generate({ count: 12, minNumber: 1, maxNumber: 10 });

    const answers = exercises.map((e) => e.correctAnswer);
    expect(answers).toContain('>');
    expect(answers).toContain('<');
    expect(answers).toContain('=');
  });
});
