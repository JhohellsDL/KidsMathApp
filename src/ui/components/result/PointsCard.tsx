import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

interface PointsCardProps {
  earnedPoints: number;
  totalPoints: number;
}

export const PointsCard: React.FC<PointsCardProps> = ({
  earnedPoints,
  totalPoints,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.icon}>⭐</Text>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Puntos de esta ronda:</Text>
          <Text style={styles.value}>+{earnedPoints}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.icon}>🏅</Text>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Puntos acumulados:</Text>
          <Text style={styles.totalValue}>{totalPoints}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '100%',
    marginBottom: 18,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  icon: {
    fontSize: 28,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },
  value: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.success,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 10,
    width: '100%',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.warning,
  },
});
