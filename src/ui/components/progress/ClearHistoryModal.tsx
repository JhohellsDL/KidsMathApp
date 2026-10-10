import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';

interface ClearHistoryModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ClearHistoryModal: React.FC<ClearHistoryModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
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
            <Text style={styles.emoji}>🗑️</Text>
          </View>

          <Text style={styles.title}>¿Borrar historial?</Text>
          <Text style={styles.message}>
            Se reiniciarán tus estadísticas y sesiones registradas en este dispositivo.
          </Text>

          <View style={styles.buttonStack}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
              activeOpacity={0.85}>
              <Text style={styles.cancelText}>No, conservar datos 👍</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={onConfirm}
              activeOpacity={0.85}>
              <Text style={styles.deleteText}>Sí, borrar todo</Text>
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
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
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
    backgroundColor: COLORS.dangerLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 2,
    borderColor: COLORS.dangerBorder,
  },
  emoji: {
    fontSize: 32,
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
  cancelButton: {
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderBottomWidth: 4,
    borderBottomColor: COLORS.primaryDark,
  },
  cancelText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
    borderWidth: 2,
    borderColor: '#FECACA',
    borderBottomWidth: 3,
    borderBottomColor: '#FCA5A5',
  },
  deleteText: {
    color: COLORS.danger,
    fontSize: 15,
    fontWeight: '800',
  },
});
