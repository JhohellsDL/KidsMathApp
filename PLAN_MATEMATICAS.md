# Plan de evolución: aplicación de práctica de matemáticas

**Estado:** Propuesta inicial\
**Plataforma:** Android primero\
**Punto de partida:** La aplicación ya cuenta con un prototipo funcional
de sumas y restas.\
**Público objetivo inicial:** Niños de 5 a 12 años. Diseñar la
dificultad para que pueda ampliarse posteriormente a adolescentes.\
**Objetivo:** Incorporar actividades breves y progresivas para practicar
conceptos matemáticos básicos, reutilizando la arquitectura, los
componentes y el estilo visual existentes.

> **Instrucción para el agente de desarrollo:** No implementes todos los
> features de una sola vez. Primero inspecciona el repositorio,
> identifica el stack, la arquitectura, las pantallas actuales de sumas
> y restas, el sistema de navegación, el almacenamiento local y las
> convenciones de código. Luego presenta un resumen del plan de
> implementación y ejecuta las fases en orden. No reemplaces ni rompas
> funcionalidades existentes.

------------------------------------------------------------------------

## 1. Objetivos del producto

-   Permitir que un niño practique matemáticas sin necesitar una
    conexión a internet.
-   Ofrecer ejercicios fáciles de entender, con instrucciones breves y
    retroalimentación inmediata.
-   Adaptar el rango numérico y la dificultad al tipo de ejercicio.
-   Reutilizar componentes visuales y lógica común para evitar
    duplicación.
-   Guardar el progreso localmente cuando la aplicación ya tenga un
    mecanismo de persistencia; si no lo tiene, proponer una solución
    sencilla compatible con el stack actual.
-   Mantener una experiencia amigable, accesible y sin presión: los
    errores deben servir para aprender.

## 2. Alcance funcional

### Funcionalidades existentes

-   [ ] Revisar y documentar el funcionamiento actual de sumas.
-   [ ] Revisar y documentar el funcionamiento actual de restas.
-   [ ] Identificar componentes reutilizables, generación de ejercicios,
    validación de respuestas y persistencia existente.
-   [ ] Crear o actualizar pruebas para garantizar que los ejercicios
    actuales sigan funcionando.

### Features propuestos

  ------------------------------------------------------------------------
  ID                Feature           Descripción        Prioridad
  ----------------- ----------------- ------------------ -----------------
  MAT-01            Mayor, menor o    Comparar dos       Alta
                    igual             números usando     
                                      `>`, `<` o `=`.    

  MAT-02            Número anterior y Encontrar el       Alta
                    posterior         número que va      
                                      antes o después de 
                                      uno dado.          

  MAT-03            Sumas incompletas Completar el       Alta
                                      número que falta   
                                      en una suma, por   
                                      ejemplo            
                                      `3 + __ = 8`.      

  MAT-04            Restas            Completar el       Alta
                    incompletas       número que falta   
                                      en una resta, por  
                                      ejemplo            
                                      `9 - __ = 4`.      

  MAT-05            Ordenar números   Ordenar un         Media
                                      conjunto pequeño   
                                      de números de      
                                      menor a mayor o de 
                                      mayor a menor.     

  MAT-06            Series numéricas  Completar patrones Media
                                      simples, por       
                                      ejemplo            
                                      `2, 4, 6, __`.     

  MAT-07            Conteo y          Contar elementos   Media
                    agrupación        ilustrados y       
                                      asociarlos con su  
                                      número.            

  MAT-08            Dobles y mitades  Resolver           Media
                                      ejercicios         
                                      sencillos de       
                                      dobles y mitades   
                                      dentro de un rango 
                                      definido.          

  MAT-09            Tablas de         Practicar          Posterior
                    multiplicar       multiplicaciones   
                                      de forma gradual.  

  MAT-10            División básica   Repartos exactos y Posterior
                                      divisiones         
                                      sencillas.         
  ------------------------------------------------------------------------

**Orden recomendado:** implementar primero MAT-01 a MAT-04. Son
actividades cercanas a las operaciones existentes y permiten validar una
estructura reutilizable antes de ampliar el alcance.

## 3. Requisitos detallados de los primeros features

### MAT-01 --- Mayor, menor o igual

**Objetivo:** reconocer cuál de dos cantidades es mayor, menor o si
ambas son iguales.

**Ejemplo de interacción:** - Mostrar dos números: `7` y `4`. - Ofrecer
tres respuestas: `>`, `<`, `=`. - Al responder, indicar si acertó y
mostrar una explicación breve, por ejemplo: "7 es mayor que 4".

