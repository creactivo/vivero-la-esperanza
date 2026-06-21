# 🌿 Sistema de Diseño - Esperanza Vivero

Este documento describe el sistema de diseño unificado para el proyecto Tienda Esperanza.

## 📁 Estructura de Archivos

```
src/styles/
├── global.css        # Tokens, reset, y utilidades globales
└── DESIGN_SYSTEM.md  # Esta documentación
```

## 🎨 Paleta de Colores

### Colores Principales
| Variable | Valor | Uso |
|----------|-------|-----|
| `--color-primary` | `#3A5A40` | Botones, textos destacados, encabezados |
| `--color-primary-dark` | `#29422f` | Hover de botones, footer |
| `--color-primary-light` | `#A3B18A` | Acentos suaves, backgrounds secundarios |
| `--color-secondary` | `#588157` | Elementos secundarios, badges |

### Colores de Acento
| Variable | Valor | Uso |
|----------|-------|-----|
| `--color-accent` | `#DAD7CD` | Fondos cálidos, separadores |
| `--color-accent-green` | `#00FF85` | Badges "NUEVO", rating hearts |
| `--color-accent-teal` | `#00975d` | Links hover, estados activos |

### Colores de Fondo
| Variable | Valor | Uso |
|----------|-------|-----|
| `--color-background` | `#F8FBF3` | Fondo principal de la página |
| `--color-surface` | `#F9F9F9` | Cards, inputs, áreas elevadas |
| `--color-surface-hover` | `#f0f4f0` | Estados hover de superficies |

### Colores de Texto
| Variable | Valor | Uso |
|----------|-------|-----|
| `--color-text` | `#333333` | Texto principal |
| `--color-text-light` | `#666666` | Texto secundario, descripciones |
| `--color-text-muted` | `#999999` | Placeholders, texto terciario |
| `--color-text-inverse` | `#FFFFFF` | Texto sobre fondos oscuros |

### Colores de Estado
| Variable | Valor | Uso |
|----------|-------|-----|
| `--color-success` | `#22c55e` | Mensajes de éxito |
| `--color-warning` | `#f59e0b` | Advertencias |
| `--color-error` | `#ef4444` | Errores, validación |
| `--color-info` | `#3b82f6` | Información |

---

## 🔤 Tipografía

### Fuentes
- **Display (Títulos)**: `'Plus Jakarta Sans'` - Moderna, limpia
- **Main (Cuerpo)**: `'Heebo'` - Legible, versátil

### Tamaños de Fuente
| Clase | Variable | Tamaño |
|-------|----------|--------|
| `.body-xs` | `--text-xs` | 0.75rem (12px) |
| `.body-sm` | `--text-sm` | 0.875rem (14px) |
| `.body-md` | `--text-base` | 1rem (16px) |
| `.body-lg` | `--text-lg` | 1.125rem (18px) |
| `.heading-sm` | `--text-2xl` | 1.5rem (24px) |
| `.heading-md` | `--text-3xl` | 1.875rem (30px) |
| `.heading-lg` | `--text-4xl` | 2.25rem (36px) |
| `.heading-xl` | `--text-5xl` | 3rem (48px) |

### Pesos de Fuente
| Clase | Variable | Peso |
|-------|----------|------|
| `.font-light` | `--font-light` | 300 |
| `.font-normal` | `--font-normal` | 400 |
| `.font-medium` | `--font-medium` | 500 |
| `.font-semibold` | `--font-semibold` | 600 |
| `.font-bold` | `--font-bold` | 700 |

---

## 📐 Espaciado

### Escala de Espaciado
| Variable | Valor | Uso |
|----------|-------|-----|
| `--space-1` | 0.25rem (4px) | Espaciado mínimo |
| `--space-2` | 0.5rem (8px) | Gaps pequeños |
| `--space-3` | 0.75rem (12px) | Padding de botones |
| `--space-4` | 1rem (16px) | Espaciado estándar |
| `--space-6` | 1.5rem (24px) | Separación de secciones |
| `--space-8` | 2rem (32px) | Padding de cards |
| `--space-12` | 3rem (48px) | Márgenes de secciones |
| `--space-16` | 4rem (64px) | Separación grande |
| `--space-20` | 5rem (80px) | Padding de hero |

### Clases de Espaciado
```css
/* Margin */
.m-{0-8}     /* margin: var(--space-X) */
.mt-{0-12}   /* margin-top */
.mb-{0-12}   /* margin-bottom */
.mx-auto     /* margin-inline: auto */
.my-{4-8}    /* margin-block */

/* Padding */
.p-{0-8}     /* padding: var(--space-X) */
.px-{4-6}    /* padding-inline */
.py-{4-20}   /* padding-block */

/* Gap */
.gap-{0-12}  /* gap: var(--space-X) */
```

---

## 🔲 Bordes y Sombras

