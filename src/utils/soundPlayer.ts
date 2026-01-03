/**
 * Utilidad para reproducir sonidos en la app
 * TODO: Integrar react-native-sound en el futuro
 */

export class SoundPlayer {
  static playCorrectAnswer() {
    // TODO: Reproducir sonido de respuesta correcta
    console.log('🎵 Sonido: Respuesta correcta');
  }

  static playWrongAnswer() {
    // TODO: Reproducir sonido de respuesta incorrecta
    console.log('🎵 Sonido: Intenta de nuevo');
  }

  static playCelebration() {
    // TODO: Reproducir sonido de celebración
    console.log('🎵 Sonido: Celebración');
  }

  static playButtonPress() {
    // TODO: Reproducir sonido de botón
    console.log('🎵 Sonido: Click');
  }
}

