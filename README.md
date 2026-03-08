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

## Despliegue en Replit
1. Crea un nuevo **Repl** e importa tu repositorio de GitHub.
2. En la pestaña **Secrets** (icono de candado), añade:
   - `DISCORD_TOKEN`: Tu token de bot.
3. El bot iniciará automáticamente un servidor web en el puerto 3000.
4. Para mantenerlo activo 24/7 (si no usas Replit Hacker):
   - Usa un servicio externo como [UptimeRobot](https://uptimerobot.com/).
   - Crea un monitor HTTP que apunte a la URL de tu Repl (ej. `https://nombre-del-repl.usuario.repl.co`).

## Créditos
Desarrollado con `discord.js`, `distube` y `express`.
