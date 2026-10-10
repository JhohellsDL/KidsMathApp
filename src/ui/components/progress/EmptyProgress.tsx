import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';

interface EmptyProgressProps {
  onStartPractice: () => void;
}

export const EmptyProgress: React.FC<EmptyProgressProps> = ({ onStartPractice }) => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>📖</Text>
      <Text style={styles.emptyTitle}>Sin sesiones aún</Text>
      <Text style={styles.emptySubtitle}>
        Tus rondas de sumas, restas y comparaciones aparecerán aquí automáticamente.
      </Text>
      <TouchableOpacity
        style={styles.startBtn}
        onPress={onStartPractice}
        activeOpacity={0.85}>
        <Text style={styles.startBtnText}>🎮 Practicar ahora</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 30,
  },
  emptyEmoji: {
    fontSize: 54,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  startBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderBottomWidth: 4,
    borderBottomColor: COLORS.primaryDark,
  },
  startBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
