import { ApplyOptions } from '@sapphire/decorators';
import type { SubCommandPluginCommandOptions } from '@sapphire/plugin-subcommands';
import { SubCommandPluginCommand } from '@sapphire/plugin-subcommands';
import type { Message } from 'discord.js';

@ApplyOptions<SubCommandPluginCommandOptions>({
  name: 'help',
  description: 'Wyświetla listę wszystkich dostępnych komend',
})
export class HelpCommand extends SubCommandPluginCommand {
  public async messageRun(message: Message) {
    const { client } = this.container;
    const commandsNameAndDescription = client.stores
      .get('commands')
      .map((command) => {
        return {
          name: command.name,
          description: command.description,
        };
      })
      .reduce((acc, cur) => {
        const command = `
${cur.name} — ${cur.description}
      `;
        return acc + command;
      }, '');
    return message.channel.send(commandsNameAndDescription);
  }
}
