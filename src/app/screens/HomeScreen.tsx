import React from 'react';
import { View, Text, StyleSheet, Animated, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  ButtonBig,
  CategoryCard,
  SettingsModal,
  HomeHeader,
  QuickSettingsBar,
} from '../../ui/components';
import { CATEGORIES, useHomeScreen } from '../../ui/components/home';
import { COLORS } from '../../ui/theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const {
    totalPoints,
    selectedCategory,
    setSelectedCategory,
    difficulty,
    setDifficulty,
    exerciseCount,
    setExerciseCount,
    isSettingsVisible,
    setIsSettingsVisible,
    pulseAnim,
    difficultyLabel,
    handleStartGame,
  } = useHomeScreen();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom + 32 },
      ]}>
      <HomeHeader
        totalPoints={totalPoints}
        onOpenProgress={() => navigation.navigate('Progress')}
        onOpenSettings={() => setIsSettingsVisible(true)}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.greeting}>¡Hora de jugar! 👋</Text>
          <Text style={styles.title}>Elige tu actividad</Text>
          <Text style={styles.subtitle}>
            Selecciona el tipo de práctica matemática de hoy
          </Text>
        </View>

        <View style={styles.categoriesList}>
          {CATEGORIES.map(cat => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isSelected={selectedCategory === cat.id}
              onSelect={() => setSelectedCategory(cat.id)}
            />
          ))}
        </View>

        <QuickSettingsBar
          difficultyLabel={difficultyLabel}
          exerciseCount={exerciseCount}
          onPressSettings={() => setIsSettingsVisible(true)}
        />

        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <ButtonBig
            title="🎮 ¡EMPEZAR AHORA!"
            onPress={() => handleStartGame(() => navigation.navigate('Game'))}
            backgroundColor={COLORS.success}
          />
        </Animated.View>
      </ScrollView>

      <SettingsModal
        visible={isSettingsVisible}
        difficulty={difficulty}
        exerciseCount={exerciseCount}
        onDifficultyChange={setDifficulty}
        onExerciseCountChange={setExerciseCount}
        onClose={() => setIsSettingsVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 35,
  },
  titleSection: {
    marginBottom: 18,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  categoriesList: {
    gap: 12,
    marginBottom: 20,
  },
});
