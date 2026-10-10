import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
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
  backgroundColor = '#16A34A',
  textColor = '#FFFFFF',
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.85}>
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 220,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderBottomWidth: 5,
    borderBottomColor: 'rgba(0, 0, 0, 0.22)',
  },
  text: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
});


