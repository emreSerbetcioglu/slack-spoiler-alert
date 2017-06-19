# Slack Spoiler Alert App

Slack Spoiler Alert is a basic Slack App that lets you create spoiler alerts with a slash command */spoiler* in your conversations. 

Don't forget to add SLACK_TOKEN to your Heroku Config Variables.


## Demo

![Spoiler alert demo](https://media.giphy.com/media/xUA7aQduSfXvjn4rXq/giphy.gif "Spoiler alert demo")

## Deployment
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Slack Setup

1. Create a new app on your slack dashboard.
2. Generate a verification token for your Slack app. You are going to use it in env variables of your Heroku app.
3. Add a slash command feature and call it whatever you like. I used */spoiler*
* Place your heroku app's url as Request URL
4. Enable interactive messages for your slack app.
* Place your heroku app's url + */callback* as Request URL for the interactive message and save changes.

#### Example
```
https://{your app name}.herokuapp.com/callback
```

You are good to go!
