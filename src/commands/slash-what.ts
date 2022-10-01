import { Discord, Slash } from "discordx";
import { CommandInteraction } from "discord.js";
@Discord()
export class SlashWhat {
  @Slash({ description: "Komenda do wysłania mema: COOO!!!!XDD", name: "co" })
  async what(interaction: CommandInteraction): Promise<void> {
    try {
      await interaction.reply("https://i.imgur.com/Jhng0EF.png");
    } catch (e) {
      await interaction.reply(
        "Coś poszło nie tak. Admini pracują nad rozwiązaniem problemu!"
      );
    }
  }
}
