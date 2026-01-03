# 🧮 Kids Math App

Una aplicación móvil educativa desarrollada con React Native para ayudar a los niños a aprender matemáticas de manera divertida, visual y motivadora.

## 📱 Descripción

KidsMathApp es una aplicación móvil multiplataforma (iOS y Android) que refuerza habilidades matemáticas en niños de forma divertida, **sin penalizar errores** y fomentando el aprendizaje progresivo.

## ✨ Estado Actual: MVP COMPLETO 🎉

✅ **Versión 1.0 - MVP está 100% funcional y listo para usar**

### Características Implementadas:

- 🎮 **4 Pantallas Completas**: Splash, Home, Game, Result
- ➕ **20 Ejercicios de Sumas** (números del 1 al 10)
- 🎯 **Sistema de Opción Múltiple** con feedback inmediato
- ⭐ **Sistema de Puntos** (10 puntos por respuesta correcta)
- 📊 **Barra de Progreso** visual durante el juego
- 🎉 **Pantalla de Celebración** con estadísticas completas
- 💪 **Mensajes Motivacionales** positivos
- 🎨 **UI Colorida y Amigable** pensada para niños
- ✨ **Animaciones Suaves** en todas las transiciones
- 🏗️ **Clean Architecture** (Domain, Data, UI, App)
- 📦 **State Management** con Zustand

## 🎮 Cómo Funciona

1. **Splash Screen**: Animación de bienvenida con logo (2.5s)
2. **Home Screen**: Ver puntos acumulados y avatar del niño
3. **Game Screen**: 20 ejercicios con feedback inmediato
4. **Result Screen**: Estadísticas, celebración y opción de jugar de nuevo

## 📸 Screenshots

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   SPLASH    │→ │    HOME     │→ │    GAME     │→ │   RESULT    │
│     🧮      │  │  👶 Avatar  │  │ ¿Cuánto es  │  │     🎉      │
│  KidsMath   │  │ ⭐ Puntos   │  │   5 + 3?    │  │ ¡Excelente! │
│             │  │  🎮 Jugar   │  │ [6][8][9][7]│  │ 18/20 ✅    │
└─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘
```

## 🛠️ Tecnologías Utilizadas

- **React Native** v0.83.1 - Framework para desarrollo móvil multiplataforma
- **React** v19.2.0 - Biblioteca de JavaScript para interfaces de usuario
- **TypeScript** v5.8.3 - Superset tipado de JavaScript
- **React Navigation** v7.x - Navegación entre pantallas
- **Zustand** v5.x - State management simple y efectivo
- **Jest** - Framework de testing
- **ESLint** - Linter para mantener calidad de código

## 🏗️ Arquitectura

El proyecto sigue **Clean Architecture** con separación clara de responsabilidades:

```
src/
├── app/                 # Capa de presentación
│   ├── navigation/      # Configuración de navegación
│   ├── screens/         # Pantallas de la app
│   └── App.tsx
│
├── domain/              # Lógica de negocio
│   ├── models/          # Entidades y tipos
│   └── usecases/        # Casos de uso
│
├── data/                # Capa de datos
│   ├── exercises/       # Datos de ejercicios (JSON)
│   └── repository/      # Implementación de repositorios
│
├── ui/                  # Componentes reutilizables
│   └── components/      # ButtonBig, OptionCard, Avatar
│
├── state/               # Estado global
│   └── gameStore.ts     # Zustand store
│
└── utils/               # Utilidades
    └── soundPlayer.ts
```

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 20
- **npm** o **yarn**
- **Xcode** (para desarrollo iOS en macOS)
- **Android Studio** (para desarrollo Android)
- **CocoaPods** (para dependencias iOS)

## 🚀 Inicio Rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Instalar pods de iOS (solo macOS)

```bash
cd ios && pod install && cd ..
```

### 3. Ejecutar la app

```bash
# iOS (recomendado)
npm run ios

