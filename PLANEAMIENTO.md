# 📘 KidsMathApp — Planeamiento del Proyecto

## 🎯 Objetivo

Crear una aplicación móvil educativa para niños que refuerce habilidades matemáticas de forma divertida, visual y motivadora, sin penalizar errores y fomentando el aprendizaje progresivo.

## 🧭 Estructura Principal de la App

### 1. Pantalla de Bienvenida / Inicio

**Objetivo:** Introducción rápida y amigable.

**Incluye (MVP):**
- Logo animado
- Botón grande "Empezar a jugar"
- Acceso discreto a configuración / padres

**Incluye (Post-MVP):**
- Selector de perfil de niño (multi-usuario)

### 2. Pantalla Principal (Home)

**Objetivo:** Punto central de progreso y acceso al juego.

**Incluye (MVP):**
- Avatar simple del niño
- Puntos acumulados ⭐
- Botón principal "Jugar"
- Indicador simple de progreso (Ejercicio X / Total)

**Incluye (Post-MVP):**
- Nivel del niño
- Menú de categorías matemáticas
- Progreso visual (barras, estrellas)
- Racha de días consecutivos

## 📚 Categorías de Contenido (Roadmap)

### 🔹 Nivel 1 — Preescolar / Primeros años (3–5 años)
- Contar del 1 al 10 (con objetos visuales)
- Reconocimiento de números
- Más / Menos (comparación visual)
- Formas geométricas básicas

### 🔹 Nivel 2 — Primaria inicial (6–7 años)
- Sumas simples (1–10)
- Restas simples (1–10)
- Conteo de 2 en 2 y de 5 en 5
- Secuencias numéricas

### 🔹 Nivel 3 — Primaria media (8–9 años)
- Sumas y restas con llevadas
- Tablas de multiplicar (1 al 5)
- Problemas con palabras sencillos
- Fracciones básicas (1/2, 1/4)

### 🔹 Nivel 4 — Primaria avanzada (10–12 años)
- Multiplicación y división completas
- Fracciones avanzadas
- Decimales básicos
- Geometría (áreas y perímetros)

## 🧩 Tipos de Ejercicios

### Opción múltiple (MVP)

**Ejemplo:**
```
¿Cuánto es 5 + 3?
[6] [8] [9] [7]
```

### Arrastrar y soltar (Post-MVP)
- Arrastrar el número correcto a la respuesta
- Agrupar objetos por cantidad

### Rellenar el espacio (Post-MVP)

**Ejemplo:**
```
5 + ___ = 8
```

### Mini-juegos (Post-MVP)
- Atrapa el resultado correcto
- Dispara al globo con la respuesta correcta
- Completa el camino eligiendo respuestas correctas

## ⭐ Sistema de Recompensas

### MVP:
- ⭐ Puntos por cada ejercicio correcto
- 🎉 Pantalla de celebración al finalizar

### Post-MVP:
- 🏆 Trofeos por completar niveles
- 🎨 Stickers / insignias coleccionables
- 👕 Personalización de avatar
- 🎮 Mini-juegos desbloqueables

## 🎉 Motivación y Feedback

- Sonidos alegres al acertar
- Animaciones celebratorias suaves
- Mensajes positivos:
  - "¡Muy bien!"
  - "¡Increíble!"
  - "¡Sigue así!"

**Principio clave:**
- ❌ No castigar errores
- ✅ Animar siempre a reintentar

## 👨‍👩‍👧‍👦 Modo Padres / Maestros (Post-MVP)

- Reporte de progreso
- Tiempo de uso
- Áreas fuertes y débiles
- Configuración de dificultad
- Control de sonido

## 🎨 Recomendaciones UI / UX

- Colores brillantes y alegres (azul, verde, amarillo, naranja)
- Fuentes grandes y legibles
- Botones grandes (pensados para dedos pequeños)
- Personajes amigables como guías
- Mínimo texto, máximo contenido visual
- Instrucciones con voz (opcional)
- Animaciones cortas y no invasivas

## 🚀 MVP — Producto Mínimo Viable (Versión 1.0)

**Incluye:**
- Una categoría: Sumas (1–10)
- 20 ejercicios de opción múltiple
- Sistema de puntos simple ⭐
- Pantalla de celebración al terminar
- Un solo usuario
- Sin login

**Objetivo del MVP:**  
Validar experiencia, engagement y flujo de juego.

## 🔮 Evolución Posterior

- Más categorías
- Perfiles múltiples
- Sistema de niveles
- Mini-juegos adicionales
- Panel para padres
- Internacionalización

## 🧰 Stack Tecnológico

- **Framework:** React Native ✅
- **Animaciones:** react-native-reanimated
- **Sonidos:** react-native-sound
- **Storage:** AsyncStorage
- **Navegación:** React Navigation

## 🧠 Consideraciones Técnicas Clave

- Contenido desacoplado (JSON / data-driven)
- Arquitectura escalable
- Estado global liviano
- Pensado para analíticas futuras

## ✅ Estado del documento

📌 **Aprobado como planeamiento base del proyecto**

**Listo para:**
- Iniciar desarrollo
- Crear wireframes
- Definir backlog
- Armar roadmap

