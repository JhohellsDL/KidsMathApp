import {Exercise} from '../models/Exercise';
import {ExerciseRepository} from '../../data/repository/ExerciseRepository';

export class GetExercisesUseCase {
  private repository: ExerciseRepository;

  constructor() {
    this.repository = new ExerciseRepository();
  }

  execute(count: number = 20): Exercise[] {
    return this.repository.getRandomExercises(count);
  }

  executeByCategory(category: string): Exercise[] {
    return this.repository.getExercisesByCategory(category);
  }
}

