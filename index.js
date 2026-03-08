require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { YouTubeDLPlugin } = require('@distube/yt-dlp');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.send('Bot is online!'));
app.listen(3000, () => console.log('Server is ready!'));

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin(),
        new YouTubeDLPlugin(),
    ],
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;
    const prefix = '!';
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'play' || command === 'p') {
        const query = args.join(' ');
        if (!query) return message.channel.send('Please provide a song name or link.');

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');

        try {
            await distube.play(voiceChannel, query, {
                message,
                textChannel: message.channel,
                member: message.member,
            });
        } catch (error) {
            console.error(error);
            message.channel.send('An error occurred while trying to play the song.');
        }
    }

    if (command === 'stop' || command === 'leave') {
        distube.stop(message);
        message.channel.send('Stopped the music and left the voice channel.');
    }

    if (command === 'skip') {
        try {
            await distube.skip(message);
            message.channel.send('Skipped the song.');
        } catch (error) {
            message.channel.send('There is no song to skip!');
        }
    }

    if (command === 'queue') {
        const queue = distube.getQueue(message);
        if (!queue) return message.channel.send('The queue is empty.');
        const q = queue.songs
            .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
            .join('\n');
        message.channel.send(`**Queue:**\n${q}`);
    }
});

// DisTube events
distube
    .on('playSong', (queue, song) =>
        queue.textChannel.send(`🎶 | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`)
    )
    .on('addSong', (queue, song) =>
        queue.textChannel.send(`✅ | Added \`${song.name}\` - \`${song.formattedDuration}\` to the queue by ${song.user}`)
    )
    .on('error', (channel, e) => {
        if (channel) channel.send(`❌ | An error encountered: ${e.toString().slice(0, 1974)}`);
        else console.error(e);
    })
    .on('empty', (channel) => channel.send('Voice channel is empty! Leaving the channel...'))
    .on('searchNoResult', (message, query) => message.channel.send(`❌ | No result found for \`${query}\`!`))
    .on('finish', (queue) => queue.textChannel.send('Finished!'));

client.login(process.env.DISCORD_TOKEN);
