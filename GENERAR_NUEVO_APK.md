# 🚀 Guía para Generar Nuevo APK/AAB (Sin Intersticiales)

## ⚠️ IMPORTANTE
Google Play está rechazando el **APK/AAB actual** porque contiene el código viejo con intersticiales.
Necesitas generar y subir una **nueva versión** con los cambios que acabamos de hacer.

## 📝 Pasos para Generar Nuevo APK/AAB

### Opción 1: Generar AAB (Recomendado para Google Play) ⭐

#### 1. Limpiar builds anteriores
```bash
cd /Users/jhohellserickdianderaslopez/Documents/JDL/Proyectos/KidsMathApp
cd android
./gradlew clean
```

#### 2. Generar el nuevo AAB
```bash
./gradlew bundleRelease
```

#### 3. Ubicación del archivo
```
android/app/build/outputs/bundle/release/app-release.aab
```

---

### Opción 2: Generar APK (Alternativa)

#### 1. Limpiar builds anteriores
```bash
cd /Users/jhohellserickdianderaslopez/Documents/JDL/Proyectos/KidsMathApp
cd android
./gradlew clean
```

#### 2. Generar el nuevo APK
```bash
./gradlew assembleRelease
```

#### 3. Ubicación del archivo
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## 📤 Subir a Google Play Console

### 1. Ir a Google Play Console
- Abre: https://play.google.com/console
- Selecciona tu app **KidsMathApp**

### 2. Crear Nueva Versión
- Ve a **Producción** (o **Prueba interna/cerrada** si prefieres probar primero)
- Click en **Crear nueva versión**

### 3. Subir el AAB/APK
- Arrastra el archivo `app-release.aab` (o `app-release.apk`)
- O click en **Subir** y selecciona el archivo

### 4. Incrementar Número de Versión
Si te da error de "código de versión duplicado", necesitas aumentar el número de versión:

**Edita:** `android/app/build.gradle`

```gradle
android {
    defaultConfig {
        versionCode 2  // Cambiar de 1 a 2 (o el siguiente número)
        versionName "1.1"  // Actualizar versión
    }
}
```

Luego vuelve a generar el AAB:
```bash
./gradlew clean
./gradlew bundleRelease
```

### 5. Notas de la Versión
En "¿Qué hay de nuevo en esta versión?" escribe:

```
- Eliminados anuncios intersticiales para cumplir con políticas de Google Play Familias
- Mejorada experiencia de navegación sin interrupciones
- Optimizaciones de rendimiento
- Correcciones de cumplimiento de políticas
```

### 6. Revisar y Enviar
- Revisa que todo esté correcto
- Click en **Guardar**
- Click en **Enviar para revisión**

---

## ⏱️ Tiempo de Revisión

- **Tiempo estimado:** 1-3 días hábiles
- **A veces:** Puede ser más rápido (pocas horas)
- **Notificación:** Te llegará email cuando Google termine la revisión

---

## ✅ Checklist Antes de Subir

- [ ] Código de intersticiales eliminado (YA HECHO ✅)
- [ ] Nuevo AAB/APK generado con `./gradlew bundleRelease`
- [ ] Número de versión incrementado (si es necesario)
- [ ] Archivo encontrado en `android/app/build/outputs/bundle/release/`
- [ ] Notas de la versión escritas
- [ ] Subido a Google Play Console
- [ ] Enviado para revisión

---

## 🆘 Si Encuentras Errores

### Error: "versionCode duplicado"
**Solución:** Incrementa `versionCode` en `android/app/build.gradle`

### Error: "Signature mismatch"
**Solución:** Asegúrate de usar el mismo keystore que en la primera versión

### Error de compilación
**Solución:** Ejecuta:
```bash
cd android
./gradlew clean
cd ..
rm -rf node_modules
npm install
cd android
./gradlew bundleRelease
```

---

## 📞 ¿Necesitas Ayuda?

Si encuentras algún error al generar el APK/AAB, comparte el mensaje de error completo y te ayudo a solucionarlo.


