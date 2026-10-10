import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from '../Avatar';
import { COLORS } from '../../theme/colors';

interface HomeHeaderProps {
  totalPoints: number;
  onOpenProgress: () => void;
  onOpenSettings: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  totalPoints,
  onOpenProgress,
  onOpenSettings,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.avatarRow}>
        <View style={styles.avatarCircle}>
          <Avatar size={48} />
        </View>
        <View style={styles.pointsBadge}>
          <Text style={styles.starEmoji}>⭐</Text>
          <Text style={styles.pointsText}>{totalPoints}</Text>
        </View>
      </View>

      <View style={styles.headerActions}>
        <TouchableOpacity
          style={styles.progressButton}
          onPress={onOpenProgress}
          activeOpacity={0.75}>
          <Text style={styles.progressIcon}>📊</Text>
          <Text style={styles.progressBtnText}>Progreso</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={onOpenSettings}
          activeOpacity={0.7}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarCircle: {
    backgroundColor: COLORS.card,
    borderRadius: 25,
    padding: 2,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.warningLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.warningBorder,
  },
  starEmoji: {
    fontSize: 15,
    marginRight: 4,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.warning,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#BAE6FD',
  },
  progressIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  progressBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
  },
  settingsButton: {
    backgroundColor: '#F1F5F9',
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  settingsIcon: {
    fontSize: 18,
  },
});
