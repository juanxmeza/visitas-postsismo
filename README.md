# Visita técnica post-sismo — INICON

Formato de campo para la evaluación rápida de estructuras después de un sismo.
Una sola página, sin dependencias, pensada para usarse **en obra y sin señal**.

**https://visitas.inicon.com.co**

## Qué hace

- Identificación de la estructura, la edificación y el evento.
- Daño **estructural** (columnas, vigas, muros, losas, conexiones, cimentación) y
  **no estructural**, en escala 0–3, con botones de 42 px para usar con una mano.
- Condiciones del sitio y el entorno.
- Fotos desde la cámara, reducidas a 1280 px antes de guardarse.
- **Sugerencia** de habitabilidad (verde / amarillo / rojo) a partir de lo registrado.
- Dictamen, restricciones y recomendaciones.
- Salida por **Copiar JSON** para pasar las visitas al sistema de consulta.

## La sugerencia no es el dictamen

La aplicación ordena lo observado y propone un color. **El dictamen lo emite y lo firma
el profesional que hace la visita**, con su nombre y su matrícula. Ninguna herramienta
sustituye la inspección ni el criterio de un ingeniero en sitio.

## Funciona sin señal

La primera vez que se abre con conexión, el teléfono guarda la aplicación completa
(*service worker*). Después abre igual en modo avión o sin cobertura. La cabecera indica
en cada momento si ya está guardada — conviene comprobarlo **antes** de salir a campo.

En el teléfono: **Compartir → Añadir a pantalla de inicio**, y queda como una app.

## Los datos no viven aquí

Esta página es solo el formulario. Lo que se registra se guarda **en el propio teléfono**
(`localStorage` para los datos, IndexedDB para las fotos) hasta que se pasa al sistema de
consulta, que está protegido con usuario y lista de correos autorizados.

Publicar esta página no expone ninguna visita, ninguna dirección y ningún dictamen.

## Actualizar

`index.html` es la fuente. Editar, *commit*, *push*: GitHub Pages tarda cerca de un minuto.

**Importante:** al publicar cambios hay que subir el número de `CACHE` en `sw.js`
(`visitas-postsismo-v1` → `v2`, …). Sin eso, los teléfonos que ya la tengan guardada
seguirán abriendo la versión anterior indefinidamente.

---

© INICON Ingeniería + Desarrollo S.A.S. Uso interno.
