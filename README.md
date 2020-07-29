Buddy Bot - Supervisor
===
Buddy Bot is slack bot to send reminders to clock in and clock out.
<!-- toc -->
* [Usage](#usage)
* [Environment Variables](#environment-variables)
<!-- tocstop -->
# Usage
## Docker
The easiest way to run buddy-bot is to pull docker image from docker hub.  
```shell
$ docker pull scottjr632/supervisor-slack-bot
```
Run with `node-cron`
```shell
$ docker run -e SLACK_TOKEN={SLACK_TOKEN} scottjr632/supervisor-slack-bot
```
Run `clock-out`
```shell
$ docker run -e SLACK_TOKEN={SLACK_TOKEN} scottjr632/supervisor-slack-bot clock-out
```
Run with `clock-in`
```shell
$ docker run -e SLACK_TOKEN={SLACK_TOKEN} scottjr632/supervisor-slack-bot clock-in
```
## From source
```shell
$ git clone ...
$ yarn
$ yarn start:dev        # to run with `node-cron`
$ node clock-in:dev     # to run clock-in
$ node clock-out:dev    # to run clock-out
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
CHANNEL_ID={channel id} # default -> budy-bot-test
```