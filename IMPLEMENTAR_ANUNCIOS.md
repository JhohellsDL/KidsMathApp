# 🎯 Guía para Implementar Anuncios en KidsMathApp

## ⚠️ IMPORTANTE: Consideraciones para Apps Infantiles

Tu app está dirigida a **niños**, por lo que debes:

### 1. Cumplir con COPPA (Children's Online Privacy Protection Act)
- ✅ No recopilar datos personales de menores de 13 años
- ✅ Marcar tu app como "dirigida a niños" en AdMob
- ✅ Usar solo anuncios aptos para menores
- ✅ Deshabilitar anuncios personalizados

### 2. Políticas de Google Play para Familias
- ✅ Contenido apropiado para niños
- ✅ Sin anuncios engañosos
- ✅ Sin enlaces a redes sociales
- ✅ Sin compras dentro de la app sin aprobación parental
- ⚠️ **NO se permiten anuncios intersticiales que interfieran con la navegación**
- ✅ Solo banners y anuncios recompensados (voluntarios)

---

## 📋 Paso 1: Crear Cuenta en AdMob

1. Ve a https://admob.google.com/
2. Crea una cuenta (usa tu cuenta de Google)
3. Registra tu aplicación **KidsMathApp**
4. **IMPORTANTE**: Marca como "App dirigida a niños"

### Obtener IDs:

Después de registrar, tendrás:
```
App ID (Android): ca-app-pub-XXXXXXXXXX~XXXXXXXXXX
App ID (iOS):     ca-app-pub-XXXXXXXXXX~XXXXXXXXXX

Banner Unit ID:    ca-app-pub-XXXXXXXXXX/XXXXXXXXXX
Rewarded Unit ID:  ca-app-pub-XXXXXXXXXX/XXXXXXXXXX
```

**Guarda estos IDs, los necesitarás más adelante.**

⚠️ **NOTA IMPORTANTE**: Esta app NO usa anuncios intersticiales porque Google Play los rechaza en apps de la categoría Familias cuando interfieren con la navegación.

---

## 📦 Paso 2: Instalación

### 1. Instalar el paquete

```bash
npm install react-native-google-mobile-ads
```

### 2. Configurar iOS (si usas iOS)

```bash
cd ios && pod install && cd ..
```

### 3. Configurar Android

Edita `android/app/src/main/AndroidManifest.xml`:

```xml
<manifest>
    <application>
        <!-- Agrega esto DENTRO de <application> -->
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="ca-app-pub-XXXXXXXXXX~XXXXXXXXXX"/>
        
        <!-- IMPORTANTE: Para apps de niños -->
        <meta-data
            android:name="com.google.android.gms.ads.flag.TAG_FOR_CHILD_DIRECTED_TREATMENT"
            android:value="true"/>
    </application>
</manifest>
```

### 4. Configurar iOS

Edita `ios/KidsMathApp/Info.plist`:

```xml
<dict>
    <!-- Agrega esto -->
    <key>GADApplicationIdentifier</key>
    <string>ca-app-pub-XXXXXXXXXX~XXXXXXXXXX</string>
    
    <!-- SKAdNetwork IDs (para iOS 14+) -->
    <key>SKAdNetworkItems</key>
    <array>
        <dict>
            <key>SKAdNetworkIdentifier</key>
            <string>cstr6suwn9.skadnetwork</string>
        </dict>
    </array>
</dict>
```

---

## 🎯 Paso 3: Estrategia de Anuncios para KidsMathApp (IMPLEMENTADA ✅)

### ✅ Banner en Pantalla de Resultados (YA IMPLEMENTADO)

**Dónde:** `ResultScreen.tsx`  
**Por qué:** No interrumpe el juego, el niño ya terminó  
**Estado:** ✅ Implementado y cumple con políticas de Google Play

```typescript
// ResultScreen.tsx
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const BANNER_AD_UNIT_ID = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-XXXXXXXXXX/XXXXXXXXXX';

// En el componente, agregar al final:
<View style={styles.adContainer}>
  <BannerAd
    unitId={BANNER_AD_UNIT_ID}
    size={BannerAdSize.FULL_BANNER}
    requestOptions={{
      requestNonPersonalizedAdsOnly: true, // IMPORTANTE para niños
    }}
  />
</View>
```

