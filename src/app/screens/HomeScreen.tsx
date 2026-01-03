import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Modal, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {ButtonBig, Avatar} from '../../ui/components';
import {useGameStore} from '../../state/gameStore';
import {GenerateExercisesUseCase} from '../../domain/usecases/generateExercises';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {totalPoints, resetGame} = useGameStore();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Estados de configuración
  const [isSettingsVisible, setIsSettingsVisible] = React.useState(false);
  const [difficulty, setDifficulty] = React.useState<'easy' | 'medium' | 'hard'>('easy');
  const [exerciseCount, setExerciseCount] = React.useState<number>(10);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulseAnim]);

  const handleStartGame = () => {
    resetGame();
    
    // Configurar rango basado en dificultad
    let min = 1;
    let max = 10;
    
    switch (difficulty) {
      case 'medium':
        max = 20;
        break;
      case 'hard':
        max = 50;
        break;
      case 'easy':
      default:
        // Mantener defaults (1-10)
        break;
    }

    const exercises = new GenerateExercisesUseCase().execute(exerciseCount, min, max);
    useGameStore.getState().startGame(exercises);
    setIsSettingsVisible(false);
    navigation.navigate('Game');
  };

  const getDifficultyLabel = (diff: string) => {
    switch (diff) {
      case 'easy': return 'Fácil (1-10)';
      case 'medium': return 'Medio (1-20)';
      case 'hard': return 'Difícil (1-50)';
      default: return '';
    }
  };

  const getDifficultyText = (diff: string) => {
    switch(diff) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Medio';
      case 'hard': return 'Difícil';
      default: return 'Fácil';
    }
  };

  return (
    <View style={styles.container}>
      {/* Decoraciones matemáticas flotantes */}
      <View style={styles.decorationsContainer}>
        <Text style={[styles.mathSymbol, styles.symbol1]}>+</Text>
        <Text style={[styles.mathSymbol, styles.symbol2]}>×</Text>
        <Text style={[styles.mathSymbol, styles.symbol3]}>÷</Text>
        <Text style={[styles.mathSymbol, styles.symbol4]}>=</Text>
        <Text style={[styles.mathSymbol, styles.symbol5]}>−</Text>
      </View>

      {/* Header con avatar */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Avatar size={70} />
          </View>
          <View style={styles.pointsBadge}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.pointsValue}>{totalPoints}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => setIsSettingsVisible(true)}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido central */}
      <View style={styles.content}>
        {/* Tarjeta de bienvenida mejorada */}
        <View style={styles.welcomeCard}>
          <Text style={styles.waveEmoji}>👋</Text>
          <Text style={styles.welcomeTitle}>¡Hola!</Text>
          <Text style={styles.welcomeSubtitle}>
            ¿Listo para practicar sumas?
          </Text>
        </View>

        {/* Círculo decorativo con iconos matemáticos */}
        <View style={styles.decorativeCircle}>
          <Text style={styles.bigNumber}>123</Text>
          <View style={styles.miniIconsContainer}>
            <Text style={styles.miniIcon}>+</Text>
            <Text style={styles.miniIcon}>−</Text>
            <Text style={styles.miniIcon}>=</Text>
          </View>
        </View>

        {/* Estadística rápida */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🎯</Text>
            <Text style={styles.statLabel}>Practicar</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🏆</Text>
            <Text style={styles.statLabel}>Ganar</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🌟</Text>
            <Text style={styles.statLabel}>Aprender</Text>
          </View>
        </View>
      </View>

      {/* Botón principal */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {transform: [{scale: pulseAnim}]},
        ]}>
        <ButtonBig
          title="🎮 ¡EMPEZAR!"
          onPress={handleStartGame}
          backgroundColor="#4CAF50"
        />
      </Animated.View>

      {/* Modal de Configuración */}
      <Modal
        visible={isSettingsVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsSettingsVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Configuración ⚙️</Text>
            
            {/* Selector de Dificultad */}
            <View style={styles.settingSection}>
              <Text style={styles.settingLabel}>Dificultad:</Text>
              <View style={styles.optionsRow}>
                {(['easy', 'medium', 'hard'] as const).map((diff) => (
                  <TouchableOpacity
                    key={diff}
                    style={[
                      styles.optionButton,
                      difficulty === diff && styles.optionButtonSelected
                    ]}
                    onPress={() => setDifficulty(diff)}>
                    <Text style={[
                      styles.optionText,
                      difficulty === diff && styles.optionTextSelected
                    ]}>
                      {getDifficultyText(diff)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.helperText}>{getDifficultyLabel(difficulty)}</Text>
            </View>

            {/* Selector de Cantidad */}
            <View style={styles.settingSection}>
              <Text style={styles.settingLabel}>Ejercicios:</Text>
              <View style={styles.optionsRow}>
                {[5, 10, 20].map((count) => (
                  <TouchableOpacity
                    key={count}
                    style={[
                      styles.optionButton,
                      exerciseCount === count && styles.optionButtonSelected
                    ]}
                    onPress={() => setExerciseCount(count)}>
                    <Text style={[
                      styles.optionText,
                      exerciseCount === count && styles.optionTextSelected
                    ]}>
                      {count}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsSettingsVisible(false)}>
              <Text style={styles.closeButtonText}>Listo 👍</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    position: 'relative',
  },
  // Decoraciones matemáticas flotantes
  decorationsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  mathSymbol: {
    position: 'absolute',
    fontSize: 40,
    fontWeight: 'bold',
    opacity: 0.1,
    color: '#1976D2',
  },
  symbol1: {
    top: 80,
    left: 30,
  },
  symbol2: {
    top: 150,
    right: 40,
  },
  symbol3: {
    bottom: 200,
    left: 50,
  },
  symbol4: {
    bottom: 300,
    right: 30,
  },
  symbol5: {
    top: 250,
    left: 20,
  },
  // Header
  header: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    padding: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976D2',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    marginLeft: -10,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  starIcon: {
    fontSize: 20,
    marginRight: 5,
  },
  pointsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  // Contenido
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    elevation: 8,
    shadowColor: '#1976D2',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 3,
    borderColor: '#BBDEFB',
  },
  waveEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 20,
    color: '#546E7A',
    textAlign: 'center',
    fontWeight: '600',
  },
  decorativeCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#FF9800',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 5,
    borderColor: '#FFFFFF',
  },
  bigNumber: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  miniIconsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  miniIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
    marginHorizontal: 5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    minWidth: 90,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#546E7A',
    fontWeight: '600',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    zIndex: 1,
  },
  settingsButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  settingsIcon: {
    fontSize: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 25,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 25,
  },
  settingSection: {
    width: '100%',
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    marginLeft: 5,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  optionText: {
    fontSize: 16,
    color: '#757575',
    fontWeight: '600',
  },
  optionTextSelected: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    marginLeft: 5,
    fontStyle: 'italic',
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
    elevation: 3,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
