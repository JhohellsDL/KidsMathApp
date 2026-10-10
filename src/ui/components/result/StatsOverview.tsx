import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

interface StatsOverviewProps {
  correctAnswers: number;
  totalExercises: number;
  percentage: number;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  correctAnswers,
  totalExercises,
  percentage,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.boxCorrect]}>
        <Text style={styles.icon}>✅</Text>
        <Text style={styles.value}>{correctAnswers}</Text>
        <Text style={styles.label}>Correctas</Text>
      </View>

      <View style={[styles.box, styles.boxTotal]}>
        <Text style={styles.icon}>📝</Text>
        <Text style={styles.value}>{totalExercises}</Text>
        <Text style={styles.label}>Total</Text>
      </View>

      <View style={[styles.box, styles.boxPercent]}>
        <Text style={styles.icon}>🎯</Text>
        <Text style={styles.value}>{percentage}%</Text>
        <Text style={styles.label}>Precisión</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    gap: 10,
  },
  box: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    flex: 1,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
  },
  boxCorrect: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
    borderBottomColor: '#86EFAC',
  },
  boxTotal: {
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
    borderBottomColor: '#CBD5E1',
  },
  boxPercent: {
    backgroundColor: '#FFFBEB',
    borderColor: COLORS.warningBorder,
    borderBottomColor: '#FCD34D',
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
  },
  value: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },
  label: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
    fontWeight: '600',
  },
});
