import { Exercise, ExerciseGeneratorConfig } from '../models/Exercise';
import { IExerciseGenerator, getRandomNumber } from './types';

export class SubtractionGenerator implements IExerciseGenerator {
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
      const a = getRandomNumber(minNumber, maxNumber);
      const b = getRandomNumber(minNumber, maxNumber);

      // Garantizar que no haya resultados negativos en el nivel infantil
      const num1 = Math.max(a, b);
      const num2 = Math.min(a, b);

      const key = `${num1}-${num2}`;
      if (usedPairs.has(key)) {
        continue;
      }
      usedPairs.add(key);

      const correctAnswer = num1 - num2;
      const options = this.generateOptions(correctAnswer, maxNumber);
      const difficulty = num1 <= 10 ? 1 : num1 <= 20 ? 2 : 3;

      exercises.push({
        id: id++,
        question: `¿Cuánto es ${num1} − ${num2}?`,
        subtext: 'Calcula la resta',
        correctAnswer,
        options,
        category: 'resta',
        difficulty,
        operand1: num1,
        operand2: num2,
        operatorSymbol: '−',
        explanation: `${num1} − ${num2} = ${correctAnswer}`,
      });
    }

    return exercises;
  }

  private generateOptions(correctAnswer: number, maxNumber: number): number[] {
    const options = new Set<number>();
    options.add(correctAnswer);

    let attempts = 0;
    while (options.size < 4 && attempts < 50) {
      attempts++;
      const offset = getRandomNumber(-3, 3);
      const candidate = correctAnswer + offset;

      if (candidate >= 0 && candidate !== correctAnswer && candidate <= maxNumber) {
        options.add(candidate);
      }
    }

    // Fallback garantizado para completar 4 opciones positivas únicas
    let fallback = 0;
    while (options.size < 4) {
      if (!options.has(fallback)) {
        options.add(fallback);
      }
      fallback++;
    }

    return Array.from(options).sort(() => Math.random() - 0.5);
  }
}
