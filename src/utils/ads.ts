import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';
import {
  ANDROID_BANNER_ID,
  ANDROID_REWARDED_ID,
  IOS_BANNER_ID,
  IOS_REWARDED_ID,
} from '@env';

/**
 * Configuración de IDs de anuncios para AdMob
 * 
 * IMPORTANTE: Actualmente usa IDs de PRUEBA de Google
 * Cuando tengas tu cuenta de AdMob, reemplaza con tus IDs reales
 * 
 * NOTA: Intersticiales eliminados para cumplir con políticas de Google Play Familias
 * Solo se permiten banners y anuncios recompensados en apps para niños
 */
export const AdConfig = {
  // IDs de Android
  android: {
    // ID de prueba de Google - Reemplazar con tu ID real
    banner: __DEV__
      ? TestIds.BANNER
      : ANDROID_BANNER_ID,
    rewarded: __DEV__
      ? TestIds.REWARDED
      : ANDROID_REWARDED_ID,
  },
  // IDs de iOS
  ios: {
    banner: __DEV__
      ? TestIds.BANNER
      : IOS_BANNER_ID,
    rewarded: __DEV__
      ? TestIds.REWARDED
      : IOS_REWARDED_ID,
  },
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

