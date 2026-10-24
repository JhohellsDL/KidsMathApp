import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { getBannerId, childSafeAdOptions, AdConfig } from '../../utils/ads';

export interface AdBannerProps {
  label?: string;
}

/**
 * Componente de Banner de Anuncios Seguro para Familias
 * 
 * Cumple estrictamente con la Google Play Families Policy (COPPA):
 * - Contenedor con borde y fondo neutro contrastante (#F8FAFC / #CBD5E1) para
 *   diferenciarse inequívocamente del contenido lúdico de la app.
 * - Etiqueta superior explícita ("PUBLICIDAD" / "ANUNCIO").
 * - Ocultamiento automático silencioso ante fallos de red.
 * - Interruptor centralizado en AdConfig.SHOW_BANNER para desactivación inmediata.
 */
export const AdBanner = ({
  label = 'PUBLICIDAD',
}: AdBannerProps) => {
  const [hasError, setHasError] = useState(false);

  // Si los banners están desactivados globalmente o falló la carga, no renderizar nada
  if (!AdConfig.SHOW_BANNER || hasError) {
    return null;
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.adFrame}>
        {/* Etiqueta explícita requerida por la Política de Familias de Google Play */}
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{label}</Text>
        </View>

        {/* Contenedor del Banner delimitado */}
        <View style={styles.bannerContainer}>
          <BannerAd
            unitId={getBannerId()}
            size={BannerAdSize.BANNER}
            requestOptions={childSafeAdOptions}
            onAdLoaded={() => {
              setHasError(false);
              if (__DEV__) {
                console.log('✅ Banner ad loaded successfully');
              }
            }}
            onAdFailedToLoad={error => {
              setHasError(true);
              if (__DEV__) {
                console.log('❌ Banner ad failed to load:', error);
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
    paddingHorizontal: 16,
  },
  adFrame: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingTop: 6,
    paddingBottom: 8,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  badgeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 6,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
    alignSelf: 'center',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  bannerContainer: {
    minWidth: 320,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

