import { Exercise, ExerciseCategory } from '../models/Exercise';
import { AdditionGenerator } from '../generators/AdditionGenerator';
import { SubtractionGenerator } from '../generators/SubtractionGenerator';
import { ComparisonGenerator } from '../generators/ComparisonGenerator';

/**
 * Caso de uso central para generación de ejercicios matemáticos.
 * Soporta Sumas, Restas y Comparaciones (Mayor, menor o igual).
 */
export class GenerateExercisesUseCase {
  private additionGenerator = new AdditionGenerator();
  private subtractionGenerator = new SubtractionGenerator();
  private comparisonGenerator = new ComparisonGenerator();

  /**
   * Genera ejercicios según la categoría y rangos configurados.
   * Mantiene compatibilidad total con llamadas directas (default: suma).
   */
  execute(
    count: number = 10,
    minNumber: number = 1,
    maxNumber: number = 10,
    category: ExerciseCategory = 'suma',
  ): Exercise[] {
    const config = { count, minNumber, maxNumber };

    switch (category) {
      case 'resta':
        return this.subtractionGenerator.generate(config);
      case 'comparacion':
        return this.comparisonGenerator.generate(config);
      case 'suma':
      default:
        return this.additionGenerator.generate(config);
    }
  }

  /**
   * Genera ejercicios mezclando estáticos y aleatorios.
   */
  executeHybrid(
    staticExercises: Exercise[],
    totalCount: number,
    category: ExerciseCategory = 'suma',
  ): Exercise[] {
    if (totalCount <= staticExercises.length) {
      return [...staticExercises]
        .sort(() => Math.random() - 0.5)
        .slice(0, totalCount);
    }

    const shuffledStatic = [...staticExercises].sort(() => Math.random() - 0.5);
    const additionalCount = totalCount - staticExercises.length;
    const generatedExercises = this.execute(additionalCount, 1, 10, category);

    return [...shuffledStatic, ...generatedExercises].sort(
      () => Math.random() - 0.5,
    );
  }
}
