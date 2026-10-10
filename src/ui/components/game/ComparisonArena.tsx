import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

interface ComparisonArenaProps {
  operand1?: number;
  operand2?: number;
  selectedOption: number | string | null;
  showFeedback: boolean;
  isCorrect?: boolean;
}

export const ComparisonArena: React.FC<ComparisonArenaProps> = ({
  operand1,
  operand2,
  selectedOption,
  showFeedback,
  isCorrect,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.numberCard}>
        <Text style={styles.numberText}>{operand1}</Text>
      </View>

      <View
        style={[
          styles.slot,
          showFeedback && (isCorrect ? styles.slotCorrect : styles.slotWrong),
        ]}>
        <Text
          style={[
            styles.slotText,
            showFeedback && (isCorrect ? styles.slotTextCorrect : styles.slotTextWrong),
          ]}>
          {showFeedback ? selectedOption : '?'}
        </Text>
      </View>

      <View style={styles.numberCard}>
        <Text style={styles.numberText}>{operand2}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 10,
  },
  numberCard: {
    backgroundColor: COLORS.background,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: COLORS.borderDark,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.text,
  },
  slot: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 18,
    borderWidth: 2.5,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotCorrect: {
    backgroundColor: COLORS.successLight,
    borderColor: COLORS.success,
    borderStyle: 'solid',
  },
  slotWrong: {
    backgroundColor: COLORS.dangerLight,
    borderColor: COLORS.danger,
    borderStyle: 'solid',
  },
  slotText: {
    fontSize: 36,
    fontWeight: '900',
    color: COLORS.primaryDark,
  },
  slotTextCorrect: {
    color: COLORS.success,
  },
  slotTextWrong: {
    color: COLORS.danger,
  },
});
