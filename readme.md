# Set up

## install NOW CLI
```
npm i -g now
```
## Set NOW ENV variables
```
now secrets add jokes_bot_token "bot token"
now secrets add jokes_bot_url "{your_url}/api/bot"
now secrets add jokes_bot_secret_query "some random string"
```
## Deploy to NOW
```
now --prod
```
Then open `{your_url}/api/bot?set-url` to set bot webhook url.
## Run for development
1. Create `.env` file with variables `token`, `url` and `secret_query`.
2. Run `now dev`

Make sure that your app is available from the internet and works through HTTPS. You can use [ngrok](https://ngrok.com/) or [localtunnel](https://localtunnel.me/) for this.

Then open `{your_url}/api/bot?set-url` to set bot webhook url