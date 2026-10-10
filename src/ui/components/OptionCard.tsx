import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../theme/colors';

interface OptionCardProps {
  value: number | string;
  onPress: () => void;
  isSelected?: boolean;
  isCorrect?: boolean;
  isRevealedCorrect?: boolean;
  isWrong?: boolean;
  isDimmed?: boolean;
  disabled?: boolean;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  value,
  onPress,
  isSelected = false,
  isCorrect = false,
  isRevealedCorrect = false,
  isWrong = false,
  isDimmed = false,
  disabled = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isCorrect) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.08,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          tension: 80,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (isWrong) {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: -8, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 8, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -5, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 5, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  }, [isCorrect, isWrong, scaleAnim, shakeAnim]);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.94,
        duration: 70,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 90,
        useNativeDriver: true,
      }),
    ]).start();
    onPress();
  };

  const getBackgroundColor = () => {
    if (isCorrect) return COLORS.success;
    if (isRevealedCorrect) return '#DCFCE7';
    if (isWrong) return COLORS.danger;
    if (isSelected) return COLORS.primary;
    return COLORS.card;
  };

  const getBorderColor = () => {
    if (isCorrect) return '#15803D';
    if (isRevealedCorrect) return COLORS.success;
    if (isWrong) return '#B91C1C';
    if (isSelected) return '#0369A1';
    return COLORS.border;
  };

  const getBottomBorderColor = () => {
    if (isCorrect) return '#166534';
    if (isRevealedCorrect) return '#86EFAC';
    if (isWrong) return '#991B1B';
    if (isSelected) return '#075985';
    return '#CBD5E1';
  };

  const getTextColor = () => {
    if (isCorrect || isWrong || isSelected) return '#FFFFFF';
    if (isRevealedCorrect) return '#166534';
    return COLORS.text;
  };

  const isSymbol = typeof value === 'string' && ['>', '<', '='].includes(value);

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }, { translateX: shakeAnim }],
        opacity: isDimmed ? 0.35 : 1,
        width: '100%',
      }}>
      <TouchableOpacity
        style={[
          styles.card,
          {
            backgroundColor: getBackgroundColor(),
            borderColor: getBorderColor(),
            borderBottomColor: getBottomBorderColor(),
          },
        ]}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.85}>
        <Text
          style={[
            styles.text,
            isSymbol && styles.symbolText,
            { color: getTextColor() },
          ]}>
          {value}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 105,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderBottomWidth: 5,
    paddingVertical: 12,
  },
  text: {
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  symbolText: {
    fontSize: 52,
    fontWeight: '800',
  },
});


