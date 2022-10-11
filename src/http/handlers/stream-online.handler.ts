import { ChannelType, EmbedBuilder } from 'discord.js';
import { bot } from '../../main';
import { env } from '../../config';

const embed = new EmbedBuilder()
  .setAuthor({
    name: 'Frontlive',
    iconURL: 'https://avatars.githubusercontent.com/u/63433131?s=200&v=4',
  })
  .setTitle('Live na Twitchu')
  .setURL('https://www.twitch.tv/frontlivepl')
  .setDescription(
    'Frontlive właśnie odpalił live na twitchu!\n' +
      'https://www.twitch.tv/frontlivepl\n\n' +
      `( <@&${env.TWITCH_NOTIFICATION_ROLE_ID}> )`,
  )
  .setColor(0x6441a5)
  .setTimestamp();

export const streamOnlineHandler = async () => {
  const channel = bot.channels.cache.get(env.TWITCH_NOTIFICATION_CHANNEL_ID);

  if (channel?.type === ChannelType.GuildText) {
    await channel.send({ content: `<@&${env.TWITCH_NOTIFICATION_ROLE_ID}>`, embeds: [embed] });
  }

  return '';
};
