import { Discord, Slash } from 'discordx';
import { CommandInteraction } from 'discord.js';
@Discord()
export class SlashRepo {
  @Slash({ description: 'Wysyła link do repo bloga Frontlive.pl', name: 'repo' })
  async what(interaction: CommandInteraction): Promise<void> {
    try {
      await interaction.reply('<https://github.com/olafsulich/Frontlive.pl>');
    } catch (e) {
      await interaction.reply('Coś poszło nie tak. Admini pracują nad rozwiązaniem problemu!');
    }
  }
}
