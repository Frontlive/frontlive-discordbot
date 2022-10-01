import { Discord, Slash } from 'discordx';
import { CommandInteraction } from 'discord.js';
@Discord()
export class SlashGryffindor {
  @Slash({ description: 'Komenda do wysłania mema: Gryffindor', name: 'gryffindor' })
  async what(interaction: CommandInteraction): Promise<void> {
    try {
      await interaction.reply(
        'https://tenor.com/view/mcgonagall-clapping-10points-for-gryffindor-gif-10684186',
      );
    } catch (e) {
      await interaction.reply('Coś poszło nie tak. Admini pracują nad rozwiązaniem problemu!');
    }
  }
}
