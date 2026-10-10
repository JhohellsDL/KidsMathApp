import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';

interface ProgressHeaderProps {
  onBack: () => void;
  onClear: () => void;
  hasSessions: boolean;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  onBack,
  onClear,
  hasSessions,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        activeOpacity={0.7}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Mi Progreso 📊</Text>
      {hasSessions ? (
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={onClear}
          activeOpacity={0.7}>
          <Text style={styles.clearBtnText}>Borrar</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  backIcon: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  clearBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: COLORS.dangerLight,
  },
  clearBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.danger,
  },
  placeholder: {
    width: 40,
  },
});