# Android
npm run android
```

**🎯 Ver guía detallada en:** [QUICK_START.md](./QUICK_START.md)

## 💻 Comandos de Ejecución

### Iniciar el servidor Metro

```bash
npm start
# o
npx react-native start
```

### Ejecutar en Android

```bash
npm run android
# o
npx react-native run-android
```

### Ejecutar en iOS (solo macOS)

```bash
npm run ios
# o
npx react-native run-ios
```

## 📝 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo Metro
- `npm run android` - Ejecuta la aplicación en Android
- `npm run ios` - Ejecuta la aplicación en iOS
- `npm test` - Ejecuta las pruebas con Jest
- `npm run lint` - Ejecuta el linter para verificar la calidad del código

## 🔧 Comandos Utilizados para Crear este Proyecto

### 1. Inicialización del proyecto React Native

```bash
# Crear nuevo proyecto React Native con TypeScript
npx @react-native-community/cli@latest init KidsMathApp --version 0.83.1
cd KidsMathApp
```

### 2. Instalación de dependencias adicionales

```bash
# Instalar react-native-safe-area-context
npm install react-native-safe-area-context
```

### 3. Configuración de Git y GitHub

```bash
# Crear archivo .gitignore personalizado para React Native
# (incluye node_modules, builds, archivos del sistema, etc.)

# Inicializar repositorio Git (si no estaba inicializado)
git init

# Agregar todos los archivos al staging area
git add .

# Crear commit inicial
git commit -m "Initial commit: React Native Kids Math App"

# Conectar con repositorio remoto en GitHub
git remote add origin https://github.com/JhohellsDL/KidsMathApp.git

# Verificar la configuración del remote
git remote -v

# Subir el código a GitHub
git push -u origin main
```

### 4. Autenticación con GitHub (si es necesario)

Si tienes problemas de autenticación al hacer push:

#### Opción A: Usar Personal Access Token en la URL

```bash
# Incluir el token en la URL del remote (reemplazar YOUR_TOKEN con tu token)
git remote set-url origin https://YOUR_TOKEN@github.com/JhohellsDL/KidsMathApp.git

# Hacer push
git push -u origin main

# Por seguridad, restaurar la URL original después del push
git remote set-url origin https://github.com/JhohellsDL/KidsMathApp.git
```

#### Opción B: Usar SSH

```bash
# Cambiar a SSH (si tienes configuradas las claves SSH)
git remote set-url origin git@github.com:JhohellsDL/KidsMathApp.git
git push -u origin main
```

## 📂 Estructura del Proyecto

```
KidsMathApp/
├── src/                          # Código fuente
│   ├── app/                      # Capa de aplicación
│   │   ├── navigation/           # Navegación
│   │   │   └── AppNavigator.tsx
│   │   ├── screens/              # Pantallas
│   │   │   ├── SplashScreen.tsx
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── GameScreen.tsx
│   │   │   └── ResultScreen.tsx
│   │   └── App.tsx
│   │
│   ├── domain/                   # Lógica de negocio
│   │   ├── models/               # Modelos de datos
│   │   │   └── Exercise.ts
│   │   └── usecases/             # Casos de uso
│   │       └── getExercises.ts
│   │
│   ├── data/                     # Capa de datos
│   │   ├── exercises/            # Datos de ejercicios
│   │   │   └── sums_1_10.json
│   │   └── repository/           # Repositorios
│   │       └── ExerciseRepository.ts
│   │
│   ├── ui/                       # Componentes UI
│   │   └── components/
│   │       ├── ButtonBig.tsx
│   │       ├── OptionCard.tsx
│   │       └── Avatar.tsx
│   │
│   ├── state/                    # Estado global
│   │   └── gameStore.ts
│   │
│   └── utils/                    # Utilidades
│       └── soundPlayer.ts
│
├── android/                      # Código nativo Android
├── ios/                          # Código nativo iOS
├── __tests__/                    # Tests
├── App.tsx                       # Entry point
├── package.json
├── tsconfig.json
├── PLANEAMIENTO.md              # Documento de planeación
├── MVP_READY.md                 # Estado del MVP
├── QUICK_START.md               # Guía de inicio rápido
├── MEJORAS_OPCIONALES.md        # Roadmap de mejoras
└── README.md                     # Este archivo
```

## 🎯 Filosofía del Proyecto

### Principios Educativos:
- ✅ **Refuerzo Positivo**: Solo mensajes motivacionales
- ❌ **Sin Penalizaciones**: Los errores son oportunidades de aprender
- 🎨 **Visual First**: Mínimo texto, máximo contenido visual
- 🎮 **Gamificación**: Puntos, progreso y celebraciones
- 👶 **Child-Friendly**: Botones grandes, colores alegres

### Principios Técnicos:
- 🏗️ **Clean Architecture**: Separación clara de capas
- 📦 **Data-Driven**: Ejercicios en JSON, fácil de extender
- 🔒 **Type-Safe**: TypeScript estricto en todo el proyecto
- ⚡ **Performance**: Animaciones nativas, código optimizado
- 🧪 **Testeable**: Arquitectura facilita unit testing

## 🐛 Solución de Problemas

### Limpiar caché y reinstalar

```bash
# Limpiar caché de npm
npm start -- --reset-cache

