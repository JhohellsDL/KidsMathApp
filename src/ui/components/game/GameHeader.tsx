import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';

interface GameHeaderProps {
  progress: number;
  currentIndex: number;
  totalExercises: number;
  points: number;
  correctAnswers: number;
  onExitPress?: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  progress,
  currentIndex,
  totalExercises,
  points,
  correctAnswers,
  onExitPress,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        {onExitPress && (
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onExitPress}
            activeOpacity={0.7}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        )}

        <View style={styles.progressContainer}>
          <View style={styles.barBg}>
            <Animated.View style={[styles.barFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.counterText}>
            {currentIndex + 1} de {totalExercises}
          </Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeIcon}>⭐</Text>
          <Text style={styles.badgeText}>{points} pts</Text>
        </View>
        <View style={[styles.badge, styles.correctBadge]}>
          <Text style={styles.badgeIcon}>✅</Text>
          <Text style={styles.badgeText}>{correctAnswers} aciertos</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 12,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  closeIcon: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMuted,
  },
  progressContainer: {
    flex: 1,
  },
  barBg: {
    height: 10,
    backgroundColor: COLORS.border,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 4,
  },
  barFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  counterText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
    textAlign: 'right',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  correctBadge: {
    backgroundColor: COLORS.successLight,
    borderColor: COLORS.successBorder,
  },
  badgeIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
});

