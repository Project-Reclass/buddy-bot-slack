
export interface AuthTestResponse {
  ok: boolean;
  url?: string;
  team?: string;
  user?: string;
  team_id?: string;
  user_id?: string;
  bot_id?: string;
  is_enterprise_install?: boolean;
  response_metadata?: {
    scopes: string[];
  }
}

export type Config = Channel[];

export interface Channel {
  timezone: string;
  username: string;
  emojiIcon: string;
  channelId: string;
  jobs: Job[];
}

export interface Job {
  cronTime: string;
  text: string;
}