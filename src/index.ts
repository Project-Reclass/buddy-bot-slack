import { WebClient } from '@slack/web-api';
import { CronJob } from 'cron';
import dotenv from 'dotenv';
dotenv.config();

import { BaseOptions } from './types';

const CHANNEL_ID = process.env.CHANNEL || 'budy-bot-test';
const TIME_ZONE = process.env.TIMEZONE || 'America/New_York';

const web = new WebClient(process.env.SLACK_TOKEN);

const baseOptions: BaseOptions = {
  channel: CHANNEL_ID,
  parse: 'full',
  username: 'Buddy Bot',
  icon_emoji: ':sunglasses:',
};

function log(msg: string) {
  console.info(`Time: ${new Date().toDateString()} ${msg}`);
}

function error(error: string) {
  console.error(`Time: ${new Date().toDateString()} ${error}`);
}

async function postClockInReminder() {
  const res = await web.chat.postMessage({
    ...baseOptions,
    text: '@channel Don\'t forget to clock in! :powerup:',
  });

  if (res.error)
    error(res.error);
  else
    log('Sent check-in reminder!');
}

async function postClockOutReminder() {
  const res = await web.chat.postMessage({
    ...baseOptions,
    text: '@channel Don\'t forget to clock out! :clockout:',
  });

  if (res.error)
    error(res.error);
  else
    log('Sent check-in reminder!');
}

function runAllJobsCron() {
  // register clock-in for M-W at 1pm EST
  const clockIn = new CronJob('00 00 13 * * 1-3', () => {
    postClockInReminder();
  }, null, true, TIME_ZONE);

  // register clock-out for M-W at 6pm EST
  const clockOut = new CronJob('00 00 19 * * 1-3', () => {
    postClockOutReminder();
  }, null, true, TIME_ZONE);

  console.info('Starting jobs clock-in and clock-out jobs...');
  clockIn.start();
  clockOut.start();
};

const cmds = new Map<string, () => any>();
cmds.set('--all', runAllJobsCron);
cmds.set('--clock-in', postClockInReminder);
cmds.set('--clock-out', postClockOutReminder);


(async () => {

  const fn = cmds.get(process.argv[2]) || runAllJobsCron;
  await fn();
  console.info('Finished script');

})();