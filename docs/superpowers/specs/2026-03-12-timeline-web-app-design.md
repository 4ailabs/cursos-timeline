# Timeline Web App — Instituto Centrobioenergetica

**Fecha:** 2026-03-12
**Autor:** Dr. Miguel Ojeda Rios
**Estado:** Aprobado

## Resumen

App web interactiva (archivo HTML autocontenido) para seguimiento diario de lanzamientos de cursos del Instituto Centrobioenergetica. Combina un tablero diario de tareas con una vista Gantt de timeline. Persistencia en localStorage con importar/exportar JSON.

## Decisiones de diseno

| Pregunta | Decision |
|----------|----------|
| Vistas | Tablero diario + Gantt timeline |
| Fuente de datos | Editor integrado + localStorage, datos semilla pre-cargados |
| Nivel de detalle | Hitos, fases de campana y tareas individuales dia a dia |
| Estados de tarea | No iniciado / En progreso / Hecho |
| Arquitectura | Archivo HTML unico autocontenido (vanilla JS, CSS inline) |

## Arquitectura

Un solo archivo `timeline-instituto.html`:

- **HTML**: estructura de ambas vistas y panel de editor
- **CSS**: estilos con variables CSS de color por curso
- **JS**: logica de renderizado, editor CRUD, persistencia localStorage
- **Datos semilla**: curso Reset Hormonal pre-cargado

### Persistencia

- `localStorage` como almacenamiento primario
- Primera carga: si localStorage vacio, carga datos semilla
- Exportar: descarga archivo `.json` con todos los datos
- Importar: carga archivo `.json` y reemplaza datos
- Reset: restaura datos semilla (con confirmacion)

### Navegacion

Dos pestanas fijas en la parte superior:
- "Hoy" — tablero diario
- "Timeline" — vista Gantt
- Fecha actual siempre visible

## Vista "Hoy" — Tablero diario

### Encabezado
- Fecha actual con flechas izquierda/derecha para navegar entre dias
- Resumen rapido: "X tareas pendientes, Y en progreso, Z completadas"

### Contenido por curso
Para cada curso activo ese dia, una seccion colapsable:
- Nombre del curso con color identificador
- Fase actual resaltada (ej. "Fase de Lanzamiento — Dia 3 de 14")
- Cuenta regresiva al proximo hito grande (ej. "Faltan 12 dias para Webinar 1")
- Lista de tareas del dia con estados clicables:
  - No iniciado (cuadro vacio)
  - En progreso (icono circular)
  - Hecho (check verde)
- Cada tarea muestra hora si la tiene (ej. "18:00 — Publicar reel en Instagram")

### Dia sin tareas
Mensaje: "Sin tareas programadas" con icono relajado

## Vista "Timeline" — Gantt visual

### Ejes
- **Horizontal**: meses (marzo a diciembre 2026), scroll horizontal
- **Vertical**: un renglon por curso con su color

### Elementos por curso
- Barra general del curso (fecha inicio a fecha fin)
- Sub-barras de fases en tonos del mismo color (Calentamiento, Lanzamiento, Cierre, etc.)
- Hitos como diamantes sobre la barra
- Hover sobre hito: tooltip con nombre, fecha y estado

### Controles
- Linea vertical roja "HOY" cruzando todo el Gantt
- Zoom: semana / mes / trimestre
- Clic en un dia del Gantt navega a ese dia en vista "Hoy"

## Editor de cursos y tareas

Accesible desde boton "Gestionar cursos" en esquina superior.

### Panel lateral
- Lista de cursos existentes (editar / eliminar)
- Boton "+ Nuevo curso" con formulario:
  - Nombre del curso
  - Color (selector de colores predefinidos)
  - Fecha inicio y fin general

### Dentro de cada curso
Pestanas para gestionar:

**Fases:**
- Nombre, fecha inicio, fecha fin
- CRUD completo (agregar, editar, eliminar)

**Hitos:**
- Nombre, fecha, hora opcional
- CRUD completo