### Border Radius
| Variable | Valor | Uso |
|----------|-------|-----|
| `--radius-sm` | 4px | Inputs, badges pequeños |
| `--radius-md` | 8px | Botones, cards |
| `--radius-lg` | 16px | Cards grandes |
| `--radius-xl` | 24px | Modales |
| `--radius-full` | 9999px | Buttons pill, avatares |

### Sombras
| Variable | Uso |
|----------|-----|
| `--shadow-xs` | Elevación mínima |
| `--shadow-sm` | Cards en reposo |
| `--shadow-md` | Cards hover, dropdowns |
| `--shadow-lg` | Modales, elementos flotantes |
| `--shadow-xl` | Pop-ups prominentes |
| `--shadow-primary` | Elementos con marca |
| `--shadow-accent` | Hover con glow verde |

---

## 🎯 Componentes Base

### Botones
```html
<!-- Primario -->
<button class="btn btn-primary">Acción Principal</button>

<!-- Secundario -->
<button class="btn btn-secondary">Secundario</button>

<!-- Outline -->
<button class="btn btn-outline">Con Borde</button>

<!-- Ghost -->
<button class="btn btn-ghost">Solo Texto</button>

<!-- Tamaños -->
<button class="btn btn-primary btn-sm">Pequeño</button>
<button class="btn btn-primary btn-lg">Grande</button>

<!-- Full width -->
<button class="btn btn-primary btn-full">Ancho Completo</button>

<!-- Pill -->
<button class="btn btn-primary btn-pill">Redondeado</button>
```

### Cards
```html
<div class="card">
  <!-- Contenido de la card -->
</div>

<div class="card card-elevated">
  <!-- Card con sombra y efecto hover -->
</div>
```

### Badges
```html
<span class="badge badge-primary">Premium</span>
<span class="badge badge-accent">NUEVO</span>
<span class="badge badge-outline">En Stock</span>
```

---

## 📱 Layout y Flexbox

### Contenedor
```html
<div class="container">
  <!-- Contenido centrado con max-width -->
</div>
```

### Flexbox
```html
<div class="flex items-center justify-between gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div class="flex flex-col gap-6">
  <div>Fila 1</div>
  <div>Fila 2</div>
</div>
```

### Grid
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
  <div>Card 4</div>
</div>
```

---

## ✨ Animaciones

### Clases de Animación
```html
<!-- Fade -->
<div class="animate-fade-in">Aparece con fade</div>
<div class="animate-fade-in-up">Fade desde abajo</div>
<div class="animate-fade-in-down">Fade desde arriba</div>

<!-- Slide -->
<div class="animate-slide-in-left">Desde la izquierda</div>
<div class="animate-slide-in-right">Desde la derecha</div>

<!-- Continuas -->
<div class="animate-pulse">Pulso</div>
<div class="animate-bounce">Rebote</div>
<div class="animate-spin">Giro (para loaders)</div>

<!-- Delay -->
<div class="animate-fade-in delay-200">Con delay</div>
```

### Efectos Hover
```html
<div class="hover-lift">Se eleva al hover</div>
<div class="hover-scale">Escala al hover</div>
<div class="hover-glow">Brilla al hover</div>
```

---

## 📱 Breakpoints Responsive

| Prefijo | Tamaño Mínimo | Uso |
|---------|---------------|-----|
| (sin prefijo) | Móvil first | 0px+ |
| `sm:` | 640px | Tablets pequeñas |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Desktop grande |

### Ejemplo de Uso
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
  <!-- Grid responsive -->
</div>

<div class="hidden md:flex">
  <!-- Solo visible en tablet y desktop -->
</div>
```

---

## 🔧 Variables de Transición

| Variable | Duración | Uso |
|----------|----------|-----|
| `--transition-fast` | 150ms | Inputs, estados rápidos |
| `--transition-base` | 300ms | Botones, cards |
| `--transition-slow` | 500ms | Modales, elementos grandes |
| `--transition-bounce` | 300ms | Efectos con rebote |

---

## 🎯 Z-Index

| Variable | Valor | Uso |
|----------|-------|-----|
| `--z-dropdown` | 100 | Menús dropdown |
| `--z-sticky` | 500 | Headers sticky |
| `--z-fixed` | 1000 | Headers fixed |
| `--z-modal-backdrop` | 1500 | Overlay de modales |
| `--z-modal` | 2000 | Contenido de modales |
| `--z-tooltip` | 2500 | Tooltips |

---

## 📋 Checklist de Uso

Al crear un nuevo componente:

- [ ] Usar variables CSS en lugar de valores hardcodeados
- [ ] Aplicar clases utilitarias cuando sea posible
- [ ] Seguir la escala de espaciado definida
- [ ] Usar las fuentes y tamaños del sistema
- [ ] Implementar estados hover/focus consistentes
- [ ] Considerar responsive design con los breakpoints
- [ ] Usar las transiciones y animaciones del sistema

---

## 🌱 Actualizado

Última actualización: Diciembre 2024