**Criterios de aceptación:** - \[ \] Genera dos números dentro del rango
configurado. - \[ \] Incluye casos en los que el primer número es mayor,
menor e igual al segundo. - \[ \] La respuesta correcta se calcula con
una función independiente de la interfaz. - \[ \] No repite
indefinidamente el mismo ejercicio durante una sesión. - \[ \] La
interfaz funciona con texto grande y controles cómodos para niños.

### MAT-02 --- Anterior y posterior

**Objetivo:** reconocer la secuencia de los números.

**Ejemplo de interacción:** - Pregunta: "¿Qué número viene después del
8?" - O modalidad alternativa: "¿Qué número va antes del 8?" -
Respuestas mediante opciones o teclado numérico, según los componentes
existentes.

**Criterios de aceptación:** - \[ \] Permite elegir entre "anterior" y
"posterior". - \[ \] Evita generar ejercicios cuyo resultado quede fuera
del rango permitido. - \[ \] Valida correctamente los límites del
rango. - \[ \] Muestra retroalimentación inmediata y permite continuar.

### MAT-03 --- Sumas incompletas

**Objetivo:** comprender que una suma puede tener un sumando
desconocido.

**Ejemplos:** - `3 + __ = 8` - `__ + 2 = 6` - `4 + 3 = __`

**Criterios de aceptación:** - \[ \] Incluye ejercicios con el espacio
vacío en distintas posiciones. - \[ \] Genera resultados válidos para la
dificultad seleccionada. - \[ \] Comprueba la respuesta con lógica
independiente de la vista. - \[ \] Permite volver a intentarlo sin
bloquear la sesión. - \[ \] Reutiliza, cuando sea posible, la lógica y
componentes del módulo de sumas actual.

### MAT-04 --- Restas incompletas

**Objetivo:** comprender la relación entre minuendo, sustraendo y
resultado.

**Ejemplos:** - `9 - __ = 4` - `__ - 3 = 5` - `8 - 2 = __`

**Criterios de aceptación:** - \[ \] Genera restas válidas y no produce
resultados negativos en el nivel inicial. - \[ \] Permite variar la
posición del número desconocido. - \[ \] Valida correctamente la
respuesta. - \[ \] Reutiliza los componentes comunes de ejercicios y
retroalimentación.

## 4. Progresión de dificultad

La edad es una referencia, no una regla rígida. Si la aplicación no
dispone todavía de perfiles o niveles, comenzar con una selección simple
de dificultad.

  -----------------------------------------------------------------------
  Nivel                   Rango sugerido          Contenido
  ----------------------- ----------------------- -----------------------
  Inicial                 0--10                   Conteo, comparación,
                                                  anterior/posterior,
                                                  sumas y restas muy
                                                  sencillas

  Básico                  0--20                   Comparaciones,
                                                  operaciones y
                                                  ejercicios incompletos

  Intermedio              0--100                  Operaciones con números
                                                  mayores, series y
                                                  ordenamiento

  Avanzado                Configurable            Multiplicación,
                                                  división y retos
                                                  combinados
  -----------------------------------------------------------------------

-   [ ] La generación de ejercicios debe recibir una configuración de
    dificultad.
-   [ ] Evitar valores negativos en las restas iniciales.
-   [ ] Evitar resultados imposibles o ejercicios ambiguos.
-   [ ] Permitir ampliar los rangos sin duplicar las pantallas.
-   [ ] No asumir que la edad del niño determina por sí sola su nivel.

## 5. Experiencia común de los ejercicios

Crear una experiencia reutilizable para los diferentes tipos de
actividad, adaptándola a los patrones actuales del proyecto.

Elementos recomendados: - Nombre e instrucciones de la actividad. -
Indicador de progreso de la sesión, por ejemplo, `3 de 10`. - Enunciado
y área principal del ejercicio. - Respuestas grandes y fáciles de
pulsar. - Retroalimentación breve después de responder. - Acción para
continuar y opción para salir de la sesión. - Resumen final con
respuestas correctas, ejercicios realizados y tiempo opcional.

Criterios de experiencia: - \[ \] No depender únicamente del color para
indicar acierto o error. - \[ \] Usar mensajes positivos y neutrales; no
penalizar al niño con mensajes humillantes. - \[ \] Permitir que el niño
lea la instrucción sin prisas. - \[ \] Mantener navegación sencilla y
consistente. - \[ \] Evitar anuncios, enlaces externos o compras dentro
del flujo de resolución de ejercicios, especialmente si la app está
dirigida a menores.

## 6. Progreso y estadísticas

Implementar solo después de confirmar cómo persiste datos la aplicación
actual.

