import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Animated} from 'react-native';

interface OptionCardProps {
  value: number;
  onPress: () => void;
  isSelected?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  disabled?: boolean;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  value,
  onPress,
  isSelected = false,
  isCorrect = false,
  isWrong = false,
  disabled = false,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    onPress();
  };

  const getBackgroundColor = () => {
    if (isCorrect) return '#4CAF50'; // Verde
    if (isWrong) return '#FF5252'; // Rojo
    if (isSelected) return '#2196F3'; // Azul
    return '#FFFFFF'; // Blanco
  };

  const getTextColor = () => {
    if (isCorrect || isWrong || isSelected) return '#FFFFFF';
    return '#333333';
  };

  return (
    <Animated.View style={{transform: [{scale: scaleAnim}]}}>
      <TouchableOpacity
        style={[styles.card, {backgroundColor: getBackgroundColor()}]}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.8}>
        <Text style={[styles.text, {color: getTextColor()}]}>{value}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 140,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderWidth: 4,
    borderColor: '#E0E0E0',
  },
  text: {
    fontSize: 52,
    fontWeight: 'bold',
  },
});

