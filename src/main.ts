import { dirname, importx } from '@discordx/importer';
import type { Interaction, Message } from 'discord.js';
import { IntentsBitField } from 'discord.js';
import { Client } from 'discordx';
import * as dotenv from 'dotenv';
dotenv.config();

export const bot = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildWebhooks,
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

async function run() {
  await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);

  if (!process.env.DISCORD_TOKEN) {
    throw Error('Could not find DISCORD_TOKEN in your environment');
  }

  await bot.login(process.env.DISCORD_TOKEN);
}

run();
