import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {ButtonBig, Avatar} from '../../ui/components';
import {useGameStore} from '../../state/gameStore';
import {GenerateExercisesUseCase} from '../../domain/usecases/generateExercises';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {totalPoints, resetGame} = useGameStore();
  const pulseAnim = useRef(new Animated.Value(1)).current;

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
    const exercises = new GenerateExercisesUseCase().execute(10, 1, 10);
    useGameStore.getState().startGame(exercises);
    navigation.navigate('Game');
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
    alignItems: 'flex-start',
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
});
