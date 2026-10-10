import { BeforeAfterGenerator } from '../../src/domain/generators/BeforeAfterGenerator';

describe('BeforeAfterGenerator (MAT-02: Número anterior y posterior)', () => {
  let generator: BeforeAfterGenerator;

  beforeEach(() => {
    generator = new BeforeAfterGenerator();
  });

  it('should generate the exact requested number of exercises', () => {
    const exercises = generator.generate({ count: 8, minNumber: 1, maxNumber: 10 });
    expect(exercises).toHaveLength(8);
  });

  it('should generate valid anterior / posterior questions and accurate math', () => {
    const exercises = generator.generate({ count: 12, minNumber: 1, maxNumber: 20 });

    exercises.forEach((exercise) => {
      expect(exercise.category).toBe('anterior_posterior');
      expect(exercise.options).toHaveLength(4);
      expect(exercise.options).toContain(exercise.correctAnswer);
      expect(exercise.correctAnswer).toBeGreaterThanOrEqual(1);

      const baseNum = exercise.operand1!;
      if (exercise.question.includes('ANTES')) {
        expect(exercise.correctAnswer).toBe(baseNum - 1);
        expect(exercise.subtext).toBe(`__ , ${baseNum}`);
      } else {
        expect(exercise.question).toContain('DESPUÉS');
        expect(exercise.correctAnswer).toBe(baseNum + 1);
        expect(exercise.subtext).toBe(`${baseNum} , __`);
      }
    });
  });

  it('should not contain duplicate options in any exercise', () => {
    const exercises = generator.generate({ count: 10, minNumber: 1, maxNumber: 15 });

    exercises.forEach((exercise) => {
      const uniqueOptions = new Set(exercise.options);
      expect(uniqueOptions.size).toBe(4);
    });
  });
});
