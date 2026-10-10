import { Exercise, ExerciseGeneratorConfig } from '../models/Exercise';
import { IExerciseGenerator, getRandomNumber } from './types';

export class AdditionGenerator implements IExerciseGenerator {
  generate(config?: ExerciseGeneratorConfig): Exercise<number>[] {
    const count = config?.count ?? 10;
    const minNumber = config?.minNumber ?? 1;
    const maxNumber = config?.maxNumber ?? 10;

    const exercises: Exercise<number>[] = [];
    const usedPairs = new Set<string>();

    let id = 1;
    let attempts = 0;
    const maxAttempts = count * 20;

    while (exercises.length < count && attempts < maxAttempts) {
      attempts++;
      const num1 = getRandomNumber(minNumber, maxNumber);
      const num2 = getRandomNumber(minNumber, maxNumber);
      const key = `${num1}+${num2}`;

      if (usedPairs.has(key)) {
        continue;
      }
      usedPairs.add(key);

      const correctAnswer = num1 + num2;
      const options = this.generateOptions(correctAnswer, minNumber, maxNumber);
      const difficulty = correctAnswer <= 10 ? 1 : correctAnswer <= 20 ? 2 : 3;

      exercises.push({
        id: id++,
        question: `¿Cuánto es ${num1} + ${num2}?`,
        subtext: 'Calcula la suma',
        correctAnswer,
        options,
        category: 'suma',
        difficulty,
        operand1: num1,
        operand2: num2,
        operatorSymbol: '+',
        explanation: `${num1} + ${num2} = ${correctAnswer}`,
      });
    }

    return exercises;
  }

  private generateOptions(
    correctAnswer: number,
    minNumber: number,
    maxNumber: number,
  ): number[] {
    const options = new Set<number>();
    options.add(correctAnswer);

    let attempts = 0;
    while (options.size < 4 && attempts < 50) {
      attempts++;
      const offset = getRandomNumber(-3, 3);
      const candidate = correctAnswer + offset;

      if (candidate > 0 && candidate !== correctAnswer && candidate <= maxNumber * 2 + 5) {
        options.add(candidate);
      }
    }

    // Fallback garantizado si no se llenaron 4 opciones únicas
    let fallbackOffset = 1;
    while (options.size < 4) {
      options.add(correctAnswer + fallbackOffset);
      fallbackOffset++;
    }

    return Array.from(options).sort(() => Math.random() - 0.5);
  }
}