### ✅ Anuncio Recompensado para Duplicar Puntos (YA IMPLEMENTADO)

**Dónde:** `ResultScreen.tsx`  
**Por qué:** Es voluntario, el usuario decide verlo  
**Estado:** ✅ Implementado y cumple con políticas de Google Play  
**Beneficio:** El niño puede duplicar sus puntos viendo un anuncio

⚠️ **NOTA**: Los anuncios intersticiales fueron ELIMINADOS porque Google Play los rechaza en apps de la categoría Familias cuando interfieren con la navegación del usuario.

---

## 📊 Estrategia IMPLEMENTADA en KidsMathApp ✅

### ✅ Implementación Actual (Cumple con Google Play Familias):

1. **Banner en ResultScreen** ✅
   - Aparece cuando el niño termina
   - No interrumpe el juego
   - Menos invasivo
   - **CUMPLE con políticas de Google Play**

2. **Anuncio Recompensado** ✅
   - Voluntario (el usuario decide)
   - Duplica los puntos ganados
   - **CUMPLE con políticas de Google Play**

### ❌ NO Implementado (Por políticas de Google Play):

- ❌ **Anuncios intersticiales** - RECHAZADOS por Google Play porque interfieren con la navegación
- ❌ Anuncios durante el juego (distrae)
- ❌ Anuncios en Home (primera impresión negativa)
- ❌ Anuncios personalizados (prohibido para niños)

---

## 🔧 Paso 4: Implementación Completa

### Archivo de Configuración de Anuncios

Crea `src/utils/ads.ts`:

```typescript
import {Platform} from 'react-native';
import {TestIds} from 'react-native-google-mobile-ads';

// Configuración de IDs de anuncios
export const AdConfig = {
  // IDs de Android
  android: {
    banner: __DEV__
      ? TestIds.BANNER
      : 'ca-app-pub-XXXXXXXXXX/XXXXXXXXXX',
    interstitial: __DEV__
      ? TestIds.INTERSTITIAL
      : 'ca-app-pub-XXXXXXXXXX/XXXXXXXXXX',
  },
  // IDs de iOS
  ios: {
    banner: __DEV__
      ? TestIds.BANNER
      : 'ca-app-pub-XXXXXXXXXX/XXXXXXXXXX',
    interstitial: __DEV__
      ? TestIds.INTERSTITIAL
      : 'ca-app-pub-XXXXXXXXXX/XXXXXXXXXX',
  },
};

// Obtener ID según plataforma
export const getBannerId = () =>
  Platform.OS === 'android' ? AdConfig.android.banner : AdConfig.ios.banner;

export const getInterstitialId = () =>
  Platform.OS === 'android'
    ? AdConfig.android.interstitial
    : AdConfig.ios.interstitial;

// Opciones de solicitud para apps de niños
export const childSafeAdOptions = {
  requestNonPersonalizedAdsOnly: true, // COPPA compliant
  keywords: ['education', 'kids', 'math', 'learning'],
};
```

### Componente de Banner Reutilizable

Crea `src/ui/components/AdBanner.tsx`:

```typescript
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {getBannerId, childSafeAdOptions} from '../../utils/ads';

export const AdBanner: React.FC = () => {
  return (
    <View style={styles.container}>
      <BannerAd
        unitId={getBannerId()}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={childSafeAdOptions}
        onAdFailedToLoad={error => {
          console.log('Ad failed to load:', error);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10,
  },
});
```

### Hook para Intersticiales

Crea `src/utils/useInterstitialAd.ts`:

```typescript
import {useEffect, useState} from 'react';
import {InterstitialAd, AdEventType} from 'react-native-google-mobile-ads';
import {getInterstitialId, childSafeAdOptions} from './ads';

export const useInterstitialAd = () => {
  const [interstitial, setInterstitial] = useState<InterstitialAd | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const ad = InterstitialAd.createForAdRequest(
      getInterstitialId(),
      childSafeAdOptions,
    );

    const unsubscribeLoaded = ad.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    const unsubscribeClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
      setLoaded(false);
      ad.load(); // Cargar el siguiente
    });

    ad.load();
    setInterstitial(ad);

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, []);

  const showAd = () => {
    if (loaded && interstitial) {
      interstitial.show();
    }
  };

  return {showAd, loaded};
};
```

### Actualizar ResultScreen con Banner

