# Plan de feature: Historial de actividad y progreso matemático

**Estado:** Propuesta para una siguiente iteración  
**Objetivo:** Permitir consultar qué actividades matemáticas ha practicado el niño, cuándo las hizo, cuánto tiempo dedicó y cómo fue su desempeño.  
**Alcance inicial:** Historial local en el dispositivo, sin cuentas ni sincronización en la nube.

> **Instrucción para el agente de desarrollo:** Antes de implementar, inspecciona el repositorio y el plan principal (`PLAN_MATEMATICAS.md`). Identifica el stack, la navegación, el modelo de ejercicios, el mecanismo de persistencia y los componentes de interfaz existentes. Adapta esta propuesta a la arquitectura real. No introduzcas nuevas dependencias ni reemplaces almacenamiento sin justificarlo.

---

## 1. Recomendación de ubicación en la aplicación

Crear una sección principal llamada **“Mi progreso”** o **“Mi aprendizaje”**, accesible desde Home y desde un icono o menú de navegación persistente si ya existe.

Dentro de esa sección, separar dos vistas:

1. **Resumen:** tiempo total practicado, sesiones realizadas, ejercicios respondidos y porcentaje de aciertos.
2. **Historial:** lista cronológica de sesiones, con fecha, actividad, duración y resultado. Al seleccionar una sesión, mostrar su detalle.

La configuración debe reservarse para preferencias, como sonido, dificultad predeterminada o accesibilidad. El historial es información que el niño o su adulto consulta con frecuencia, así que no conviene esconderlo dentro de Configuración.

Si el diseño actual no admite una nueva sección principal, incluir temporalmente una tarjeta “Mi progreso” en Home. Evitar añadir una pantalla principal nueva sin revisar primero la navegación existente.

## 2. Objetivos de usuario

El niño o adulto que lo acompaña podrá:
- Ver cuánto ha practicado hoy y en total.
- Revisar qué tipos de ejercicios ha realizado.
- Consultar cuánto duró cada sesión.
- Ver cuántos ejercicios respondió y cuántos acertó.
- Revisar el progreso por actividad a lo largo del tiempo.
- Abrir una sesión anterior para ver sus detalles.

La información debe motivar y orientar, no avergonzar. Usar mensajes positivos y evitar clasificaciones competitivas por defecto.

## 3. Alcance por etapas

### MVP — Primera versión

- [ ] Registrar automáticamente una sesión cuando el usuario inicia una actividad.
- [ ] Guardar fecha y hora de inicio y finalización.
- [ ] Calcular la duración real de la sesión.
- [ ] Registrar el tipo de actividad, por ejemplo, sumas, restas, comparación o número anterior/posterior.
- [ ] Registrar ejercicios respondidos y respuestas correctas.
- [ ] Mostrar un resumen general.
- [ ] Mostrar una lista de sesiones ordenada de la más reciente a la más antigua.
- [ ] Permitir abrir el detalle de una sesión.
- [ ] Persistir el historial localmente para que siga disponible tras cerrar y volver a abrir la app.
- [ ] Manejar correctamente sesiones interrumpidas o abandonadas.

### Siguiente versión

- [ ] Filtrar el historial por tipo de actividad.
- [ ] Filtrar por periodo: hoy, últimos 7 días, últimos 30 días y todo el tiempo.
- [ ] Mostrar tiempo total por tipo de actividad.
- [ ] Mostrar evolución del porcentaje de aciertos.
- [ ] Añadir metas de práctica configurables, solo si aportan valor y no generan presión.
- [ ] Permitir borrar el historial con una confirmación clara.

### Más adelante

- [ ] Perfiles separados para varios niños, si la aplicación los necesita.
- [ ] Exportar un resumen para que un adulto lo consulte fuera de la app.
- [ ] Sincronización entre dispositivos, solo si se incorporan cuentas y backend.
- [ ] Resumen semanal para padres o tutores.

