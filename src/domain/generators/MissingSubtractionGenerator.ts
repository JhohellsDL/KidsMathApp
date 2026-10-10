import { Exercise, ExerciseGeneratorConfig } from '../models/Exercise';
import { IExerciseGenerator, getRandomNumber } from './types';

export class MissingSubtractionGenerator implements IExerciseGenerator {
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

      // Minuendo (número inicial) y Sustraendo
      const minuend = getRandomNumber(minNumber + 2, maxNumber);
      const subtrahend = getRandomNumber(1, minuend - 1);
      const difference = minuend - subtrahend;
      const isMissingSubtrahend = Math.random() < 0.6; // 60% minuend - __ = diff, 40% __ - subtrahend = diff

      const key = `${isMissingSubtrahend ? 'subtrahend' : 'minuend'}_${minuend}_${subtrahend}`;
      if (usedKeys.has(key)) {
        continue;
      }
      usedKeys.add(key);

      const correctAnswer = isMissingSubtrahend ? subtrahend : minuend;
      const options = this.generateOptions(correctAnswer, maxNumber);
      const difficulty = minuend <= 10 ? 1 : minuend <= 20 ? 2 : 3;

      const formulaDisplay = isMissingSubtrahend
        ? `${minuend} − __ = ${difference}`
        : `__ − ${subtrahend} = ${difference}`;

      exercises.push({
        id: id++,
        question: '¿Qué número falta para completar la resta?',
        subtext: formulaDisplay,
        correctAnswer,
        options,
        category: 'resta_incompleta',
        difficulty,
        operand1: minuend,
        operand2: isMissingSubtrahend ? difference : subtrahend,
        operatorSymbol: '−',
        explanation: `${minuend} − ${subtrahend} = ${difference}`,
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

      if (candidate >= 1 && candidate !== correctAnswer && candidate <= maxLimit + 2) {
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
