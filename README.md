# Strange jokes bot

Bot username: `@StrangeJokesBot`

A Telegram bot for generating very strange jokes in Ukrainian

# Commands

`/regular_joke` - generate a standart (but strange) joke

`/apiko_joke` - generate Apiko-specific joke (sometimes funny, but only for folks from [Apiko](https://apiko.com/))

# Running

* `docker pull stepy/strange-jokes-bot`
* `docker run -d --env-file .env --publish 8002:8080 stepy/strange-jokes-bot`

`.env` file:

```
BOT_TOKEN=<token>
```