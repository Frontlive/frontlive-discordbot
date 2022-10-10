import { cleanEnv, host, json, port, str, url } from 'envalid';
import { default as dotenv } from 'dotenv';

dotenv.config();

export const env = cleanEnv(process.env, {
  DISCORD_TOKEN: str(),
  OWNERS: json(),
  THANKS_MESSAGE_CHANNEL_TARGET_ID: str(),
  HTTP_HOST: host(),
  HTTP_PORT: port(),
  TWITCH_CLIENT_ID: str(),
  TWITCH_ACCESS_TOKEN: str(),
  TWITCH_USER_ID: str(),
  TWITCH_NOTIFICATION_CHANNEL_ID: str(),
  EVENTSUB_CALLBACK: url(),
  EVENTSUB_SECRET: str(),
  DATABASE_URL: str(),
});
