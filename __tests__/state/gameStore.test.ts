import { useGameStore } from '../../src/state/gameStore';
import { Exercise } from '../../src/domain/models/Exercise';

const mockExercises: Exercise[] = [
  {
    id: 1,
    question: '¿Cuánto es 1 + 1?',
    correctAnswer: 2,
    options: [1, 2, 3, 4],
    category: 'suma',
    difficulty: 1,
  },
  {
    id: 2,
    question: '¿Cuánto es 2 + 3?',
    correctAnswer: 5,
    options: [4, 5, 6, 7],
    category: 'suma',
    difficulty: 1,
  },
];

describe('useGameStore', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame();
  });

  it('should initialize and start the game correctly', () => {
    useGameStore.getState().startGame(mockExercises);

    const state = useGameStore.getState();
    expect(state.isGameActive).toBe(true);
    expect(state.exercises).toHaveLength(2);
    expect(state.currentExerciseIndex).toBe(0);
    expect(state.correctAnswers).toBe(0);
    expect(state.totalPoints).toBe(0);
    expect(state.getCurrentExercise()).toEqual(mockExercises[0]);
  });

  it('should increment correct answers and points on correct answer', () => {
    useGameStore.getState().startGame(mockExercises);
    useGameStore.getState().answerQuestion(true);

    const state = useGameStore.getState();
    expect(state.correctAnswers).toBe(1);
    expect(state.totalPoints).toBe(10);
  });

  it('should not increment points on incorrect answer', () => {
    useGameStore.getState().startGame(mockExercises);
    useGameStore.getState().answerQuestion(false);

    const state = useGameStore.getState();
    expect(state.correctAnswers).toBe(0);
    expect(state.totalPoints).toBe(0);
  });

  it('should advance to next exercise', () => {
    useGameStore.getState().startGame(mockExercises);
    expect(useGameStore.getState().isLastExercise()).toBe(false);

    useGameStore.getState().nextExercise();
    expect(useGameStore.getState().currentExerciseIndex).toBe(1);
    expect(useGameStore.getState().isLastExercise()).toBe(true);
  });

  it('should double total points on rewarded ad action', () => {
    useGameStore.getState().startGame(mockExercises);
    useGameStore.getState().answerQuestion(true); // 10 points
    useGameStore.getState().doublePoints();

    expect(useGameStore.getState().totalPoints).toBe(20);
  });

  it('should calculate progress percentage accurately', () => {
    useGameStore.getState().startGame(mockExercises);
    expect(useGameStore.getState().getProgress()).toBe(50);

    useGameStore.getState().nextExercise();
    expect(useGameStore.getState().getProgress()).toBe(100);
  });
});
