import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ProgressSummary } from '../../../domain/models/Progress';
import { ExerciseCategory } from '../../../domain/models/Exercise';
import { formatDurationFriendly } from '../../../domain/validators/progressCalculator';
import { COLORS } from '../../theme/colors';

interface MetricsOverviewProps {
  summary: ProgressSummary;
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

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({ summary }) => {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>
      {/* Mensaje motivador */}
      <View style={styles.banner}>
        <Text style={styles.bannerEmoji}>🌟</Text>
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>¡Gran esfuerzo!</Text>
          <Text style={styles.bannerSubtitle}>
            {summary.completedSessionsCount > 0
              ? 'Cada sesión de práctica hace que resolver matemáticas sea más fácil y divertido.'
              : 'Empieza tu primera práctica de hoy para registrar tus avances.'}
          </Text>
        </View>
      </View>

      {/* Tarjetas de Métricas Principales */}
      <View style={styles.metricsGrid}>
        <View style={[styles.metricCard, styles.metricCardPrimary]}>
          <Text style={styles.metricIcon}>⏱️</Text>
          <Text style={styles.metricVal}>
            {formatDurationFriendly(summary.totalPracticeSeconds)}
          </Text>
          <Text style={styles.metricLabel}>Tiempo total</Text>
        </View>

        <View style={[styles.metricCard, styles.metricCardSuccess]}>
          <Text style={styles.metricIcon}>📅</Text>
          <Text style={styles.metricVal}>
            {formatDurationFriendly(summary.todayPracticeSeconds)}
          </Text>
          <Text style={styles.metricLabel}>Tiempo hoy</Text>
        </View>

        <View style={[styles.metricCard, styles.metricCardWarning]}>
          <Text style={styles.metricIcon}>🎯</Text>
          <Text style={styles.metricVal}>{summary.accuracyPercentage}%</Text>
          <Text style={styles.metricLabel}>Precisión global</Text>
        </View>

        <View style={[styles.metricCard, styles.metricCardDefault]}>
          <Text style={styles.metricIcon}>🏆</Text>
          <Text style={styles.metricVal}>{summary.completedSessionsCount}</Text>
          <Text style={styles.metricLabel}>Sesiones logradas</Text>
        </View>
      </View>

      {/* Desglose por Actividades */}
      <Text style={styles.sectionTitle}>Práctica por actividad</Text>
      {Object.keys(summary.categoryStats).length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>Aún no has practicado ninguna actividad.</Text>
        </View>
      ) : (
        <View style={styles.categoriesBreakdown}>
          {(Object.keys(summary.categoryStats) as ExerciseCategory[]).map(catKey => {
            const stat = summary.categoryStats[catKey];
            if (!stat || stat.sessionsCount === 0) return null;
            const meta = CATEGORY_NAMES[catKey] || { title: catKey, icon: '📝' };
            const catAccuracy =
              stat.questionsAnswered > 0
                ? Math.round((stat.correctAnswers / stat.questionsAnswered) * 100)
                : 0;

            return (
              <View key={catKey} style={styles.catCard}>
                <View style={styles.catHeader}>
                  <Text style={styles.catIcon}>{meta.icon}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.catTitle}>{meta.title}</Text>
                    <Text style={styles.catSubtitle}>
                      {stat.sessionsCount} {stat.sessionsCount === 1 ? 'sesión' : 'sesiones'} •{' '}
                      {formatDurationFriendly(stat.totalSeconds)}
                    </Text>
                  </View>
                  <View style={styles.catAccuracyBadge}>
                    <Text style={styles.catAccuracyText}>{catAccuracy}% aciertos</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderRadius: 20,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.warningBorder,
    borderBottomWidth: 4,
    borderBottomColor: '#FCD34D',
    marginBottom: 20,
  },
  bannerEmoji: {
    fontSize: 32,
    marginRight: 14,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#92400E',
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#B45309',
    marginTop: 2,
    lineHeight: 18,
    fontWeight: '500',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    width: '48%',
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
  },
  metricCardPrimary: {
    backgroundColor: '#F0F9FF',
    borderColor: '#BAE6FD',
    borderBottomColor: '#7DD3FC',
  },
  metricCardSuccess: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
    borderBottomColor: '#86EFAC',
  },
  metricCardWarning: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    borderBottomColor: '#FCD34D',
  },
  metricCardDefault: {
    backgroundColor: '#F8FAFC',
  },
  metricIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  metricVal: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 12,
  },
  categoriesBreakdown: {
    gap: 10,
  },
  catCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 14,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
  },
  catHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  catIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  catTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  catSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  catAccuracyBadge: {
    backgroundColor: COLORS.successLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  catAccuracyText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.successDark,
  },
  emptyCard: {
    padding: 20,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyText: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
});
