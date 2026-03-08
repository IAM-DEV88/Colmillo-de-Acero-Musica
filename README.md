# Colmillo de Acero - Música (Discord Bot)

Un bot de música para Discord que soporta Spotify y YouTube, listo para ser desplegado en Heroku.

## Características
- Soporte para enlaces de Spotify (se resuelven automáticamente a YouTube).
- Comandos básicos: `!play`, `!skip`, `!stop`, `!queue`.
- Configuración para Heroku incluida.

## Requisitos
- Node.js (v16 o superior).
- Un bot de Discord creado en el [Discord Developer Portal](https://discord.com/developers/applications).
- FFmpeg instalado (el bot usa `ffmpeg-static` por defecto).

## Instalación Local
1. Clona este repositorio o descarga los archivos.
2. Ejecuta `npm install` para instalar las dependencias.
3. Crea un archivo `.env` basado en `.env.example` y añade tu token de Discord.
4. Ejecuta `node index.js`.

## Comandos
- `!play <nombre o link>`: Reproduce una canción o playlist (Spotify/YouTube).
- `!p <nombre o link>`: Alias de play.
- `!skip`: Salta a la siguiente canción.
- `!stop`: Detiene la música y saca al bot del canal.
- `!leave`: Alias de stop.
- `!queue`: Muestra la cola de reproducción actual.

## Despliegue en Heroku
1. Crea una nueva aplicación en Heroku.
2. Conecta tu repositorio de GitHub o usa el Heroku CLI para subir el código.
3. En la pestaña **Settings** > **Config Vars**, añade:
   - `DISCORD_TOKEN`: Tu token de bot.
4. En la pestaña **Resources**, asegúrate de que el `worker` (especificado en el `Procfile`) esté activado.
5. **Importante**: Asegúrate de añadir el Buildpack de FFmpeg en Heroku:
   - Ve a Settings > Buildpacks.
   - Añade `https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git`.

## Créditos
Desarrollado con `discord.js` y `distube`.
