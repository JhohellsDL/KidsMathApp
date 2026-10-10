import { ComparisonSymbol, Exercise, ExerciseGeneratorConfig } from '../models/Exercise';
import { IExerciseGenerator, getRandomNumber } from './types';

export class ComparisonGenerator implements IExerciseGenerator {
  generate(config?: ExerciseGeneratorConfig): Exercise<ComparisonSymbol>[] {
    const count = config?.count ?? 10;
    const minNumber = config?.minNumber ?? 1;
    const maxNumber = config?.maxNumber ?? 10;

    const exercises: Exercise<ComparisonSymbol>[] = [];
    const usedPairs = new Set<string>();

    let id = 1;
    let attempts = 0;
    const maxAttempts = count * 30;

    // Distribuir equitativamente los tipos de comparación (mayor, menor, igual)
    const modes: ComparisonSymbol[] = ['>', '<', '='];

    while (exercises.length < count && attempts < maxAttempts) {
      attempts++;
      const targetMode = modes[exercises.length % modes.length];

      let num1 = getRandomNumber(minNumber, maxNumber);
      let num2 = getRandomNumber(minNumber, maxNumber);

      if (targetMode === '=') {
        num2 = num1;
      } else if (targetMode === '>') {
        if (num1 <= num2) {
          if (num1 === maxNumber) {
            num2 = getRandomNumber(minNumber, maxNumber - 1);
          } else {
            num1 = getRandomNumber(Math.min(num2 + 1, maxNumber), maxNumber);
          }
        }
      } else if (targetMode === '<') {
        if (num1 >= num2) {
          if (num1 === minNumber) {
            num2 = getRandomNumber(minNumber + 1, maxNumber);
          } else {
            num1 = getRandomNumber(minNumber, Math.max(minNumber, num2 - 1));
          }
        }
      }

      if (num1 === num2 && targetMode !== '=') {
        continue;
      }

      const key = `${num1}?${num2}`;
      if (usedPairs.has(key)) {
        continue;
      }
      usedPairs.add(key);

      const correctAnswer: ComparisonSymbol =
        num1 > num2 ? '>' : num1 < num2 ? '<' : '=';

      const explanation =
        correctAnswer === '>'
          ? `${num1} es mayor que ${num2}`
          : correctAnswer === '<'
          ? `${num1} es menor que ${num2}`
          : `${num1} es igual a ${num2}`;

      exercises.push({
        id: id++,
        question: `¿Cuál es el signo correcto?`,
        subtext: `Compara ${num1} y ${num2}`,
        correctAnswer,
        options: ['>', '=', '<'],
        category: 'comparacion',
        difficulty: maxNumber <= 10 ? 1 : maxNumber <= 20 ? 2 : 3,
        operand1: num1,
        operand2: num2,
        explanation,
      });
    }

    return exercises;
  }
}
