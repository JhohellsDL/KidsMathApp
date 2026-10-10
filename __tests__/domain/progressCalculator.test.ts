import {
  calculateProgressSummary,
  formatDurationFriendly,
  formatSessionDate,
} from '../../src/domain/validators/progressCalculator';
import { SessionRecord } from '../../src/domain/models/Progress';

describe('progressCalculator', () => {
  const mockSessions: SessionRecord[] = [
    {
      id: 'sess_1',
      category: 'suma',
      startedAt: '2026-10-10T10:00:00.000Z',
      endedAt: '2026-10-10T10:02:30.000Z',
      durationSeconds: 150,
      questionsAnswered: 10,
      correctAnswers: 9,
      totalPointsEarned: 90,
      status: 'completed',
      difficulty: 'easy',
    },
    {
      id: 'sess_2',
      category: 'resta',
      startedAt: '2026-10-10T11:00:00.000Z',
      endedAt: '2026-10-10T11:01:00.000Z',
      durationSeconds: 60,
      questionsAnswered: 5,
      correctAnswers: 4,
      totalPointsEarned: 40,
      status: 'interrupted',
      difficulty: 'medium',
    },
    {
      id: 'sess_3',
      category: 'suma',
      startedAt: '2026-10-09T15:00:00.000Z',
      endedAt: '2026-10-09T15:05:00.000Z',
      durationSeconds: 300,
      questionsAnswered: 10,
      correctAnswers: 7,
      totalPointsEarned: 70,
      status: 'completed',
      difficulty: 'hard',
    },
  ];

  it('calculates total metrics, today metrics and weighted accuracy correctly', () => {
    const refDate = new Date('2026-10-10T12:00:00.000Z');
    const summary = calculateProgressSummary(mockSessions, refDate);

    expect(summary.totalPracticeSeconds).toBe(150 + 60 + 300); // 510s
    expect(summary.todayPracticeSeconds).toBe(150 + 60); // 210s
    expect(summary.completedSessionsCount).toBe(2);
    expect(summary.totalQuestionsAnswered).toBe(25);
    expect(summary.totalCorrectAnswers).toBe(20);
    // 20 / 25 = 80%
    expect(summary.accuracyPercentage).toBe(80);

    expect(summary.categoryStats.suma?.sessionsCount).toBe(2);
    expect(summary.categoryStats.suma?.totalSeconds).toBe(450);
    expect(summary.categoryStats.suma?.correctAnswers).toBe(16);
    expect(summary.categoryStats.resta?.sessionsCount).toBe(1);
  });

  it('returns 0 accuracy when no questions answered', () => {
    const summary = calculateProgressSummary([]);
    expect(summary.accuracyPercentage).toBe(0);
    expect(summary.totalPracticeSeconds).toBe(0);
    expect(summary.completedSessionsCount).toBe(0);
  });

  it('formats friendly durations accurately', () => {
    expect(formatDurationFriendly(35)).toBe('35 s');
    expect(formatDurationFriendly(60)).toBe('1 min');
    expect(formatDurationFriendly(125)).toBe('2 min 5 s');
    expect(formatDurationFriendly(3600)).toBe('1 h');
    expect(formatDurationFriendly(3750)).toBe('1 h 2 min');
  });

  it('formats session dates gracefully', () => {
    const formatted = formatSessionDate(new Date().toISOString());
    expect(formatted).toContain('Hoy');
  });
});
