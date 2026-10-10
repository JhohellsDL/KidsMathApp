import { Platform } from 'react-native';
import mobileAds, {
  MaxAdContentRating,
  TestIds,
} from 'react-native-google-mobile-ads';

/**
 * Configuración centralizada de IDs de anuncios para AdMob
 * 
 * En modo desarrollo (__DEV__) usa siempre los TestIds oficiales de Google
 * para evitar penalizaciones por tráfico inválido.
 * En producción (Release) utiliza los Ad Unit IDs reales de tu cuenta de AdMob.
 */
export const AdConfig = {
  android: {
    banner: __DEV__
      ? TestIds.BANNER
      : 'ca-app-pub-8897050281816485/4186754997',
    rewarded: __DEV__
      ? TestIds.REWARDED
      : 'ca-app-pub-8897050281816485/2768324988',
  },
  ios: {
    banner: __DEV__
      ? TestIds.BANNER
      : 'ca-app-pub-8897050281816485/BANNER_ID',
    rewarded: __DEV__
      ? TestIds.REWARDED
      : 'ca-app-pub-8897050281816485/REWARDED_ID',
  },
};

/**
 * Inicialización centralizada de AdMob SDK con cumplimiento COPPA
 */
export const initializeAds = async (): Promise<void> => {
  try {
    await mobileAds().setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.G,
      tagForChildDirectedTreatment: true,
      tagForUnderAgeOfConsent: true,
    });

    await mobileAds().initialize();
  } catch (error) {
    if (__DEV__) {
      console.warn('Error inicializando AdMob SDK:', error);
    }
  }
};

/**
 * Obtener ID de banner según la plataforma
 */
export const getBannerId = (): string => {
  return Platform.OS === 'android'
    ? AdConfig.android.banner
    : AdConfig.ios.banner;
};

/**
 * Obtener ID de anuncio bonificado según la plataforma
 */
export const getRewardedId = (): string => {
  return Platform.OS === 'android'
    ? AdConfig.android.rewarded
    : AdConfig.ios.rewarded;
};

/**
 * Opciones de solicitud para apps dirigidas a niños
 * IMPORTANTE: Cumple con COPPA (Children's Online Privacy Protection Act)
 */
export const childSafeAdOptions = {
  // No personalizar anuncios (requerido para apps de niños)
  requestNonPersonalizedAdsOnly: true,
  // Keywords relacionadas con educación
  keywords: ['education', 'kids', 'math', 'learning', 'children'],
};


