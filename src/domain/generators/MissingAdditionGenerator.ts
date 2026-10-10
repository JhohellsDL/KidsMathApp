import { Exercise, ExerciseGeneratorConfig } from '../models/Exercise';
import { IExerciseGenerator, getRandomNumber } from './types';

export class MissingAdditionGenerator implements IExerciseGenerator {
  generate(config?: ExerciseGeneratorConfig): Exercise<number>[] {
    const count = config?.count ?? 10;
    const minNumber = Math.max(1, config?.minNumber ?? 1);
    const maxNumber = Math.max(minNumber + 3, config?.maxNumber ?? 10);

    const exercises: Exercise<number>[] = [];
    const usedKeys = new Set<string>();

    let id = 1;
    let attempts = 0;
    const maxAttempts = count * 25;

    while (exercises.length < count && attempts < maxAttempts) {
      attempts++;

      // Generar total y partes
      const total = getRandomNumber(minNumber + 2, maxNumber);
      const op1 = getRandomNumber(1, total - 1);
      const missingAddend = total - op1;
      const isMissingFirst = Math.random() < 0.5;

      const key = `${isMissingFirst ? 'first' : 'second'}_${op1}_${total}`;
      if (usedKeys.has(key)) {
        continue;
      }
      usedKeys.add(key);

      const correctAnswer = missingAddend;
      const options = this.generateOptions(correctAnswer, total);
      const difficulty = total <= 10 ? 1 : total <= 20 ? 2 : 3;

      const formulaDisplay = isMissingFirst
        ? `__ + ${op1} = ${total}`
        : `${op1} + __ = ${total}`;

      exercises.push({
        id: id++,
        question: '¿Qué número falta para completar la suma?',
        subtext: formulaDisplay,
        correctAnswer,
        options,
        category: 'suma_incompleta',
        difficulty,
        operand1: op1,
        operand2: total,
        operatorSymbol: '+',
        explanation: `${op1} + ${missingAddend} = ${total}`,
      });
    }

    return exercises;
  }

  private generateOptions(correctAnswer: number, maxLimit: number): number[] {
    const options = new Set<number>();
    options.add(correctAnswer);

    let attempts = 0;
    while (options.size < 4 && attempts < 50) {
      attempts++;
      const offset = getRandomNumber(-3, 3);
      const candidate = correctAnswer + offset;

      if (candidate >= 1 && candidate !== correctAnswer && candidate <= maxLimit) {
        options.add(candidate);
      }
    }

    let fallbackOffset = 1;
    while (options.size < 4) {
      const candidate = correctAnswer + fallbackOffset;
      if (candidate >= 1) {
        options.add(candidate);
      }
      fallbackOffset = fallbackOffset > 0 ? -fallbackOffset : -fallbackOffset + 1;
    }

    return Array.from(options).sort(() => Math.random() - 0.5);
  }
}
