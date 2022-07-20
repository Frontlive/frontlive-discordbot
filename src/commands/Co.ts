import { ApplyOptions } from '@sapphire/decorators';
import {
  SubCommandPluginCommand,
  SubCommandPluginCommandOptions,
} from '@sapphire/plugin-subcommands';
import type { Message } from 'discord.js';

@ApplyOptions<SubCommandPluginCommandOptions>({
  name: 'co',
  description: 'Wysyła mema: CO XDDDD',
})
export class CoCommand extends SubCommandPluginCommand {
  public async messageRun(message: Message) {
    return message.channel.send('https://i.imgur.com/Jhng0EF.png');
  }
}
