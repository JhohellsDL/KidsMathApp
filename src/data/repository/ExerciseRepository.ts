import { Exercise } from '../../domain/models/Exercise';

export class ExerciseRepository {
  private exercises: Exercise[];

  constructor() {
    this.exercises = [] as Exercise[];
  }

  getAllExercises(): Exercise[] {
    return this.exercises;
  }

  getExercisesByCategory(category: string): Exercise[] {
    return this.exercises.filter(ex => ex.category === category);
  }

  getRandomExercises(count: number): Exercise[] {
    const shuffled = [...this.exercises].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
}

