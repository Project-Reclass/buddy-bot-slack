import defaultConfig from '../default-config.json';

import { Config, ConfigFile } from './types';

export function loadConfigFile(): ConfigFile {
  return defaultConfig;
}

export function loadConfig(channelId: string): Config | null {
  const configFile = loadConfigFile();
  for (let config of configFile) {
    if (config.channelId === channelId) {
      return config;
    }
  }
  return null;
}
