import { ApplyOptions } from '@sapphire/decorators';
import {
  SubCommandPluginCommand,
  SubCommandPluginCommandOptions,
} from '@sapphire/plugin-subcommands';
import type { Message } from 'discord.js';

@ApplyOptions<SubCommandPluginCommandOptions>({
  name: 'repo',
  description: 'Wysyła link do repozytorium bloga',
})
export class RepoCommand extends SubCommandPluginCommand {
  public async messageRun(message: Message) {
    return message.channel.send('<https://github.com/olafsulich/Frontlive.pl>');
  }
}
