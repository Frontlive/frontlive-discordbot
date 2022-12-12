import { dirname, importx } from '@discordx/importer';
import type { Interaction, Message } from 'discord.js';
import { IntentsBitField } from 'discord.js';
import { Client } from 'discordx';
import { env } from './config';
import { createServer } from './http/http-server';
import {
  createSubscription,
  deleteSubscription,
  generateAccessToken,
  getSubscriptions,
} from './services/eventsub.service';

export const bot = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildWebhooks,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildScheduledEvents,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildMessageTyping,
    IntentsBitField.Flags.GuildInvites,
    IntentsBitField.Flags.GuildIntegrations,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    IntentsBitField.Flags.GuildBans,
    IntentsBitField.Flags.DirectMessageTyping,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.DirectMessageReactions,
  ],
  silent: true,
  simpleCommand: {
    prefix: '!',
  },
});

bot.once('ready', async () => {
  await bot.initApplicationCommands();

  console.log('Bot started');
});

bot.on('interactionCreate', (interaction: Interaction) => {
  bot.executeInteraction(interaction);
});

bot.on('messageCreate', (message: Message) => {
  bot.executeCommand(message);
});

const initSubscriptions = async () => {
  await generateAccessToken();
  const { data } = await getSubscriptions();

  await Promise.all(
    data.map(async ({ id }) => {
      await deleteSubscription(id);
    }),
  );

  await createSubscription('stream.online', { broadcaster_user_id: env.TWITCH_USER_ID });
};

async function run() {
  const httpServer = await createServer();

  await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);
  await bot.login(env.DISCORD_TOKEN);
  await httpServer.listen({ host: env.HTTP_HOST, port: env.HTTP_PORT });

  initSubscriptions().catch(console.error);
}

run();
