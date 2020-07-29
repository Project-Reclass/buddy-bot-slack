import { WebClient } from '@slack/web-api';
import { CronJob } from 'cron';
import dotenv from 'dotenv';

const CHANNEL_ID = 'ccasdf';
const TIME_ZONE = 'America/New_York';

if (process.env.NODE_ENV === 'development') {
    dotenv.config();
}

const web = new WebClient(process.env.SLACK_TOKEN);

function log(msg: string) {
    console.info(`Time: ${new Date().toDateString()} ${msg}`)
}

function error(error: string) {
    console.error(`Time: ${new Date().toDateString()} ${error}`)
}

async function postClockInReminder() {
    const res = await web.chat.postMessage({
        channel: CHANNEL_ID,
        text: `@channel Don't forget to clock in! :powerup:`,
    });
    
    if (res.error)
        error(res.error);
    log('Sent check-in reminder!');
}

async function postClockOutReminder() {
    const res = await web.chat.postMessage({
        channel: CHANNEL_ID,
        text: `@channel Don't forget to clock out! :clockout:`
    });

    if (res.error)
        error(res.error);
    log('Sent check-in reminder!');
}

(() => {
    
    // register clock-in for M-W at 1pm EST
    const clockIn = new CronJob('00 00 13 * * 1-3', () => {
        postClockInReminder();
    }, null, true, TIME_ZONE);

    // register clock-out for M-W at 6pm EST
    const clockOut = new CronJob('00 00 19 * * 1-3', () => {
        postClockOutReminder();
    }, null, true, TIME_ZONE);

    console.info('Starting jobs...')
    clockIn.start();
    clockOut.start()

})();