No implementar sincronización, perfiles múltiples ni analíticas avanzadas en el MVP sin confirmar primero la necesidad.

## 4. Datos que se deben registrar

Cada sesión representa una actividad practicada en una visita continua al ejercicio. Como mínimo:

| Campo | Propósito |
|---|---|
| `id` | Identificador único de la sesión |
| `activityType` | Tipo de actividad: sumas, restas, comparación, etc. |
| `startedAt` | Fecha y hora de inicio, en formato consistente |
| `endedAt` | Fecha y hora de finalización; puede ser nula mientras esté activa |
| `durationSeconds` | Duración de práctica computada en segundos |
| `questionsAnswered` | Cantidad de ejercicios respondidos |
| `correctAnswers` | Cantidad de respuestas correctas |
| `status` | Estado: `in_progress`, `completed` o `abandoned` |
| `difficulty` | Nivel o rango utilizado, si el modelo de ejercicios lo ofrece |

Opcionales para una fase posterior:
- `incorrectAnswers`, si puede derivarse de los demás campos, no es necesario duplicarlo.
- `questionDetails`, si se requiere revisar cada respuesta. Evaluar el tamaño del almacenamiento y la utilidad antes de guardar cada pregunta.
- `updatedAt`, si la estrategia de persistencia necesita controlar actualizaciones.

**Privacidad:** no guardar nombre completo, ubicación, contactos ni otros datos personales innecesarios. El historial debe mantenerse en el dispositivo en el MVP. No almacenar respuestas detalladas si el resumen por sesión es suficiente.

## 5. Reglas de medición del tiempo

El tiempo debe representar el tiempo de práctica, no simplemente la diferencia entre dos marcas de fecha si la aplicación quedó abierta durante mucho tiempo.

- [ ] Iniciar el registro cuando el usuario comienza realmente la actividad, no al abrir Home.
- [ ] Finalizar al terminar la sesión o cuando el usuario sale explícitamente.
- [ ] Definir qué sucede si la app pasa a segundo plano o la pantalla se bloquea. Para el MVP, pausar el contador cuando la app queda inactiva y reanudarlo cuando vuelve a la actividad.
- [ ] Guardar el estado de la sesión para recuperarse de cierres inesperados.
- [ ] Evitar duraciones negativas o inválidas si cambia la hora del dispositivo.
- [ ] Guardar las fechas en un formato consistente, preferiblemente ISO 8601 en UTC, y mostrarlas en la zona horaria local.
- [ ] Redondear la duración solo al presentarla; conservar segundos en los datos.
- [ ] No contar el tiempo de navegación por Home o por otras pantallas como tiempo de ejercicio.

Si la plataforma o el stack actual no permiten detectar de forma fiable cuándo se pausa una actividad, documentar la limitación y proponer una implementación compatible antes de prometer mediciones exactas.

## 6. Pantallas sugeridas

### A. Resumen de “Mi progreso”

Mostrar tarjetas o bloques visuales con:
- **Tiempo total:** por ejemplo, `1 h 25 min`.
- **Tiempo de hoy:** por ejemplo, `12 min`.
- **Sesiones completadas:** por ejemplo, `8`.
- **Ejercicios respondidos:** por ejemplo, `120`.
- **Porcentaje de aciertos:** por ejemplo, `85 %`, indicando que es una proporción de respuestas correctas.

Añadir una sección “Tus actividades” con tiempo acumulado y cantidad de sesiones por actividad.

Los valores de ejemplo son ilustrativos; no deben mostrarse como datos reales si no existen registros.

### B. Historial de sesiones

Cada elemento de la lista debería mostrar:
- Nombre de la actividad.
- Fecha y hora local.
- Duración.
- Resultado, por ejemplo `8 de 10 correctas`.
- Estado, si fue completada o interrumpida.

Ordenar de la más reciente a la más antigua. Agrupar visualmente por día si encaja con los componentes actuales.

