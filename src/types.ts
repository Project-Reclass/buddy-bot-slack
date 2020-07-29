export interface BaseOptions {
  channel: string;
  parse?: 'full' | 'none';
  username?: string;
  icon_emoji?: string;
  [key: string]: any;
}