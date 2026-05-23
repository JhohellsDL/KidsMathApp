import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Animated, BackHandler, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {ButtonBig, AdBanner} from '../../ui/components';
import {useGameStore} from '../../state/gameStore';
import {useRewardedAd} from '../../utils/useRewardedAd';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export const ResultScreen: React.FC<Props> = ({navigation}) => {
  const {exercises, correctAnswers, totalPoints, doublePoints} = useGameStore();
  const {showRewardedAd, loaded: isRewardedLoaded} = useRewardedAd();
  const [hasDoubled, setHasDoubled] = React.useState(false);

  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Deshabilitar el botón "atrás" del dispositivo
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Ir a Home en lugar de volver al Game 
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
        return true; // Prevenir el comportamiento por defecto
      },
    );

    return () => backHandler.remove();
  }, [scaleAnim, fadeAnim, navigation]);

  const percentage = Math.round((correctAnswers / exercises.length) * 100);

  const getMessage = () => {
    if (percentage === 100) return '¡Perfecto! 🏆';
    if (percentage >= 80) return '¡Excelente! 🌟';
    if (percentage >= 60) return '¡Muy bien! 👏';
    return '¡Buen intento! 💪';
  };

  const handlePlayAgain = () => {
    // Resetear el stack de navegación para evitar que el botón "atrás" 
    // lleve de vuelta a Result
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  const handleDoublePoints = () => {
    showRewardedAd(() => {
      doublePoints();
      setHasDoubled(true);
    });
  };

  return (
    <View style={styles.container}>
      {/* Fondo decorativo */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
      <View style={styles.decorativeCircle3} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}>
        <Animated.View
          style={[
            styles.content,
            {
              transform: [{scale: scaleAnim}],
              opacity: fadeAnim,
            },
          ]}>
          {/* Emoji grande y título */}
          <View style={styles.headerContainer}>
            <Text style={styles.emoji}>
              {percentage === 100 ? '🏆' : percentage >= 80 ? '🎉' : percentage >= 60 ? '🌟' : '💪'}
            </Text>
            <Text style={styles.title}>{getMessage()}</Text>
          </View>

          {/* Tarjetas de estadísticas mejoradas */}
          <View style={styles.statsContainer}>
            <View style={[styles.statBox, styles.statBoxCorrect]}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>✅</Text>
              </View>
              <Text style={styles.statValue}>{correctAnswers}</Text>
              <Text style={styles.statLabel}>Correctas</Text>
            </View>

            <View style={[styles.statBox, styles.statBoxTotal]}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>📝</Text>
              </View>
              <Text style={styles.statValue}>{exercises.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>

            <View style={[styles.statBox, styles.statBoxPercent]}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>🎯</Text>
              </View>
              <Text style={styles.statValue}>{percentage}%</Text>
              <Text style={styles.statLabel}>Precisión</Text>
            </View>
          </View>

          {/* Contenedor de puntos mejorado */}
          <View style={styles.pointsContainer}>
            <View style={styles.pointsRow}>
              <Text style={styles.pointsIcon}>⭐</Text>
              <View style={styles.pointsTextContainer}>
                <Text style={styles.pointsLabel}>Puntos ganados:</Text>
                <Text style={styles.pointsValue}>{correctAnswers * 10}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.pointsRow}>
              <Text style={styles.pointsIcon}>🏅</Text>
              <View style={styles.pointsTextContainer}>
                <Text style={styles.pointsLabel}>Total acumulado:</Text>
                <Text style={styles.totalPointsValue}>{totalPoints}</Text>
              </View>
            </View>
          </View>

          {/* Mensaje motivacional mejorado */}
          <View style={styles.motivationalBox}>
            <Text style={styles.motivationalText}>
              {percentage === 100
                ? '¡Eres un genio de las matemáticas!'
                : percentage >= 80
                ? '¡Sigue así, lo estás haciendo genial!'
                : percentage >= 60
                ? '¡Cada día mejoras más!'
                : '¡La práctica te hará mejor!'}
            </Text>
          </View>
        </Animated.View>

        {/* Botón de Video Opcional para Duplicar Puntos */}
        {!hasDoubled && isRewardedLoaded && (
          <View style={styles.rewardButtonContainer}>
            <Text style={styles.optionalAdText}>Opcional:</Text>
            <ButtonBig
              title="Ver video para duplicar puntos"
              onPress={handleDoublePoints}
              backgroundColor="#7B1FA2"
            />
          </View>
        )}

        {/* Banner de anuncios */}
        <AdBanner />

        <View style={styles.buttonContainer}>
          <ButtonBig
            title="🎮 Jugar de nuevo"
            onPress={handlePlayAgain}
            backgroundColor="#FF9800"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  // Círculos decorativos de fondo
  decorativeCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#BBDEFB',
    opacity: 0.3,
    top: -50,
    right: -50,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#90CAF9',
    opacity: 0.3,
    bottom: 100,
    left: -30,
  },
  decorativeCircle3: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#64B5F6',
    opacity: 0.3,
    top: '40%',
    right: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  content: {
    alignItems: 'center',
    zIndex: 1,
  },
  // Header con emoji y título
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  emoji: {
    fontSize: 120,
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1976D2',
    textAlign: 'center',
    textShadowColor: 'rgba(25, 118, 210, 0.1)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  // Tarjetas de estadísticas mejoradas
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  statBox: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    width: '30%',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderWidth: 3,
  },
  statBoxCorrect: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  statBoxTotal: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
  statBoxPercent: {
    borderColor: '#FF9800',
    backgroundColor: '#FFF3E0',
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 32,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontWeight: '600',
  },
  // Contenedor de puntos mejorado
  pointsContainer: {
    backgroundColor: '#FFF9C4',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 20,
    width: '100%',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#F57C00',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 3,
    borderColor: '#FFA726',
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  pointsIcon: {
    fontSize: 36,
    marginRight: 15,
  },
  pointsTextContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  pointsLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E65100',
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F57C00',
  },
  divider: {
    height: 2,
    backgroundColor: '#FFE082',
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
  },
  totalPointsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6F00',
  },
  // Mensaje motivacional mejorado
  motivationalBox: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    width: '100%',
    marginTop: 10,
    elevation: 4,
    shadowColor: '#1976D2',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderLeftWidth: 5,
    borderLeftColor: '#2196F3',
  },
  motivationalText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  rewardButtonContainer: {
    alignItems: 'center',
    marginVertical: 15,
    marginBottom: 20,
  },
  optionalAdText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

