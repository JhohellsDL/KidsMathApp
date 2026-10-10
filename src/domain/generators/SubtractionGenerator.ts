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
      const isVertical = num1 >= 100 || num2 >= 100;
      const difficulty = num1 <= 10 ? 1 : num1 <= 20 ? 2 : isVertical ? 4 : 3;

      exercises.push({
        id: id++,
        question: isVertical ? 'Resuelve la resta en tu cuaderno:' : `¿Cuánto es ${num1} − ${num2}?`,
        subtext: isVertical ? 'Escribe el resultado' : 'Calcula la resta',
        correctAnswer,
        options,
        category: 'resta',
        difficulty,
        operand1: num1,
        operand2: num2,
        operatorSymbol: '−',
        layout: isVertical ? 'vertical' : 'horizontal',
        explanation: `${num1} − ${num2} = ${correctAnswer}`,
      });
    }

    return exercises;
  }

  private generateOptions(correctAnswer: number, maxNumber: number): number[] {
    const options = new Set<number>();
    options.add(correctAnswer);

    const isThreeDigits = maxNumber >= 100;
    const offsets = isThreeDigits
      ? [-100, 100, -10, 10, -2, 2, -1, 1, -20, 20]
      : [-3, -2, -1, 1, 2, 3];

    let attempts = 0;
    while (options.size < 4 && attempts < 50) {
      attempts++;
      const randomOffset = offsets[Math.floor(Math.random() * offsets.length)];
      const candidate = correctAnswer + randomOffset;

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
