import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SessionRecord } from '../../../domain/models/Progress';
import { ExerciseCategory } from '../../../domain/models/Exercise';
import {
  formatDurationFriendly,
  formatSessionDate,
} from '../../../domain/validators/progressCalculator';
import { COLORS } from '../../theme/colors';

interface SessionCardProps {
  session: SessionRecord;
}

const CATEGORY_NAMES: Record<ExerciseCategory, { title: string; icon: string }> = {
  suma: { title: 'Sumas', icon: '➕' },
  resta: { title: 'Restas', icon: '➖' },
  comparacion: { title: 'Mayor, menor o igual', icon: '⚖️' },
  anterior_posterior: { title: 'Anterior y posterior', icon: '↔️' },
  suma_incompleta: { title: 'Sumas incompletas', icon: '🧩' },
  resta_incompleta: { title: 'Restas incompletas', icon: '🔍' },
  multiplicacion: { title: 'Multiplicación', icon: '✖️' },
  division: { title: 'División', icon: '➗' },
};

export const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  const meta = CATEGORY_NAMES[session.category] || {
    title: session.category,
    icon: '📝',
  };
  const isCompleted = session.status === 'completed';
  const accuracy =
    session.questionsAnswered > 0
      ? Math.round((session.correctAnswers / session.questionsAnswered) * 100)
      : 0;

  return (
    <View style={styles.sessionCard}>
      <View style={styles.sessionHeader}>
        <View style={styles.sessionTitleRow}>
          <Text style={styles.sessionIcon}>{meta.icon}</Text>
          <View>
            <Text style={styles.sessionCategoryTitle}>{meta.title}</Text>
            <Text style={styles.sessionDate}>{formatSessionDate(session.startedAt)}</Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            isCompleted ? styles.statusCompleted : styles.statusInterrupted,
          ]}>
          <Text
            style={[
              styles.statusText,
              isCompleted ? styles.statusCompletedText : styles.statusInterruptedText,
            ]}>
            {isCompleted ? '🏆 Completada' : '⏸️ Práctica breve'}
          </Text>
        </View>
      </View>

      <View style={styles.sessionStatsGrid}>
        <View style={styles.sessionStatCol}>
          <Text style={styles.sessionStatLabel}>Resultado</Text>
          <Text style={styles.sessionStatVal}>
            {session.correctAnswers} / {session.questionsAnswered}
          </Text>
        </View>
        <View style={styles.sessionStatCol}>
          <Text style={styles.sessionStatLabel}>Precisión</Text>
          <Text style={styles.sessionStatVal}>{accuracy}%</Text>
        </View>
        <View style={styles.sessionStatCol}>
          <Text style={styles.sessionStatLabel}>Duración</Text>
          <Text style={styles.sessionStatVal}>
            {formatDurationFriendly(session.durationSeconds)}
          </Text>
        </View>
        <View style={styles.sessionStatCol}>
          <Text style={styles.sessionStatLabel}>Puntos</Text>
          <Text style={[styles.sessionStatVal, { color: COLORS.warning }]}>
            +{session.totalPointsEarned}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sessionCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
    marginBottom: 12,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sessionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  sessionCategoryTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
  },
  sessionDate: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusCompleted: {
    backgroundColor: '#DCFCE7',
  },
  statusInterrupted: {
    backgroundColor: '#F1F5F9',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusCompletedText: {
    color: '#15803D',
  },
  statusInterruptedText: {
    color: '#64748B',
  },
  sessionStatsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  sessionStatCol: {
    alignItems: 'center',
  },
  sessionStatLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  sessionStatVal: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.text,
  },
});
