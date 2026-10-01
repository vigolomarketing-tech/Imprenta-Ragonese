# Imprenta Ragonese — Sitio web

Sitio de una sola página para **Imprenta Ragonese** (Imprenta · Gráfica), Davel 1260, Longchamps.
HTML + CSS + JavaScript vanilla, sin frameworks ni build. Se abre con doble clic en `index.html` o se sube tal cual a cualquier hosting estático (Netlify, Vercel, GitHub Pages, Hostinger, etc.).

## Estructura

```
index.html   → esqueleto de la página + etiquetas SEO / Open Graph
styles.css   → todo el diseño (mobile-first)
app.js       → arma la página desde data.js + interacciones
data.js      → TODO el contenido editable (objeto CONFIG)
img/         → logo, favicon, imagen para compartir y placeholders
```

## Cómo editar contenido

Todo está en `data.js`: datos del negocio, horarios, productos, medidas de calendarios, galería, textos y mensajes de WhatsApp. No hace falta tocar el HTML.

- **Horarios**: `CONFIG.horarios` (se usa para el indicador "Abierto ahora / Cerrado", calculado en hora Argentina) y `CONFIG.horariosTexto` (lo que se muestra en la tabla).
- **Cuenta regresiva de calendarios**: `CONFIG.calendarios.fechaObjetivo`. Cuando la fecha pasa, el contador se oculta solo.
- **Productos**: `CONFIG.productos.lista`. Las `variantes` y `cantidades` de cada producto alimentan el cotizador.
- **Galería**: `CONFIG.galeria.items` (título, categoría e imagen).

## Qué reemplazar antes de publicar

| Archivo | Qué es | Reemplazar por |
|---|---|---|
| `img/logo.svg` | Logo placeholder (la "R") | Logo real en SVG o PNG cuadrado con fondo transparente. Si cambia la extensión, actualizar `CONFIG.negocio.logo`. |
| `img/favicon.svg`, `img/favicon-32.png`, `img/apple-touch-icon.png` (180×180) | Ícono de la pestaña / acceso directo | Versiones del logo real. |
| `img/og-image.jpg` (1200×630) | Imagen que aparece al compartir el link por WhatsApp / redes | Foto o arte real con el logo. |
| `img/calendarios/*.svg` | Los 3 modelos de almanaque | Fotos reales de cada modelo (4:3, ~1200×900). |
| `img/productos/*.svg` | Las 9 tarjetas de productos | Fotos reales (4:3, ~1200×900). |
| `img/colegios/colegios.svg` | Imagen del bloque "Para colegios" | Foto de cuadernos / diplomas (cuadrada, ~1000×1000). |
| `img/galeria/*.svg` | 12 trabajos de ejemplo con negocios **inventados** | Fotos reales de trabajos (cuadradas, ~1080×1080, como en Instagram) con permiso del cliente. |
| `img/hero/*.svg` | Collage flotante del inicio | Recortes PNG con fondo transparente de productos reales (opcional; los mockups también funcionan). |

Al cambiar una foto, si cambia el nombre o la extensión (por ejemplo `.svg` → `.jpg`), actualizá la ruta en `data.js`. Recomendado: `.jpg` o `.webp` comprimidas (menos de 200 KB cada una).

## Al publicar con dominio

1. En `index.html`, cambiar `og:image` por la URL absoluta (`https://tudominio.com.ar/img/og-image.jpg`) y `canonical` por la URL del sitio. WhatsApp necesita la URL absoluta para mostrar la vista previa.
2. En `data.js`, completar `CONFIG.negocio.sitioUrl` (se usa en los datos estructurados de Google).
3. Opcional: completar `CONFIG.footer.creditoUrl` con el link del estudio.

## Notas

- Los pedidos se toman solo por WhatsApp: todos los botones abren `wa.me/5491139460942` con un mensaje prearmado según lo que tocó el cliente.
- Los datos estructurados `schema.org/LocalBusiness` (dirección, horarios, teléfonos) se generan desde `data.js`.
- Respeta `prefers-reduced-motion` (sin animaciones para quien las tenga desactivadas).

---
Sitio desarrollado por Vigolo Web Studio.
