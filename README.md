Buddy Bot - Supervisor
===
Buddy Bot is slack bot to send reminders to clock in and clock out.
<!-- toc -->
* [Usage](#usage)
* [Config](#config)
* [Environment Variables](#environment-variables)
<!-- tocstop -->
# Usage

## Docker

The easiest way to run buddy-bot is to pull docker image from docker hub.  

```shell
docker pull scottjr632/supervisor-slack-bot
```

Run with `node-cron`

```shell
docker run -e SLACK_TOKEN={SLACK_TOKEN} scottjr632/supervisor-slack-bot
```

Run `clock-out`

```shell
docker run -e SLACK_TOKEN={SLACK_TOKEN} scottjr632/supervisor-slack-bot clock-out
```

Run with `clock-in`
```shell
docker run -e SLACK_TOKEN={SLACK_TOKEN} scottjr632/supervisor-slack-bot clock-in
```
## From source

```shell
git clone ...
$ yarn
$ yarn start:dev        # to run with `node-cron`
$ node clock-in:dev     # to run clock-in
$ node clock-out:dev    # to run clock-out
```

# Config
Configuration is managed by the `config.json` and `default-config.json`.
Each value in the default.

The default values are

```json
{
    "timezone": "America/New_York",
    "username": "Buddy Bot",
    "emojiIcon": ":sunglasses:",
    "channelId": "budy-bot-test",
    "clockIn": {
        "cronTime": "00 00 13 * * 1-3",
        "text": "@channel Don't forget to clock in! :powerup:"
    },
    "clockOut": {
        "cronTime": "00 00 19 * * 1-3",
        "text": "@channel Don't forget to clock out! :clockout:"
    }
}
```

Each one of these values can be changed by mounting a `config.json` to the docker container using

```shell
docker run -v $PWD/config.json:/app/dist/config.json \
    -e SLACK_TOKEN={SLACK TOKEN} \
    scottjr632/supervisor-slack-bot:latest {clock-in|clock-out| blank )
```

Example `config.json`

```json
{
    "clockIn": {
        "text": "This is a custom message!"
    }
}
```

# Environment Variables

## Required

```shell
SLACK_TOKEN={token provided from slack}
```

## Optional

```shell
# The timezone to base node-cron on
# https://momentjs.com/timezone/
TIMEZONE={timezone according to moment} # default -> America/New_York

# The channel id or name
# Add '#' before name for public channels
CHANNEL_ID={channel id} # default -> buddy-bot-test
```
