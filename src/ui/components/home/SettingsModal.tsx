import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';

interface SettingsModalProps {
  visible: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  exerciseCount: number;
  onDifficultyChange: (diff: 'easy' | 'medium' | 'hard') => void;
  onExerciseCountChange: (count: number) => void;
  onClose: () => void;
}

export const SettingsModal = ({
  visible,
  difficulty,
  exerciseCount,
  onDifficultyChange,
  onExerciseCountChange,
  onClose,
}: SettingsModalProps) => {
  const getDifficultyLabel = (diff: string) => {
    switch (diff) {
      case 'easy':
        return 'Fácil (1 a 10)';
      case 'medium':
        return 'Medio (1 a 20)';
      case 'hard':
        return 'Avanzado (1 a 50)';
      default:
        return '';
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Configuración ⚙️</Text>

          {/* Dificultad */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rango de números:</Text>
            <View style={styles.optionsRow}>
              {(['easy', 'medium', 'hard'] as const).map(diff => (
                <TouchableOpacity
                  key={diff}
                  style={[
                    styles.chip,
                    difficulty === diff && styles.chipActive,
                  ]}
                  onPress={() => onDifficultyChange(diff)}>
                  <Text
                    style={[
                      styles.chipText,
                      difficulty === diff && styles.chipTextActive,
                    ]}>
                    {diff === 'easy'
                      ? '1 - 10'
                      : diff === 'medium'
                        ? '1 - 20'
                        : '1 - 50'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.helperText}>{getDifficultyLabel(difficulty)}</Text>
          </View>

          {/* Cantidad de ejercicios */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cantidad de ejercicios:</Text>
            <View style={styles.optionsRow}>
              {[5, 10, 20].map(count => (
                <TouchableOpacity
                  key={count}
                  style={[
                    styles.chip,
                    exerciseCount === count && styles.chipActive,
                  ]}
                  onPress={() => onExerciseCountChange(count)}>
                  <Text
                    style={[
                      styles.chipText,
                      exerciseCount === count && styles.chipTextActive,
                    ]}>
                    {count}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}>
            <Text style={styles.closeText}>Guardar y Listo 👍</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(17, 28, 54, 0.79)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modal: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 360,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderBottomWidth: 5,
    borderBottomColor: '#CBD5E1',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderBottomWidth: 3,
    borderBottomColor: '#CBD5E1',
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
    borderBottomColor: COLORS.primaryDark,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  chipTextActive: {
    color: COLORS.primaryDark,
    fontWeight: '800',
  },
  helperText: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 6,
    fontStyle: 'italic',
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderBottomWidth: 4,
    borderBottomColor: COLORS.primaryDark,
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
