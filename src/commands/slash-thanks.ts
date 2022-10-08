import type { CommandInteraction, GuildMember } from 'discord.js';
import { ApplicationCommandOptionType, ChannelType } from 'discord.js';
import { Discord, Slash, SlashOption } from 'discordx';
import { env } from '../config';

const commandChannelTarget = env.THANKS_MESSAGE_CHANNEL_TARGET_ID;

@Discord()
export class SlashThanks {
  @Slash({ description: 'Komenda do dziękowania za pomoc', name: 'dzieki' })
  async thanks(
    @SlashOption({
      description: 'Komu dziękujesz?',
      name: 'user',
      required: true,
      type: ApplicationCommandOptionType.User,
    })
    user: GuildMember,
    @SlashOption({
      description: 'Za co dziękujesz? (Opcjonalnie)',
      name: 'treść',
      required: false,
      type: ApplicationCommandOptionType.String,
    })
    thanksMessage: string,
    interaction: CommandInteraction,
  ): Promise<void> {
    try {
      const targetChannel = interaction.guild?.channels.cache.get(commandChannelTarget);
      const messageSource = interaction.channel?.url;
      const author = interaction.member?.user.id;
      const content = prepareFinalMessage({
        userDiscordId: user.id,
        userThanksMessage: thanksMessage,
        messageLink: messageSource || '',
        messageAuthor: author || '',
      });
      if (targetChannel?.type === ChannelType.GuildText) {
        targetChannel.send(content);
        await interaction.reply(`Podziękowałeś użytkownikowi ${user.user.username}!`);
        return;
      }
      await interaction.reply('Zły kanał');
    } catch (e) {
      await interaction.reply('Coś poszło nie tak. Admini pracują nad rozwiązaniem problemu!');
    }
  }
}

interface ThanksMessage {
  userDiscordId: string;
  userThanksMessage: string;
  messageLink: string;
  messageAuthor: string;
}

const prepareFinalMessage = ({
  userThanksMessage,
  userDiscordId,
  messageAuthor,
  messageLink,
}: ThanksMessage) => {
  return userThanksMessage
    ? `
<@${userDiscordId}> Właśnie ci podziękowano! 🎉

<@${messageAuthor}> Cieszy się z waszej współpracy! Link: <${messageLink}>

> ${userThanksMessage}
`
    : `
<@${userDiscordId}> Właśnie ci podziękowano! 🎉

<@${messageAuthor}> Cieszy się z waszej współpracy! Link: <${messageLink}>
`;
};
