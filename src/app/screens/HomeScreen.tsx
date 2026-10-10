import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  ButtonBig,
  Avatar,
  CategoryCard,
  SettingsModal,
} from '../../ui/components';
import { useGameStore } from '../../state/gameStore';
import { GenerateExercisesUseCase } from '../../domain/usecases/generateExercises';
import { ExerciseCategory } from '../../domain/models/Exercise';
import { COLORS } from '../../ui/theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const CATEGORIES = [
  {
    id: 'suma' as ExerciseCategory,
    title: 'Sumas',
    subtitle: 'Aprende a sumar números',
    badge: '1 + 2 = 3',
    icon: '➕',
    color: '#0284C7',
  },
  {
    id: 'resta' as ExerciseCategory,
    title: 'Restas',
    subtitle: 'Practica restas sin negativos',
    badge: '5 − 2 = 3',
    icon: '➖',
    color: '#E11D48',
  },
  {
    id: 'comparacion' as ExerciseCategory,
    title: 'Mayor, menor o igual',
    subtitle: 'Compara números con >, < o =',
    badge: '7 > 4',
    icon: '⚖️',
    color: '#7C3AED',
  },
  {
    id: 'anterior_posterior' as ExerciseCategory,
    title: 'Anterior y posterior',
    subtitle: 'Encuentra el número antes o después',
    badge: '__ , 7 , __',
    icon: '↔️',
    color: '#059669',
  },
  {
    id: 'suma_incompleta' as ExerciseCategory,
    title: 'Sumas incompletas',
    subtitle: 'Encuentra el sumando que falta',
    badge: '3 + __ = 8',
    icon: '🧩',
    color: '#D97706',
  },
  {
    id: 'resta_incompleta' as ExerciseCategory,
    title: 'Restas incompletas',
    subtitle: 'Completa el número que falta',
    badge: '9 − __ = 4',
    icon: '🔍',
    color: '#4F46E5',
  },
];

export const HomeScreen = ({ navigation }: Props) => {
  const totalPoints = useGameStore(state => state.totalPoints);
  const resetGame = useGameStore(state => state.resetGame);
  const startGame = useGameStore(state => state.startGame);
  const insets = useSafeAreaInsets();

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory>('suma');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [exerciseCount, setExerciseCount] = useState<number>(10);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.03,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulseAnim]);

  const handleStartGame = () => {
    resetGame();

    const max = difficulty === 'hard' ? 50 : difficulty === 'medium' ? 20 : 10;
    const generator = new GenerateExercisesUseCase();
    const exercises = generator.execute(exerciseCount, 1, max, selectedCategory);

    startGame(exercises, selectedCategory);
    navigation.navigate('Game');
  };

  const getDifficultyName = () => {
    return difficulty === 'easy' ? 'Fácil (1-10)' : difficulty === 'medium' ? 'Medio (1-20)' : 'Avanzado (1-50)';
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 32 }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarRow}>
          <View style={styles.avatarCircle}>
            <Avatar size={48} />
          </View>
          <View style={styles.pointsBadge}>
            <Text style={styles.starEmoji}>⭐</Text>
            <Text style={styles.pointsText}>{totalPoints}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => setIsSettingsVisible(true)}
          activeOpacity={0.7}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.greeting}>¡Hora de jugar! 👋</Text>
          <Text style={styles.title}>Elige tu actividad</Text>
          <Text style={styles.subtitle}>Selecciona el tipo de práctica matemática de hoy</Text>
        </View>

        {/* Tarjetas de categorías */}
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

        {/* Barra de ajustes rápidos */}
        <View style={styles.quickBar}>
          <TouchableOpacity
            style={styles.quickItem}
            onPress={() => setIsSettingsVisible(true)}>
            <Text style={styles.quickLabel}>Dificultad:</Text>
            <Text style={styles.quickValue}>{getDifficultyName()}</Text>
          </TouchableOpacity>
          <View style={styles.quickDivider} />
          <TouchableOpacity
            style={styles.quickItem}
            onPress={() => setIsSettingsVisible(true)}>
            <Text style={styles.quickLabel}>Ejercicios:</Text>
            <Text style={styles.quickValue}>{exerciseCount}</Text>
          </TouchableOpacity>
        </View>

        {/* Botón principal */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <ButtonBig
            title="🎮 ¡EMPEZAR AHORA!"
            onPress={handleStartGame}
            backgroundColor={COLORS.success}
          />
        </Animated.View>
      </ScrollView>

      {/* Modal de Configuración */}
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
  header: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarCircle: {
    backgroundColor: COLORS.card,
    borderRadius: 25,
    padding: 2,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.warningLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.warningBorder,
  },
  starEmoji: {
    fontSize: 15,
    marginRight: 4,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.warning,
  },
  settingsButton: {
    backgroundColor: '#F1F5F9',
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 20,
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
  quickBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  quickItem: {
    flex: 1,
    alignItems: 'center',
  },
  quickDivider: {
    width: 1,
    height: 28,
    backgroundColor: COLORS.border,
  },
  quickLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
    marginBottom: 2,
  },
  quickValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
});