Datos mínimos sugeridos por sesión: - Tipo de actividad. - Fecha de la
sesión. - Cantidad de ejercicios respondidos. - Cantidad de respuestas
correctas. - Duración, si se decide medirla. - Nivel o rango utilizado.

Criterios: - \[ \] El progreso se guarda localmente. - \[ \] La app
continúa funcionando sin internet. - \[ \] Un fallo al guardar el
progreso no impide practicar. - \[ \] No almacenar nombre completo,
ubicación ni otros datos personales innecesarios. - \[ \] Si no existe
persistencia, presentar primero una propuesta técnica y esperar
aprobación antes de añadir dependencias importantes.

## 7. Diseño técnico y calidad

**Regla principal:** seguir las convenciones ya presentes en el
repositorio. No introducir una arquitectura o librería nueva sin
justificarlo.

Separaciones recomendadas: - **Generación de ejercicios:** crea
ejercicios válidos según el tipo y la dificultad. - **Validación:**
determina si una respuesta es correcta, sin depender de componentes
visuales. - **Modelos y tipos:** representan el ejercicio, la respuesta,
la dificultad y el resultado de sesión. - **Presentación:** muestra el
enunciado, las opciones y la retroalimentación. - **Persistencia:**
guarda el progreso mediante el mecanismo que use el proyecto.

Buenas prácticas: - Reutilizar componentes antes de crear variantes
duplicadas. - Evitar componentes excesivamente grandes y hooks con
demasiadas responsabilidades. - Mantener nombres claros y constantes
centralizadas. - Manejar límites y casos extremos en los generadores. -
Seguir el formato, lint, pruebas y estructura de carpetas existentes. -
No añadir dependencias si la funcionalidad se puede resolver con las
herramientas actuales. - Mantener compatibilidad con la versión de
Android y el stack configurados en el proyecto.

## 8. Plan de implementación por fases

### Fase 0 --- Inspección del proyecto

-   [ ] Identificar framework, lenguaje, gestor de paquetes y comandos
    disponibles.
-   [ ] Revisar estructura de carpetas, navegación y diseño actual.
-   [ ] Localizar implementación de sumas y restas.
-   [ ] Revisar pruebas, lint, formato y persistencia.
-   [ ] Documentar riesgos y proponer archivos que se modificarán.

**Salida esperada:** resumen de la arquitectura actual, plan de cambios
y lista de archivos probables. No realizar una reescritura general.

### Fase 1 --- Base reutilizable de ejercicios

-   [ ] Definir tipos o modelos comunes para los ejercicios.
-   [ ] Separar generación y validación de la interfaz.
-   [ ] Crear pruebas unitarias para la lógica compartida.
-   [ ] Integrar la base con sumas y restas existentes sin cambiar su
    comportamiento.
-   [ ] Confirmar que la aplicación compila y las pruebas pasan.

### Fase 2 --- Primera entrega

-   [ ] Implementar MAT-01: mayor, menor o igual.
-   [ ] Implementar MAT-02: anterior y posterior.
-   [ ] Implementar MAT-03: sumas incompletas.
-   [ ] Implementar MAT-04: restas incompletas.
-   [ ] Añadir pruebas unitarias de casos normales, límites y respuestas
    incorrectas.
-   [ ] Verificar visualmente las pantallas en el dispositivo o
    emulador.
-   [ ] Actualizar la documentación de uso.

### Fase 3 --- Sesiones y progreso

-   [ ] Crear sesiones con una cantidad configurable de preguntas.
-   [ ] Mostrar resumen al finalizar.
-   [ ] Persistir el progreso local, si está dentro del alcance
    aprobado.
-   [ ] Probar el comportamiento al cerrar y volver a abrir la
    aplicación.

### Fase 4 --- Ampliaciones

-   [ ] Implementar ordenamiento de números.
-   [ ] Implementar series numéricas.
-   [ ] Implementar conteo y agrupación visual.
-   [ ] Evaluar dobles, mitades, multiplicación y división.
-   [ ] Priorizar las ampliaciones usando resultados de uso y
    comentarios de usuarios.

## 9. Estrategia de pruebas

Para cada tipo de ejercicio: - \[ \] Probar los valores mínimos y
máximos. - \[ \] Probar respuestas correctas e incorrectas. - \[ \]
Comprobar que los ejercicios generados siempre tienen una solución
válida. - \[ \] Comprobar que no existen divisiones por cero ni
resultados inválidos si se añaden operaciones nuevas. - \[ \] Probar
varias generaciones seguidas para detectar patrones repetitivos
excesivos. - \[ \] Verificar que el diseño se adapta a diferentes
tamaños de pantalla. - \[ \] Verificar accesibilidad básica:
legibilidad, tamaño de objetivos táctiles y no depender solo del color.

