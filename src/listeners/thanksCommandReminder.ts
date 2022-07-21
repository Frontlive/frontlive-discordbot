import { Listener, SapphireClient } from '@sapphire/framework';
import type { Message } from 'discord.js';

const TECHNOLOGY_CHANNEL_ID = '878973710382530601';
const BOT_CHANNEL_ID = '943116275494838303';

export class ThanksCommandReminder extends Listener {
  private readonly client: SapphireClient;
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      event: 'messageCreate',
    });
    this.client = this.container.client;
  }

  public async run(message: Message) {
    if (message.author.bot) return;
    const messageContent = message.content.toLowerCase();
    if (!message.content.includes('!dzieki') && !messageContent.includes('!dzięki')) {
      if (messageContent.includes('dzieki') || messageContent.includes('dzięki')) {
        const channel = await this.client.channels.fetch(message.channelId);
        //@ts-ignore another shitty type from sapphire creators
        const isChannelParentCategoryTechnology = channel.parentId === TECHNOLOGY_CHANNEL_ID;
        if (isChannelParentCategoryTechnology || message.channelId === BOT_CHANNEL_ID) {
          message.channel.send(
            `<@${message.author.id}> Nie zapomnij podziękować za pomocą !dzieki. Jako pierwszy argument oznacz użytkownika, któremu dziękujesz, a jako drugi jeżeli chcesz, wiadomość za co mu dziekujesz`,
          );
        }
      }
    }
  }
}
