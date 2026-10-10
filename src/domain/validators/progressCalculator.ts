import { SessionRecord, ProgressSummary, CategoryProgress } from '../models/Progress';
import { ExerciseCategory } from '../models/Exercise';

/**
 * Calcula el resumen global de progreso matemático a partir de las sesiones históricas.
 */
export const calculateProgressSummary = (
  sessions: SessionRecord[],
  referenceDate: Date = new Date(),
): ProgressSummary => {
  let totalPracticeSeconds = 0;
  let todayPracticeSeconds = 0;
  let completedSessionsCount = 0;
  let totalQuestionsAnswered = 0;
  let totalCorrectAnswers = 0;

  const categoryStats: Partial<Record<ExerciseCategory, CategoryProgress>> = {};

  const todayStr = referenceDate.toISOString().slice(0, 10); // YYYY-MM-DD

  for (const session of sessions) {
    const validDuration = Math.max(0, session.durationSeconds);
    totalPracticeSeconds += validDuration;

    // Verificar si corresponde al día de hoy
    const sessionDateStr = session.startedAt.slice(0, 10);
    if (sessionDateStr === todayStr) {
      todayPracticeSeconds += validDuration;
    }

    if (session.status === 'completed') {
      completedSessionsCount++;
    }

    totalQuestionsAnswered += session.questionsAnswered;
    totalCorrectAnswers += session.correctAnswers;

    // Métricas por categoría
    if (!categoryStats[session.category]) {
      categoryStats[session.category] = {
        sessionsCount: 0,
        totalSeconds: 0,
        correctAnswers: 0,
        questionsAnswered: 0,
      };
    }

    const cat = categoryStats[session.category]!;
    cat.sessionsCount++;
    cat.totalSeconds += validDuration;
    cat.correctAnswers += session.correctAnswers;
    cat.questionsAnswered += session.questionsAnswered;
  }

  const accuracyPercentage =
    totalQuestionsAnswered > 0
      ? Math.round((totalCorrectAnswers / totalQuestionsAnswered) * 100)
      : 0;

  return {
    totalPracticeSeconds,
    todayPracticeSeconds,
    completedSessionsCount,
    totalQuestionsAnswered,
    totalCorrectAnswers,
    accuracyPercentage,
    categoryStats,
  };
};

/**
 * Formatea una cantidad de segundos en un string amigable para niños/padres (ej: '45 seg', '12 min', '1 h 25 min')
 */
export const formatDurationFriendly = (totalSeconds: number): string => {
  const seconds = Math.max(0, Math.floor(totalSeconds));

  if (seconds < 60) {
    return `${seconds} s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSecs = seconds % 60;

  if (minutes < 60) {
    return remainingSecs > 0 ? `${minutes} min ${remainingSecs} s` : `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;

  return remainingMins > 0 ? `${hours} h ${remainingMins} min` : `${hours} h`;
};

/**
 * Formatea una fecha ISO a fecha amigable local (ej: 'Hoy, 2:30 PM', 'Ayer, 10:15 AM', '10 oct, 4:00 PM')
 */
export const formatSessionDate = (isoString: string): string => {
  try {
    const date = new Date(isoString);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (isToday) {
      return `Hoy, ${timeStr}`;
    }
    if (isYesterday) {
      return `Ayer, ${timeStr}`;
    }

    const dateStr = date.toLocaleDateString([], { day: 'numeric', month: 'short' });
    return `${dateStr}, ${timeStr}`;
  } catch {
    return isoString;
  }
};
