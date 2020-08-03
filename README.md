Buddy Bot - Supervisor
===
Buddy Bot is slack bot to send reminders to in a slack channel!
<!-- toc -->
* [Usage](#usage)
    * [Adding Channels](#adding-a-channel)
    * [Adding Messages](#adding-messages)
    * [Defining Time](#defining-times)
* [Developer Usage](#developer-usage)
    * [Docker](#docker)
    * [From Source](#from-source)
    * [Config](#config)
    * [Environment Variables](#environment-variables)
<!-- tocstop -->
# Usage

Buddy Bot is automatically deployed when changes are either pushed or merged with the `master` branch.

## Adding a Channel

If you want to add a channel to Buddy Bot first [fork](https://github.com/Project-Reclass/buddy-bot-slack/edit/master/default-config.json) the `default-config.json`
file and add 
```json
    {
        "timezone": "America/Monterrey",
        "username": "Buddy Bot",
        "emojiIcon": ":sunglasses:",
        "channelId": "{your channel name}", // if a public channel add a `#` in from of the channel name
        "jobs": []
    }
```

After you add your channel to the `default-config.json` create a pull-request that will later be merged in the `master` branch.

**NOTE FOR PRIVATE CHANNELS: If you want to send a reminder in a private channel you will have to add the `supervisor` app to the channel.**

## Adding messages

After you have created the channel, you can add messages to be sent. You can add messages by adding a JSON object to the `job` array.

`cronTime` represents the time of day that you want the message to be sent in the channel. `cronTime` uses cron notation to define the time. 
See [Defining Times](#defining-times) below for more information.

A complete channel with jobs can be seen below.
```json
    {
        "timezone": "America/New_York",
        "username": "Buddy Bot",
        "emojiIcon": ":sunglasses:",
        "channelId": "2020-team-voltron",
        "jobs": [
            {
                "cronTime": "00 00 13 * * 1-3",
                "text": "@channel Don't forget to clock in! :powerup:"
            },
            {
                "cronTime": "00 00 19 * * 1-3",
                "text": "@channel Don't forget to clock out! :clockout:"
            }
        ]
    },
```

## Defining Times

Jobs reminders are set using cron-time

### Cron Syntax

This is a quick reference to cron syntax and also shows the options supported by node-cron.

#### Allowed fields

```
 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
```

#### Allowed values

|     field    |        value        |
|--------------|---------------------|
|    second    |         0-59        |
|    minute    |         0-59        |
|     hour     |         0-23        |
| day of month |         1-31        |
|     month    |     1-12 (or names) |
|  day of week |     0-7 (or names, 0 or 7 are sunday)  |


# Developer Usage

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

## Config
Configuration is managed by the `config.json` and `default-config.json`.
Each value in the default.

The default values are

```json
[
    {
        "timezone": "America/New_York",
        "username": "Buddy Bot",
        "emojiIcon": ":sunglasses:",
        "channelId": "budy-bot-test",
        "jobs": [
            {
                "cronTime": "00 00 13 * * 1-3",
                "text": "@channel Don't forget to clock in! :powerup:"
            },
            {
                "cronTime": "00 00 19 * * 1-3",
                "text": "@channel Don't forget to clock out! :clockout:"
            },
            ...
        ]
    },
    ...
]
```

Additional jobs can be added in the `default-config.json` file.

## Environment Variables

### Required

```shell
SLACK_TOKEN={token provided from slack}
```