**Validación de integración:** - \[ \] Ejecutar pruebas unitarias. - \[
\] Ejecutar lint y formato según los scripts disponibles. - \[ \]
Ejecutar el chequeo de tipos, si aplica. - \[ \] Ejecutar el build de
Android usando el comando documentado por el repositorio. - \[ \] Probar
manualmente sumas y restas existentes. - \[ \] Confirmar que no se
introdujeron cambios no relacionados.

No declarar una prueba o compilación como exitosa si no se ejecutó o si
falló.

## 10. Integración con GitHub Actions

Este documento es una especificación para guiar a un agente de código;
**por sí solo no activa un pipeline ni compila la aplicación**. Para
automatizar el proceso se necesita un workflow de GitHub Actions
(`.github/workflows/*.yml`) con los pasos y comandos reales del
proyecto.

Pipeline recomendado: 1. Checkout del repositorio. 2. Configuración de
la versión de Node y del gestor de paquetes detectados en el proyecto.
3. Instalación reproducible de dependencias usando el lockfile. 4. Lint
y chequeo de tipos, si existen. 5. Pruebas unitarias. 6. Build Android
en CI, si el repositorio y sus secretos/configuración lo permiten. 7.
Publicación de artefactos solo si está configurada y autorizada
explícitamente.

Antes de crear el workflow: - \[ \] Inspeccionar `package.json`,
lockfile y workflows existentes. - \[ \] Reutilizar los comandos y
versiones ya definidos por el repositorio. - \[ \] No inventar scripts
ni secretos. - \[ \] No publicar automáticamente en tiendas ni
distribuir builds sin aprobación. - \[ \] No guardar credenciales en el
repositorio. - \[ \] Hacer que el pipeline falle si una validación
obligatoria falla.

## 11. Definition of Done

Un feature se considera terminado cuando: - \[ \] Cumple sus criterios
de aceptación. - \[ \] Tiene lógica separada de la presentación cuando
corresponda. - \[ \] Incluye pruebas para la lógica relevante. - \[ \]
No rompe sumas, restas ni navegación existentes. - \[ \] Pasa lint,
chequeo de tipos y pruebas disponibles. - \[ \] La compilación requerida
termina correctamente o se documenta claramente el bloqueo. - \[ \] La
interfaz se ha verificado en emulador o dispositivo. - \[ \] Se
actualizó la documentación necesaria. - \[ \] El resumen de entrega
indica archivos modificados, pruebas ejecutadas y limitaciones
conocidas.

## 12. Instrucción reutilizable para un agente de código

Puedes copiar esta instrucción junto con este archivo en Copilot,
Antigravity u otro agente compatible:

> Lee `PLAN_MATEMATICAS.md` completo y revisa el repositorio antes de
> cambiar código. Comienza por la Fase 0: identifica el stack, los
> comandos reales, la arquitectura y la implementación existente de
> sumas y restas. Después propone un plan concreto con archivos a
> crear/modificar y riesgos. Implementa solo la Fase 1 y MAT-01 de la
> Fase 2 en la primera iteración, salvo que se indique expresamente otro
> alcance. Respeta las convenciones actuales, reutiliza componentes,
> añade pruebas y ejecuta las validaciones disponibles. No inventes
> comandos, no ocultes fallos, no elimines funcionalidades existentes y
> no publiques ni despliegues nada sin autorización. Al terminar,
> informa: resumen, archivos modificados, pruebas ejecutadas con
> resultado, estado del build y siguientes pasos.

------------------------------------------------------------------------

## 13. Decisiones pendientes

-   [ ] Confirmar el rango inicial de edad: esta propuesta asume de 5 a
    12 años.
-   [ ] Confirmar si la app es React Native, nativa Android u otra
    tecnología; el agente debe verificarlo en el repositorio.
-   [ ] Definir si los ejercicios tendrán opciones múltiples, entrada
    numérica o ambas.
-   [ ] Definir si habrá perfiles separados para varios niños.
-   [ ] Definir si el progreso se muestra al niño, a un adulto o a
    ambos.
-   [ ] Definir si el primer lanzamiento incluirá solo los cuatro
    features de prioridad alta.

**Recomendación de alcance:** comenzar con MAT-01 a MAT-04, dificultad
inicial y básica, una sesión corta de ejercicios y pruebas
automatizadas. Dejar estadísticas avanzadas, perfiles múltiples y nuevas
operaciones para iteraciones posteriores.
