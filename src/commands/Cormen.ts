import { ApplyOptions } from '@sapphire/decorators';
import {
  SubCommandPluginCommand,
  SubCommandPluginCommandOptions,
} from '@sapphire/plugin-subcommands';
import type { Message } from 'discord.js';

@ApplyOptions<SubCommandPluginCommandOptions>({
  name: 'cormen',
  description: 'A command to send the Cormen Book Meme',
})
export class CormenCommand extends SubCommandPluginCommand {
  public async messageRun(message: Message) {
    return message.channel.send({
      files: ['https://i.imgur.com/zircQ5v.png'],
      content: `Cormen to klasyk 😎`,
    });
  }
}
