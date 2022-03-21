import { ApplyOptions } from '@sapphire/decorators';
import {
  SubCommandPluginCommand,
  SubCommandPluginCommandOptions,
} from '@sapphire/plugin-subcommands';
import type { Message } from 'discord.js';

@ApplyOptions<SubCommandPluginCommandOptions>({
  name: 'co',
  description: 'A command to send the CO XDDDD meme',
})
export class CoCommand extends SubCommandPluginCommand {
  public async messageRun(message: Message) {
    return message.channel.send({
      files: ['https://i.imgur.com/Jhng0EF.png'],
      content: '',
    });
  }
}
