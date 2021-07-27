import { WebClient } from '@slack/web-api';
import { CronJob } from 'cron';
import dotenv from 'dotenv';
dotenv.config();

import { BaseOptions, Config } from './types';
import { loadConfigFile } from './config';
import * as utils from './utils';

const configFile = loadConfigFile();

console.info({ config: configFile });

const web = new WebClient(process.env.SLACK_TOKEN);

const buildBaseOptions = (config: Config): BaseOptions => ({
  parse: 'full',
  channel: config.channelId,
  username: config.username,
  icon_emoji: config.emojiIcon,
});

async function sendJobMessage(text: string, baseOptions: BaseOptions) {
  const res = await web.chat.postMessage({
    text,
    ...baseOptions,
  });

  if (res.error)
    utils.error(res.error);
  else
    utils.log(`Successfully send text->\n${text}`);
}

function createJobsForChannelFromConfig(config: Config) {
  const baseOptions = buildBaseOptions(config);
  const { timezone } = config;

  for (let job of config.jobs) {
    new CronJob(job.cronTime, () => {
      sendJobMessage(job.text, baseOptions);
    }, null, true, timezone).start();
  }
}

function runJobForAllChannels() {
  for (let config of configFile) {
    createJobsForChannelFromConfig(config);
  }
}

(async () => {
  const cmds = new Map<string, () => any>();
  cmds.set('--all', runJobForAllChannels);

  const fn = cmds.get(process.argv[2]) || runJobForAllChannels;
  await fn();
  console.info('Finished running jobs...');
})();
