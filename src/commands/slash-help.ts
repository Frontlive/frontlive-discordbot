import { Pagination } from '@discordx/pagination';
import type { CommandInteraction } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import { Discord, MetadataStorage, Slash } from 'discordx';

@Discord()
export class SlashHelp {
  @Slash({
    description: 'Wyświetla wszystkie aktualnie dostępne komendy',
    name: 'help',
  })
  async pages(interaction: CommandInteraction): Promise<void> {
    const commands = MetadataStorage.instance.applicationCommands.map((cmd) => {
      return { description: cmd.description, name: cmd.name };
    });
    const pages = commands.map((cmd, i) => {
      const embed = new EmbedBuilder()
        .setFooter({ text: `Page ${i + 1} of ${commands.length}` })
        .setTitle('**Komendy dostępne na Frontlive**')
        .addFields({ name: 'Nazwa', value: cmd.name })
        .addFields({ name: 'Opis', value: cmd.description });

      return { embeds: [embed] };
    });

    const pagination = new Pagination(interaction, pages);
    await pagination.send();
  }
}
