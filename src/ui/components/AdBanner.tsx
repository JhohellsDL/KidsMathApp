import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {getBannerId, childSafeAdOptions} from '../../utils/ads';

/**
 * Componente de Banner de Anuncios
 * 
 * Muestra un banner de AdMob compatible con apps para niños
 * - Cumple con COPPA (no personalizado)
 * - Usa IDs de prueba en desarrollo
 * - Tamaño BANNER estándar (320x50) perfecto para móviles
 * - Fácil de reutilizar en cualquier pantalla
 */
export const AdBanner: React.FC = () => {
  return (
    <View style={styles.container}>
      <BannerAd
        unitId={getBannerId()}
        size={BannerAdSize.BANNER}
        requestOptions={childSafeAdOptions}
        onAdLoaded={() => {
          console.log('✅ Banner ad loaded successfully');
        }}
        onAdFailedToLoad={error => {
          console.log('❌ Banner ad failed to load:', error);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    marginVertical: 15,
  },
});

