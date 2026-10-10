import { useProgressStore } from '../../src/state/progressStore';

describe('useProgressStore', () => {
  beforeEach(() => {
    useProgressStore.getState().clearHistory();
  });

  it('starts a session and tracks answers', () => {
    const store = useProgressStore.getState();
    store.startSession('suma', 'easy');

    expect(useProgressStore.getState().activeSessionId).toBeDefined();
    expect(useProgressStore.getState().questionsAnswered).toBe(0);

    store.recordAnswer(true);
    store.recordAnswer(false);
    store.recordAnswer(true);

    expect(useProgressStore.getState().questionsAnswered).toBe(3);
    expect(useProgressStore.getState().correctAnswers).toBe(2);
  });

  it('handles pause and resume without negative duration', () => {
    const store = useProgressStore.getState();
    store.startSession('resta', 'medium');

    store.pauseSession();
    expect(useProgressStore.getState().isPaused).toBe(true);

    store.resumeSession();
    expect(useProgressStore.getState().isPaused).toBe(false);
  });

  it('completes session and persists to sessions list', () => {
    const store = useProgressStore.getState();
    store.startSession('comparacion', 'hard');

    store.recordAnswer(true);
    store.recordAnswer(true);

    const record = store.finishSession(true);

    expect(record).not.toBeNull();
    expect(record?.status).toBe('completed');
    expect(record?.category).toBe('comparacion');
    expect(record?.questionsAnswered).toBe(2);
    expect(record?.correctAnswers).toBe(2);

    expect(useProgressStore.getState().sessions).toHaveLength(1);
    expect(useProgressStore.getState().activeSessionId).toBeNull();
  });

  it('discards interrupted sessions if zero questions were answered', () => {
    const store = useProgressStore.getState();
    store.startSession('suma', 'easy');

    const record = store.finishSession(false);
    expect(record).toBeNull();
    expect(useProgressStore.getState().sessions).toHaveLength(0);
  });
});