# Reinstalar node_modules
rm -rf node_modules
npm install
```

### Android

```bash
# Limpiar build de Android
cd android
./gradlew clean
cd ..

# Reconstruir
npm run android
```

### iOS

```bash
# Limpiar build de iOS
cd ios
rm -rf build
rm -rf Pods
rm Podfile.lock
bundle exec pod install
cd ..

# Reconstruir
npm run ios
```

### Resetear completamente el proyecto

```bash
# Limpiar todo
rm -rf node_modules
rm -rf ios/Pods
rm -rf ios/build
rm -rf android/build
rm -rf android/app/build

# Reinstalar todo
npm install
cd ios && bundle exec pod install && cd ..

# Limpiar caché de Metro
npm start -- --reset-cache
```

## 🚀 Roadmap

### ✅ MVP v1.0 (COMPLETADO)
- ✅ 4 pantallas funcionales
- ✅ 20 ejercicios de sumas
- ✅ Sistema de puntos
- ✅ Animaciones básicas
- ✅ Feedback positivo

### 🎯 v1.1 (Próximamente)
- [ ] Persistencia con AsyncStorage
- [ ] Sonidos con react-native-sound
- [ ] Más ejercicios de sumas

### 🌟 v2.0 (Futuro)
- [ ] Nueva categoría: Restas
- [ ] Sistema de badges/logros
- [ ] Más animaciones
- [ ] Mini-juegos adicionales

**📖 Ver roadmap completo en:** [MEJORAS_OPCIONALES.md](./MEJORAS_OPCIONALES.md)

## 📚 Documentación

- 📋 [PLANEAMIENTO.md](./PLANEAMIENTO.md) - Planeación completa del proyecto
- ✅ [MVP_READY.md](./MVP_READY.md) - Estado actual del MVP
- ⚡ [QUICK_START.md](./QUICK_START.md) - Guía de inicio rápido
- 🚀 [MEJORAS_OPCIONALES.md](./MEJORAS_OPCIONALES.md) - Próximas mejoras

## 📚 Recursos de Aprendizaje

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://github.com/pmndrs/zustand)

## 📄 Licencia

Este proyecto es de código privado.

## 👨‍💻 Autor

**JhohellsDL**
- GitHub: [@JhohellsDL](https://github.com/JhohellsDL)
- Repositorio: [KidsMathApp](https://github.com/JhohellsDL/KidsMathApp)

## 🎓 Aprendizajes del Proyecto

Este proyecto demuestra:
- ✅ Clean Architecture en React Native
- ✅ TypeScript avanzado con tipos estrictos
- ✅ State management con Zustand
- ✅ Navegación con React Navigation
- ✅ Animaciones nativas con Animated API
- ✅ Diseño UI/UX para niños
- ✅ Repository pattern
- ✅ Data-driven architecture

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría realizar.

## 🎉 Agradecimientos

Gracias a la comunidad de React Native y a todos los que hacen posible el desarrollo móvil con JavaScript.

---

⭐️ Si este proyecto te resulta útil, ¡no olvides darle una estrella en GitHub!

**Estado**: ✅ MVP COMPLETADO | **Última actualización**: Enero 2026