**Tareas:**
- Nombre, fase asignada, dia especifico, hora opcional
- CRUD completo
- Estado editable (No iniciado / En progreso / Hecho)

### Respaldo
- Boton exportar JSON (descarga archivo)
- Boton importar JSON (carga y reemplaza)
- Boton reset a datos semilla (con confirmacion)

## Datos semilla: Reset Hormonal

### Informacion del curso
- **Nombre**: El Reset Hormonal
- **Color**: Uva (morado, consistente con colorId 3 del calendario)
- **Periodo general**: Marzo 1 — Junio 15, 2026

### Fases

| Fase | Inicio | Fin | Descripcion |
|------|--------|-----|-------------|
| Calentamiento | Mar 1 | Mar 25 | Contenido educativo, awareness |
| Lanzamiento | Mar 26 | May 10 | Webinars, inscripciones abiertas |
| Ejecucion | May 16 | May 30 | Dias del curso |
| Post-curso | May 31 | Jun 15 | Seguimiento, testimonios |

### Hitos

| Hito | Fecha | Hora |
|------|-------|------|
| Webinar 1 | Mar 26 | 18:00 |
| Webinar 2 | Apr 30 | 18:00 |
| Cierre Pronto Pago (Dia de la Madre) | May 10 | — |
| Dia 1: El Mapa | May 16 | 10:00-18:00 |
| Dia 2: El Metodo | May 30 | 10:00-18:00 |

### Tareas ejemplo por fase

**Calentamiento (Mar 1-25):**
- Publicar contenido educativo sobre climaterio (redes sociales)
- Crear reels informativos
- Enviar emails de nurturing a lista
- Preparar landing page del curso
- Disenar materiales graficos de campana

**Lanzamiento (Mar 26 - May 10):**
- Publicar replay de webinar
- Enviar emails de venta (secuencia)
- Publicar testimonios de ediciones anteriores
- Recordatorios de pronto pago
- Campana de Dia de la Madre
- Cierre de inscripciones pronto pago

**Ejecucion (May 16-30):**
- Preparar materiales para Dia 1
- Enviar instrucciones a participantes
- Seguimiento post-Dia 1
- Preparar materiales para Dia 2
- Enviar recordatorio Dia 2

**Post-curso (May 31 - Jun 15):**
- Recopilar testimonios de participantes
- Enviar certificados
- Email de siguiente curso
- Analisis de resultados

## Modelo de datos (JSON)

```json
{
  "courses": [
    {
      "id": "reset-hormonal",
      "name": "El Reset Hormonal",
      "color": "#7B68EE",
      "startDate": "2026-03-01",
      "endDate": "2026-06-15",
      "phases": [
        {
          "id": "calentamiento",
          "name": "Calentamiento",
          "startDate": "2026-03-01",
          "endDate": "2026-03-25"
        }
      ],
      "milestones": [
        {
          "id": "webinar-1",
          "name": "Webinar 1",
          "date": "2026-03-26",
          "time": "18:00"
        }
      ],
      "tasks": [
        {
          "id": "task-001",
          "name": "Publicar contenido educativo sobre climaterio",
          "phaseId": "calentamiento",
          "date": "2026-03-03",
          "time": null,
          "status": "not_started"
        }
      ]
    }
  ]
}
```

### Estados de tarea
- `not_started` — No iniciado
- `in_progress` — En progreso
- `done` — Hecho

## Restricciones tecnicas

- Archivo HTML unico, sin dependencias externas
- Vanilla JS (sin frameworks)
- CSS con variables para temas de color
- Compatible con Safari, Chrome, Firefox modernos
- Responsive basico (funcional en tablet, optimizado para desktop)
- Sin CDN ni recursos externos — todo inline

## Futuro (fuera de alcance)

- Sincronizacion con Google Calendar
- Modo colaborativo / multi-usuario
- Notificaciones push
- Despliegue como PWA
- Integracion con WhatsApp o email automatico