```typescript
// ResultScreen.tsx
import {AdBanner} from '../../ui/components/AdBanner';

// Agregar al final del componente, antes del botón
<AdBanner />

<View style={styles.buttonContainer}>
  <ButtonBig
    title="🎮 Jugar de nuevo"
    onPress={handlePlayAgain}
    backgroundColor="#FF9800"
  />
</View>
```

### Agregar Intersticial en HomeScreen (cada 3 juegos)

```typescript
// HomeScreen.tsx
import {useInterstitialAd} from '../../utils/useInterstitialAd';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {showAd, loaded} = useInterstitialAd();
  
  const handleStartGame = async () => {
    resetGame();
    
    // Contar juegos
    const gamesPlayed = await AsyncStorage.getItem('@gamesPlayed');
    const count = gamesPlayed ? parseInt(gamesPlayed, 10) : 0;
    await AsyncStorage.setItem('@gamesPlayed', (count + 1).toString());
    
    // Mostrar anuncio cada 3 juegos
    if (count > 0 && count % 3 === 0 && loaded) {
      showAd();
    }
    
    // Generar ejercicios y empezar
    const generateExercisesUseCase = new GenerateExercisesUseCase();
    const exercises = generateExercisesUseCase.execute(20, 10, 20);
    useGameStore.getState().startGame(exercises);
    navigation.navigate('Game');
  };
};
```

---

## 🧪 Paso 5: Testing

### IDs de Prueba (Development)

React Native Google Mobile Ads incluye IDs de prueba:
- Banner: `TestIds.BANNER`
- Intersticial: `TestIds.INTERSTITIAL`

**NUNCA uses tus IDs reales en desarrollo** o podrías ser baneado.

### Verificar:
1. ✅ En desarrollo, ves anuncios de prueba
2. ✅ Los anuncios tienen etiqueta "Test Ad"
3. ✅ Los anuncios cargan correctamente
4. ✅ No hay errores en consola

---

## 💰 Paso 6: Monetización y Expectativas

### Ingresos Esperados (Apps Educativas para Niños):

| Métrica | Valor Típico |
|---------|--------------|
| CPM (Banner) | $0.50 - $2.00 |
| CPM (Intersticial) | $2.00 - $5.00 |
| Click-through rate | 0.5% - 2% |

**Ejemplo:**
- 1,000 usuarios activos/mes
- Cada usuario ve 10 banners/mes
- CPM de $1.00

**Ingreso mensual:** ~$10 USD

### Aumentar Ingresos:
1. ✅ Más usuarios (marketing, ASO)
2. ✅ Más engagement (mejores features)
3. ✅ Balance anuncios/experiencia

---

## ⚖️ Paso 7: Balance Anuncios vs Experiencia

### Reglas de Oro:

1. **No arruines la experiencia educativa**
   - Los niños vienen a aprender, no a ver anuncios
   
2. **Menos es más**
   - Pocos anuncios bien ubicados > Muchos anuncios molestos
   
3. **Considera versión sin anuncios**
   - Ofrecer compra única para quitar anuncios ($2.99)
   - Padres felices = buenas reseñas

4. **Monitorea métricas**
   - Tasa de retención
   - Tiempo de sesión
   - Reseñas en stores

---

## 🚀 Siguiente Paso

Una vez que tengas tus IDs de AdMob:

1. Instala el paquete: `npm install react-native-google-mobile-ads`
2. Configura los IDs en la app
3. Prueba con IDs de test
4. Implementa banners primero (menos invasivo)
5. Luego considera intersticiales

---

## 📝 Checklist Final

Antes de publicar:

- [ ] App marcada como "para niños" en AdMob
- [ ] `requestNonPersonalizedAdsOnly: true` configurado
- [ ] IDs de test reemplazados por IDs reales
- [ ] Anuncios probados en dispositivos reales
- [ ] Política de privacidad actualizada
- [ ] Cumple con políticas de Google Play Families
- [ ] Balance anuncios/UX testeado

---

## ⚠️ ADVERTENCIA LEGAL

Consulta con un abogado sobre:
- COPPA compliance (EE.UU.)
- GDPR (Europa)
- Regulaciones locales de tu país

Esta guía es educativa, no constituye asesoría legal.

---

**¿Listo para implementar?** Empieza por crear tu cuenta en AdMob y obtener tus IDs.

