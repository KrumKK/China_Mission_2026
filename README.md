# 🇨🇳 Misión China 2026 — Lizarte

Aplicación de gestión y preparación de la misión comercial a Beijing y Shenzhen (junio 2026).

## Estructura del proyecto

```
china-mission-app/
├── index.html       ← Aplicación principal
├── styles.css       ← Estilos (mobile-first, modo oscuro incluido)
├── app.js           ← Lógica de la app y datos de empresas
└── README.md        ← Este archivo
```

## Secciones actuales

| Sección | Estado |
|---|---|
| **Inicio** | Estado del proyecto + equipo del viaje |
| **Agenda** | Cronograma Beijing (22-23 jun) y Shenzhen (24-26 jun) |
| **Empresas** | Fichas de contacto (vacías hasta confirmar agenda B2B) |
| **Objetivos** | EPS Joint Venture + Distribución Robótica Europa |
| **Contactos** | PIN, ICEX, CCPIT, equipo Lizarte |

## Cómo añadir empresas

Editar el array `COMPANIES` en `app.js`:

```javascript
const COMPANIES = [
  {
    id:          'id-unico',
    name:        'Nombre de la empresa',
    nameZh:      '中文名称',          // opcional
    type:        'eps',               // 'eps' | 'robotica' | 'otro'
    city:        'shenzhen',          // 'beijing' | 'shenzhen'
    sector:      'Descripción sector',
    yearsActive: 20,
    contact: {
      name:  'Nombre del responsable',
      role:  'Cargo',
      email: 'email@empresa.com',     // opcional
      phone: '+86 xxx xxx xxxx'       // opcional
    },
    meeting: {
      date:     '2026-06-25',
      time:     '10:00',
      location: 'Nombre del lugar / dirección'
    },
    objective: 'Qué queremos conseguir en esta reunión',
    notes:     'Notas previas de preparación',
    notesPost: ''                     // rellenar después de la visita
  }
];
```

## Despliegue en GitHub Pages

1. Subir el repositorio a GitHub
2. `Settings → Pages → Branch: main / root`
3. URL de acceso móvil: `https://[usuario].github.io/[repo]/`

## Próximos módulos (pendientes)

- [ ] Panel de detalle de empresa (al hacer click en la ficha)
- [ ] Notas post-reunión editables
- [ ] Exportar agenda a PDF
- [ ] Mapa de rutas diarias
- [ ] Módulo de seguimiento post-viaje

## Contexto del proyecto

- **Empresa:** Lizarte S.A. (Pamplona) — 53 años, especialista en remanufactura EPS
- **Apoyo institucional:** PIN (Gobierno de Navarra) + CCPIT
- **Marco:** Memorando Navarra-Longhua, firmado enero 2026
- **Objetivo 1:** Joint Venture remanufactura EPS en China
- **Objetivo 2:** Distribución en Europa de robótica china
