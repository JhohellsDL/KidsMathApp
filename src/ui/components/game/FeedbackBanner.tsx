import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../../theme/colors';

interface FeedbackBannerProps {
  isCorrect: boolean;
  message: string;
  explanation: string;
}

export const FeedbackBanner: React.FC<FeedbackBannerProps> = ({
  isCorrect,
  message,
  explanation,
}) => {
  const enterAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(enterAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [enterAnim, translateY]);

  return (
    <Animated.View
      style={[
        styles.banner,
        isCorrect ? styles.correctBanner : styles.wrongBanner,
        {
          opacity: enterAnim,
          transform: [{ translateY }],
        },
      ]}>
      <Text style={styles.emoji}>{isCorrect ? '🎉' : '💡'}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{message}</Text>
        <Text style={styles.explanation}>{explanation}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    borderWidth: 2,
    borderBottomWidth: 3,
  },
  correctBanner: {
    backgroundColor: '#F0FDF4',
    borderColor: COLORS.successBorder,
  },
  wrongBanner: {
    backgroundColor: '#FEF2F2',
    borderColor: COLORS.dangerBorder,
  },
  emoji: {
    fontSize: 26,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
  },
  explanation: {
    fontSize: 13,
    color: '#475569',
    marginTop: 2,
    fontWeight: '600',
    lineHeight: 18,
  },
});

