import { Exercise, ExerciseGeneratorConfig } from '../models/Exercise';
import { IExerciseGenerator, getRandomNumber } from './types';

export class BeforeAfterGenerator implements IExerciseGenerator {
  generate(config?: ExerciseGeneratorConfig): Exercise<number>[] {
    const count = config?.count ?? 10;
    const minNumber = Math.max(1, config?.minNumber ?? 1);
    const maxNumber = Math.max(minNumber + 2, config?.maxNumber ?? 10);

    const exercises: Exercise<number>[] = [];
    const usedKeys = new Set<string>();

    let id = 1;
    let attempts = 0;
    const maxAttempts = count * 25;

    while (exercises.length < count && attempts < maxAttempts) {
      attempts++;
      const isBefore = Math.random() < 0.5;

      let baseNumber: number;
      let correctAnswer: number;
      let question: string;
      let subtext: string;
      let explanation: string;

      if (isBefore) {
        // Para número anterior, baseNumber debe ser >= 2 para que el anterior sea >= 1
        const effectiveMin = Math.max(2, minNumber);
        baseNumber = getRandomNumber(effectiveMin, maxNumber);
        correctAnswer = baseNumber - 1;
        question = `¿Qué número va ANTES del ${baseNumber}?`;
        subtext = `__ , ${baseNumber}`;
        explanation = `El número anterior al ${baseNumber} es el ${correctAnswer}.`;
      } else {
        // Para número posterior
        baseNumber = getRandomNumber(minNumber, maxNumber - 1);
        correctAnswer = baseNumber + 1;
        question = `¿Qué número va DESPUÉS del ${baseNumber}?`;
        subtext = `${baseNumber} , __`;
        explanation = `El número posterior al ${baseNumber} es el ${correctAnswer}.`;
      }

      const key = `${isBefore ? 'before' : 'after'}_${baseNumber}`;
      if (usedKeys.has(key)) {
        continue;
      }
      usedKeys.add(key);

      const options = this.generateOptions(correctAnswer, baseNumber, minNumber, maxNumber);
      const difficulty = baseNumber <= 10 ? 1 : baseNumber <= 20 ? 2 : 3;

      exercises.push({
        id: id++,
        question,
        subtext,
        correctAnswer,
        options,
        category: 'anterior_posterior',
        difficulty,
        operand1: baseNumber,
        operand2: correctAnswer,
        operatorSymbol: isBefore ? '←' : '→',
        explanation,
      });
    }

    return exercises;
  }

  private generateOptions(
    correctAnswer: number,
    baseNumber: number,
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

      if (candidate >= 1 && candidate !== correctAnswer && candidate <= maxNumber + 2) {
        options.add(candidate);
      }
    }

    // Fallback asegurado para 4 opciones únicas mayores a 0
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
