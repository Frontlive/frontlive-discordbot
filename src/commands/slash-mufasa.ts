import { Discord, Slash } from 'discordx';
import { CommandInteraction } from 'discord.js';
@Discord()
export class SlashMufasa {
  @Slash({ description: 'Komenda do wysłania mema: Mufasa', name: 'mufasa' })
  async what(interaction: CommandInteraction): Promise<void> {
    try {
      await interaction.reply('https://tenor.com/view/friday-day-mufasa-gif-21734518');
    } catch (e) {
      await interaction.reply('Coś poszło nie tak. Admini pracują nad rozwiązaniem problemu!');
    }
  }
}
