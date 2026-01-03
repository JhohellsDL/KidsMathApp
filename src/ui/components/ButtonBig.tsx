import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface ButtonBigProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
}

export const ButtonBig: React.FC<ButtonBigProps> = ({
  title,
  onPress,
  backgroundColor = '#4CAF50',
  textColor = '#FFFFFF',
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor}, style]}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text style={[styles.text, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