Estados de interfaz:
- Cargando, si la lectura es asíncrona.
- Historial vacío, con un mensaje amable y un acceso a practicar.
- Historial disponible.
- Error al cargar, con una opción de reintentar.

### C. Detalle de una sesión

Mostrar:
- Actividad y nivel.
- Fecha y hora de inicio.
- Duración registrada.
- Ejercicios respondidos.
- Respuestas correctas y porcentaje de aciertos.
- Estado de la sesión.

Si todavía no se guardan respuestas individuales, no mostrar una revisión pregunta por pregunta. Esa funcionalidad debe planificarse como un alcance separado.

## 7. Cálculos y definiciones

Utilizar definiciones consistentes para evitar que las estadísticas se contradigan:

- **Tiempo total practicado:** suma de los segundos de práctica de las sesiones, excluyendo tiempo pausado.
- **Tiempo de hoy:** suma del tiempo de práctica de las sesiones que corresponde al día local actual. Si una sesión cruza la medianoche, distribuir el tiempo correctamente solo si la precisión necesaria justifica esa complejidad; si no, documentar una regla simple y consistente.
- **Sesiones completadas:** cantidad de sesiones cuyo estado es `completed`.
- **Ejercicios respondidos:** suma de las respuestas registradas.
- **Porcentaje de aciertos:** `correctAnswers / questionsAnswered × 100`. Si no se respondió ninguna pregunta, mostrar “Sin datos” o `—`, no `NaN` ni una falsa puntuación de 0 %.
- **Tiempo por actividad:** suma de los segundos de sesiones asociadas a cada tipo de actividad.

No calcular el porcentaje global como el promedio simple de los porcentajes por sesión; calcularlo a partir de los totales de respuestas correctas y respondidas para que cada respuesta tenga el mismo peso.

## 8. Arquitectura e implementación

Adaptarse a la arquitectura del proyecto. Separar responsabilidades sin imponer una estructura de carpetas nueva si el repositorio ya tiene convenciones.

Responsabilidades sugeridas:
- **Session tracker:** inicia, pausa, reanuda y finaliza una sesión.
- **Progress repository:** guarda y consulta sesiones usando la persistencia actual.
- **Progress calculations:** calcula totales, duración por actividad y porcentaje de aciertos.
- **Progress presentation:** presenta resumen, historial y detalle.
- **Modelos/tipos:** definen sesión, estado, actividad y resumen.

Criterios:
- [ ] La interfaz no calcula estadísticas complejas directamente.
- [ ] El registro de una sesión no duplica la lógica de generación de ejercicios.
- [ ] El historial no depende de conexión a internet.
- [ ] La escritura y lectura de datos maneja errores.
- [ ] Las sesiones activas se recuperan o se marcan como interrumpidas al reiniciar la app.
- [ ] Usar identificadores estables, no el índice de la lista.
- [ ] Evitar dependencias nuevas salvo que sean necesarias y aprobadas.

## 9. Pruebas

### Pruebas unitarias
- [ ] Cálculo de duración normal.
- [ ] Pausa y reanudación.
- [ ] Finalización con cero respuestas.
- [ ] Porcentaje de aciertos con resultados conocidos.
- [ ] Agregación por tipo de actividad.
- [ ] Cálculo del tiempo total y del tiempo de hoy.
- [ ] Tratamiento de sesiones incompletas.
- [ ] Fechas y cambios de día.
- [ ] Datos vacíos o corruptos.

### Pruebas de integración y manuales
- [ ] Iniciar una actividad y responder varias preguntas.
- [ ] Finalizar la sesión y verificar que aparece en el historial.
- [ ] Cerrar y reabrir la app; comprobar que los registros siguen disponibles.
- [ ] Mandar la app a segundo plano y verificar la regla de pausa.
- [ ] Salir de una actividad antes de completarla.
- [ ] Comprobar el estado vacío en una instalación nueva.
- [ ] Verificar que sumas y restas continúan funcionando.
- [ ] Comprobar que los textos y métricas se adaptan a pantallas pequeñas.

