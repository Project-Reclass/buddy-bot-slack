export interface BaseOptions {
  channel: string;
  parse?: 'full' | 'none';
  username?: string;
  icon_emoji?: string;
  [key: string]: any;
}

export interface JobConfig {
  cronTime: string;
  text: string;
}

export interface Config {
  username: string;
  emojiIcon: string;
  timezone: string;
  channelId: string;
  clockIn: JobConfig;
  clockOut: JobConfig;
}

export type ConfigFile = Config[];