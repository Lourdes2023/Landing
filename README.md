# Landing Page - Cochería García

🎯 **Landing page profesional para servicios fúnebres** con carrusel de imágenes, animaciones y diseño modular.

## 📁 Estructura del Proyecto

```
Landing-Cocheria-Garcia/
├── index.html          # Página principal (HTML limpio)
├── css/
│   └── styles.css      # Todos los estilos CSS
├── js/
│   └── main.js         # Interactividad y animaciones JavaScript
├── images/             # Carpeta para imágenes
│   ├── hero-1.jpg      # Imagen 1 del carrusel (AGREGAR)
│   ├── hero-2.jpg      # Imagen 2 del carrusel (AGREGAR)
│   ├── hero-3.jpg      # Imagen 3 del carrusel (AGREGAR)
│   ├── og-image.jpg    # Imagen para redes sociales (AGREGAR)
│   └── logo-garcia.jpg # Logo de la empresa (Ya debe estar en raíz)
└── logo-garcia.jpg     # Logo en la raíz
```

## ✅ Configuración Inicial

### 1. **Agregar Imágenes del Carrusel**

Necesitás colocar **3 imágenes** en la carpeta `images/` con los siguientes nombres:

- `hero-1.jpg` - Imagen principal (recomendado: 1920x1080px)
- `hero-2.jpg` - Segunda imagen (recomendado: 1920x1080px)
- `hero-3.jpg` - Tercera imagen (recomendado: 1920x1080px)

**Recomendaciones para las imágenes:**
- Tamaño: 1920x1080px o superior
- Formato: JPG (optimizado para web)
- Peso: Máximo 500KB por imagen (usar compresión)
- Contenido: Imágenes profesionales, respetuosas y acordes al servicio

**Herramientas para optimizar imágenes:**
- [TinyPNG](https://tinypng.com/) - Compresión de imágenes
- [Squoosh](https://squoosh.app/) - Optimización avanzada

### 2. **Actualizar Información de Contacto**

Abrí `index.html` y reemplazá los siguientes datos:

**WhatsApp:** Busca `https://wa.me/549XXXXXXXXXX` y cambialo por tu número real:
```html
<!-- Ejemplo: -->
<a href="https://wa.me/5491123456789" ...>
```

**Teléfono:** Busca `tel:+54XXXXXXXXXX` y cambialo por tu número:
```html
<!-- Ejemplo: -->
<a href="tel:+541147001234">Llamar</a>
```

**Google Maps:** Busca `https://www.google.com/maps` y reemplazalo con tu link de ubicación.

### 3. **Logo de la Empresa**

Asegurate de tener el archivo `logo-garcia.jpg` en la raíz del proyecto.

## 🚀 Características Implementadas

### ✨ Diseño y UI
- ✅ Carrusel automático de imágenes en el hero (cambia cada 5 segundos)
- ✅ Overlay oscuro sobre las imágenes para mejor legibilidad
- ✅ Diseño responsivo (móvil, tablet, desktop)
- ✅ Paleta de colores verde elegante
- ✅ Animaciones suaves al hacer scroll

### 🎭 Interactividad
- ✅ Navegación fija que se oculta al bajar y aparece al subir
- ✅ Navegación activa según la sección visible
- ✅ Smooth scroll al hacer clic en el menú
- ✅ Botón "Volver arriba" que aparece al hacer scroll
- ✅ Hover effects en botones y tarjetas
- ✅ Carrusel con indicadores clicables

### ⚡ Performance
- ✅ CSS y JavaScript en archivos separados
- ✅ Lazy loading de imágenes
- ✅ Código optimizado y comentado
- ✅ Intersection Observer para animaciones eficientes

## 🎨 Personalización

### Cambiar colores

Editá `css/styles.css` en la sección `:root`:

```css
:root {
  --green-900: #0f2a18;  /* Verde oscuro */
  --green-800: #163a22;  /* Verde medio */
  --green-700: #1f4d2e;  /* Verde principal */
  --green-600: #2c6a3f;  /* Verde claro */
}
```

### Modificar velocidad del carrusel

Editá `js/main.js` en la línea 6:

```javascript
const CONFIG = {
  carouselInterval: 5000,  // Cambiar a milisegundos (5000 = 5 segundos)
};
```

### Agregar más imágenes al carrusel

1. Agrega la imagen en la carpeta `images/`
2. En `index.html`, dentro de `.hero-carousel`, agrega:

```html
<div class="carousel-slide">
  <img src="images/hero-4.jpg" alt="Descripción" />
</div>
```

3. Agrega un indicador en `.carousel-indicators`:

```html
<div class="carousel-indicator"></div>
```

## 🎥 Opción: Video de Fondo

Si querés usar un video en lugar de imágenes, descomenta este código en `index.html`:

```html
<div class="carousel-slide">
  <video autoplay muted loop playsinline>
    <source src="images/hero-video.mp4" type="video/mp4" />
  </video>
</div>
```

Y agrega tu video en `images/hero-video.mp4`.

## 📱 Redes Sociales (Open Graph)

La página está configurada para verse bien al compartir en redes sociales. 

**Para activarlo:**
1. Crea una imagen `og-image.jpg` (1200x630px recomendado)
2. Colócala en la carpeta `images/`
3. Ya está configurada en el `<head>` del HTML

## 🌐 Publicación

### Opción 1: Hosting Gratuito
- [GitHub Pages](https://pages.github.com/) - Gratis, ideal para sitios estáticos
- [Netlify](https://www.netlify.com/) - Deploy automático desde GitHub
- [Vercel](https://vercel.com/) - Rápido y fácil

### Opción 2: Hosting Tradicional
1. Subí todos los archivos vía FTP
2. Mantené la estructura de carpetas
3. Asegurate que `index.html` esté en la raíz

## 🛠️ Soporte para Navegadores

- ✅ Chrome / Edge (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (últimas versiones)
- ✅ Dispositivos móviles (iOS y Android)

## 📝 Próximos Pasos Sugeridos

1. **Agregar formulario de contacto** (usando FormSpree o EmailJS)
2. **Integrar Google Analytics** para estadísticas
3. **Optimizar SEO** (keywords, meta descriptions)
4. **Agregar WhatsApp Web widget flotante**
5. **Implementar sistema de testimonios**

## 💡 Notas Importantes

- **No olvides reemplazar los números de teléfono** en `index.html`
- **Agrega las 3 imágenes del carrusel** antes de publicar
- **Optimiza las imágenes** para que la página cargue rápido
- **Prueba en diferentes dispositivos** antes de publicar

## 🆘 ¿Problemas?

Si algo no funciona:
1. Abrí la consola del navegador (F12)
2. Verifica que todas las rutas sean correctas
3. Asegurate de que los archivos CSS y JS se carguen

---

**Creado para Cochería García** 🌿  
_Landing page profesional y moderna para servicios fúnebres_
