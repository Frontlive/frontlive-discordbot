import { ApplyOptions } from '@sapphire/decorators';
import {
  SubCommandPluginCommand,
  SubCommandPluginCommandOptions,
} from '@sapphire/plugin-subcommands';
import type { Message } from 'discord.js';

@ApplyOptions<SubCommandPluginCommandOptions>({
  name: 'gryffindor',
  description: 'Wysyła mema: Gryffindor!',
})
export class GryffindorCommand extends SubCommandPluginCommand {
  public async messageRun(message: Message) {
    return message.channel.send(
      'https://tenor.com/view/mcgonagall-clapping-10points-for-gryffindor-gif-10684186',
    );
  }
}
