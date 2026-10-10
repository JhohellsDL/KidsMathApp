import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';

interface ExitConfirmModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ExitConfirmModal = ({
  visible,
  onConfirm,
  onCancel,
}: ExitConfirmModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.iconCircle}>
            <Text style={styles.emoji}>🏠</Text>
          </View>

          <Text style={styles.title}>¿Deseas salir?</Text>
          <Text style={styles.message}>
            Tu progreso de esta ronda se reiniciará si vuelves al menú principal.
          </Text>

          <View style={styles.buttonStack}>
            <TouchableOpacity
              style={[styles.button, styles.continueButton]}
              onPress={onCancel}
              activeOpacity={0.85}>
              <Text style={styles.continueText}>Seguir practicando 🚀</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.exitButton]}
              onPress={onConfirm}
              activeOpacity={0.85}>
              <Text style={styles.exitText}>Salir al inicio</Text>
            </TouchableOpacity>
          </View>
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
    maxWidth: 340,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    borderBottomWidth: 5,
    borderBottomColor: '#CBD5E1',
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#BAE6FD',
  },
  emoji: {
    fontSize: 34,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  buttonStack: {
    width: '100%',
    gap: 10,
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButton: {
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderBottomWidth: 4,
    borderBottomColor: COLORS.successDark,
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  exitButton: {
    backgroundColor: '#F1F5F9',
    borderWidth: 2,
    borderColor: COLORS.border,
    borderBottomWidth: 3,
    borderBottomColor: '#CBD5E1',
  },
  exitText: {
    color: '#64748B',
    fontSize: 15,
    fontWeight: '700',
  },
});
