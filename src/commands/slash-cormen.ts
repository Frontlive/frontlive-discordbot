import { Discord, Slash } from "discordx";
import { CommandInteraction } from "discord.js";
@Discord()
export class SlashCormen {
  @Slash({ description: "Komenda do wysłania mema: Cormen", name: "cormen" })
  async what(interaction: CommandInteraction): Promise<void> {
    try {
      await interaction.reply({
        files: ["https://i.imgur.com/zircQ5v.png"],
        content: `Cormen to klasyk 😎`,
      });
    } catch (e) {
      await interaction.reply(
        "Coś poszło nie tak. Admini pracują nad rozwiązaniem problemu!"
      );
    }
  }
}