## 10. Plan de implementación

### Fase 0 — Inspección

- [ ] Leer `PLAN_MATEMATICAS.md`.
- [ ] Revisar navegación, persistencia y modelos existentes.
- [ ] Identificar cómo se detecta el inicio y final de una actividad.
- [ ] Proponer los archivos que se crearán o modificarán.
- [ ] Confirmar cómo se manejará la app en segundo plano.

**Salida:** diagnóstico y plan de archivos, sin refactor general.

### Fase 1 — Registro de sesiones

- [ ] Definir el modelo de sesión.
- [ ] Implementar inicio, pausa, reanudación y finalización.
- [ ] Persistir sesiones mediante el mecanismo actual.
- [ ] Integrar el registro con sumas y restas.
- [ ] Añadir pruebas unitarias y de integración.
- [ ] Verificar recuperación ante cierre inesperado.

### Fase 2 — Resumen e historial

- [ ] Crear el acceso “Mi progreso” desde Home o navegación existente.
- [ ] Implementar las métricas generales.
- [ ] Mostrar historial cronológico.
- [ ] Crear el detalle de sesión.
- [ ] Implementar estados vacío, error y carga cuando apliquen.
- [ ] Validar las métricas con datos de prueba conocidos.

### Fase 3 — Ampliación

- [ ] Integrar los nuevos tipos de ejercicio con el registro.
- [ ] Añadir filtros por periodo y actividad.
- [ ] Mostrar evolución del progreso.
- [ ] Evaluar metas y resumen para adultos según las necesidades reales.

## 11. Criterios de aceptación del MVP

- [ ] Cada sesión iniciada queda registrada correctamente.
- [ ] Las sesiones finalizadas muestran fecha, actividad, duración y resultado.
- [ ] La duración excluye el tiempo pausado según la regla definida.
- [ ] El resumen coincide con los registros almacenados.
- [ ] El historial persiste al cerrar y volver a abrir la aplicación.
- [ ] Los estados vacíos y errores se presentan de forma comprensible.
- [ ] No se rompe el flujo actual de ejercicios.
- [ ] Las pruebas disponibles pasan y se informa cualquier fallo.
- [ ] No se sincronizan datos ni se envían a servicios externos en esta fase.

## 12. Instrucción para el agente de código

Lee `PLAN_HISTORIAL_PROGRESO.md` y `PLAN_MATEMATICAS.md`. Inspecciona primero el repositorio y presenta un diagnóstico de la navegación, el almacenamiento, el modelo de ejercicios y los comandos de prueba/build.

Implementa únicamente la Fase 1 al principio: registro local de sesiones integrado con sumas y restas. Añade pruebas para duración, pausa/reanudación, resultados y persistencia. No desarrolles todavía las pantallas del historial hasta que la captura de datos sea confiable.

Respeta la arquitectura y los componentes existentes. No inventes comandos ni dependencias. No cambies el comportamiento de los ejercicios actuales. Ejecuta las validaciones disponibles y entrega un resumen con archivos modificados, pruebas ejecutadas, resultados, limitaciones y próximos pasos.

---

## 13. Decisiones pendientes

- [ ] ¿El historial será visible solo para el niño o también tendrá una vista para padres/tutores?
- [ ] ¿Se necesita soportar varios perfiles de niños en un mismo dispositivo?
- [ ] ¿Se deben guardar las respuestas individuales o solo los resultados de cada sesión?
- [ ] ¿El tiempo debe pausarse al salir de la actividad o también cuando la app queda en segundo plano?
- [ ] ¿Se desea una meta diaria de práctica?

**Recomendación inicial:** historial local por sesión, métricas agregadas y sin datos personales adicionales. Primero asegurar que los registros y tiempos sean confiables; después construir la visualización y, más adelante, añadir filtros o informes.
