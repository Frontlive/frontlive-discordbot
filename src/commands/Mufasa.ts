import { ApplyOptions } from '@sapphire/decorators';
import {
  SubCommandPluginCommand,
  SubCommandPluginCommandOptions,
} from '@sapphire/plugin-subcommands';
import type { Message } from 'discord.js';

@ApplyOptions<SubCommandPluginCommandOptions>({
  name: 'mufasa',
  description: 'Wysyła tańczącego mufase',
})
export class MufasaCommand extends SubCommandPluginCommand {
  public async messageRun(message: Message) {
    return message.channel.send('https://tenor.com/view/friday-day-mufasa-gif-21734518');
  }
}
