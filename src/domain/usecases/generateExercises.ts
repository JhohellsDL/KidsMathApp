import {Exercise} from '../models/Exercise';

/**
 * Generador de ejercicios aleatorios
 * Crea ejercicios de sumas con números aleatorios
 */
export class GenerateExercisesUseCase {
  /**
   * Genera ejercicios de suma aleatorios
   * @param count Cantidad de ejercicios a generar
   * @param minNumber Número mínimo (default: 1)
   * @param maxNumber Número máximo (default: 10)
   * @returns Array de ejercicios generados
   */
  execute(
    count: number = 20,
    minNumber: number = 1,
    maxNumber: number = 10,
  ): Exercise[] {
    const exercises: Exercise[] = [];
    const usedQuestions = new Set<string>();

    let id = 1;
    while (exercises.length < count) {
      // Generar dos números aleatorios
      const num1 = this.randomNumber(minNumber, maxNumber);
      const num2 = this.randomNumber(minNumber, maxNumber);
      const correctAnswer = num1 + num2;

      // Crear key única para evitar duplicados
      const questionKey = `${num1}+${num2}`;
      if (usedQuestions.has(questionKey)) {
        continue; // Saltar si ya existe
      }
      usedQuestions.add(questionKey);

      // Generar opciones incorrectas
      const options = this.generateOptions(correctAnswer, minNumber, maxNumber);

      // Determinar dificultad basada en el resultado
      const difficulty = correctAnswer <= 10 ? 1 : 2;

      exercises.push({
        id: id++,
        question: `¿Cuánto es ${num1} + ${num2}?`,
        correctAnswer,
        options,
        category: 'suma',
        difficulty,
      });
    }

    return exercises;
  }

  /**
   * Genera un número aleatorio entre min y max (inclusive)
   */
  private randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Genera 4 opciones: la correcta + 3 incorrectas
   */
  private generateOptions(
    correctAnswer: number,
    minNumber: number,
    maxNumber: number,
  ): number[] {
    const options = new Set<number>();
    options.add(correctAnswer);

    // Generar 3 opciones incorrectas cercanas a la respuesta correcta
    while (options.size < 4) {
      // Opciones cercanas para que sea desafiante
      const offset = this.randomNumber(-3, 3);
      const option = correctAnswer + offset;

      // Validar que la opción sea razonable
      if (option > 0 && option !== correctAnswer && option <= maxNumber * 2) {
        options.add(option);
      }
    }

    // Mezclar las opciones aleatoriamente
    return Array.from(options).sort(() => Math.random() - 0.5);
  }

  /**
   * Genera ejercicios mezclando estáticos y aleatorios
   * @param staticExercises Ejercicios del JSON
   * @param totalCount Total de ejercicios deseados
   * @returns Mix de ejercicios estáticos y generados
   */
  executeHybrid(staticExercises: Exercise[], totalCount: number): Exercise[] {
    // Si queremos más ejercicios de los que tenemos estáticos
    if (totalCount <= staticExercises.length) {
      // Mezclar y retornar solo estáticos
      return staticExercises
        .sort(() => Math.random() - 0.5)
        .slice(0, totalCount);
    }

    // Mezclar ejercicios estáticos
    const shuffledStatic = staticExercises.sort(() => Math.random() - 0.5);

    // Generar ejercicios adicionales
    const additionalCount = totalCount - staticExercises.length;
    const generatedExercises = this.execute(additionalCount);

    // Combinar y mezclar todos
    return [...shuffledStatic, ...generatedExercises].sort(
      () => Math.random() - 0.5,
    );
  }
}

