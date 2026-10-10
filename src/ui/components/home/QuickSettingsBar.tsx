import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';

interface QuickSettingsBarProps {
  difficultyLabel: string;
  exerciseCount: number;
  onPressSettings: () => void;
}

export const QuickSettingsBar: React.FC<QuickSettingsBarProps> = ({
  difficultyLabel,
  exerciseCount,
  onPressSettings,
}) => {
  return (
    <View style={styles.quickBar}>
      <TouchableOpacity
        style={styles.quickItem}
        onPress={onPressSettings}
        activeOpacity={0.7}>
        <Text style={styles.quickLabel}>Dificultad:</Text>
        <Text style={styles.quickValue}>{difficultyLabel}</Text>
      </TouchableOpacity>

      <View style={styles.quickDivider} />

      <TouchableOpacity
        style={styles.quickItem}
        onPress={onPressSettings}
        activeOpacity={0.7}>
        <Text style={styles.quickLabel}>Ejercicios:</Text>
        <Text style={styles.quickValue}>{exerciseCount}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  quickBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  quickItem: {
    flex: 1,
    alignItems: 'center',
  },
  quickDivider: {
    width: 1,
    height: 28,
    backgroundColor: COLORS.border,
  },
  quickLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
    marginBottom: 2,
  },
  quickValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
});
