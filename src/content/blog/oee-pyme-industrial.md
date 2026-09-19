---
title: "OEE en PyMEs: el indicador que cambia conversaciones"
description: "La Overall Equipment Effectiveness mide disponibilidad, performance y calidad en una sola cifra. Por qué en PyMEs manufactureras reemplaza cinco planillas."
pubDate: 2026-05-07
author: "Lucía Fernández"
authorRole: "Socia — Estrategia & Operaciones"
category: "Operaciones"
readingTime: 8
heroImage: "/hero/operaciones.svg"
heroAlt: "Diagrama editorial circular con tres sectores etiquetados disponibilidad, performance y calidad sobre fondo crema"
ogImage: "/og-default.svg"
tags: ["OEE", "indicadores", "planta"]
featured: true
---

Hay un indicador que, cuando empieza a medirse en serio en una PyME industrial, **modifica la dinámica de las reuniones de planta**. Es el OEE —Overall Equipment Effectiveness, Eficiencia Global del Equipo—. No por su sofisticación, sino porque mete en una sola cifra las tres pérdidas que todos conocen pero nadie mide: las paradas, las velocidades chicas y la calidad.

Las PyMEs manufactureras argentinas rara vez lo calculan. Las que empiezan, lo cambian todo.

## Qué mide el OEE, exactamente

El OEE multiplica tres factores, cada uno entre 0% y 100%:

- **Disponibilidad.** Tiempo que la máquina o línea estuvo _corriendo_, sobre el tiempo que debería haber corrido. Paradas no programadas, setups largos, falta de insumo.
- **Performance.** Velocidad efectiva vs. velocidad teórica. Cuando una máquina corre al 70% de su capacidad nominal, performance es 70%.
- **Calidad.** Unidades buenas sobre unidades producidas. Lo que sale a retrabajo o descarte come este factor.

Multiplicación: OEE = Disponibilidad × Performance × Calidad. Si los tres factores están al 85%, el OEE es 61,4%. Si uno está al 50%, el OEE se derrumba, porque la multiplicación es cruel.

## El benchmark que sirve para PyMEs industriales

El benchmark mundial —el que usan automotriz, farmacéutica y similares— está en 85%. Las PyMEs argentinas manufactureras arrancan típicamente entre 35% y 55%. **Duplicar el OEE es una meta realista**, no una locura. Y duplicar OEE, en una planta con cuello de botella, suele equivaler a duplicar capacidad sin comprar una máquina.

## Por qué reemplaza cinco planillas

Antes del OEE, una PyME industrial mide cosas distintas en planillas distintas:

- Paradas en una hoja, registrada por el supervisor.
- Producción vs.计划 en otra, registrada por el operario.
- Desperdicio en una planilla de calidad.
- Setups en una hoja más.

Las planillas rara vez se cruzan. El dueño mira cada una por separado, nunca ve la foto junta. **El OEE cruza las tres**. Cuando empieza a calcularse, las planillas se mantienen —porque son fuente—, pero el reporte único que importa es el OEE diario o semanal.

## Cómo implementarlo sin un MES caro

La implementación industrial del OEE hoy es trivial. Lo único no trivial es **el hábito de medir**. Lo que funciona en las PyMEs:

1. **Una planilla, una línea, un turno por primera vez.** No trates de medir todo el piso de entrada. Elegí la línea más crítica, el turno más largo, dos semanas.
2. **Un sensor, no cinco.** Lo mínimo para arrancar: contador de piezas producidas (un sensor o un contador manual), reloj de paradas, registro de defectos. Si tenés PLC con datos, mejor.
3. **Una reunión semanal de quince minutos** donde se mira el número y se pregunta: _¿cuál de los tres factores perdió más esta semana?_
4. **Una acción semanal por factor.** Cada reunión define una acción específica para el factor más débil.

A los dos meses podés extenderlo a otra línea. A los seis meses, ya tenés el pulso.

## Errores comunes que frustran la implementación

Lo que vimos fallar en varias PyMEs:

- **Medir sin cerrar el loop.** Sacar el número sin actuar hace que en tres semanas nadie lo mire.
- **Apuntar al 85% de entrada.** Eso genera frustración y abandono. Una meta razonable los primeros meses es subir 10 puntos; en seis meses, otros 10.
- **Castigar al supervisor por el número.** El OEE es un sensor del sistema, no una evaluación del supervisor. Si el supervisor lo vive como evaluación, deja de reportar.
- **Querer medir veinte líneas a la vez.** Es la forma más rápida de no medir nada. Una línea, hecha bien, se expande sola.

## Qué preguntar después de medir un mes

Cuando tenés cuatro semanas de OEE confiable, las preguntas que cambian la planta son:

- _¿Por qué este factor está más bajo que los otros?_ Te señala hacia dónde apuntar.
- _¿Hay diferencia entre turnos?_ A veces hay, y la cifra te dice cuánto.
- _¿Hay días de la semana sistemáticamente peores?_ Lunes y viernes, típicamente, por motivos conocidos que conviene confirmar.

Esas preguntas, en una PyME con un equipo supervisor que sabe operar, **vuelven solos a la planta al día siguiente**. El OEE no les dice qué hacer; les pone foco en lo que tiene que arreglarse.

## El indicador que sube la moral

Una cosa que no anticipamos: cuando el OEE se publica semanalmente y el equipo ve que sube, **la moral sube con él**. No es magia. Es sentido de progreso. Una planta que viene de 40% y llega a 55% en seis meses tiene una historia para contar —y el equipo quiere contarla.

El OEE no resuelve sola los problemas. Resuelve una cosa más rara: **hace que los problemas sean visibles y tratables**.

---

Si querés arrancar con OEE en una línea de tu planta sin comprar software, escribinos. Tenemos una planilla modelo, un procedimiento de medición y un taller de implementación de cuatro horas.
