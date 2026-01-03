import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface AvatarProps {
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({size = 80}) => {
  return (
    <View style={[styles.container, {width: size, height: size}]}>
      <Text style={[styles.emoji, {fontSize: size * 0.6}]}>🧒</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    backgroundColor: '#FFE082',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  emoji: {
    textAlign: 'center',
  },
});

