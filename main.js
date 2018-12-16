const TelegramBot = require('node-telegram-bot-api');

const regularWords = require('./words/regular.js');
const apikoWords = require('./words/apiko.js');

const settings = require('./settings.json');

const bot = new TelegramBot(settings.api_token, {polling: true});

const pickRandomElem = arr =>
  arr[Math.floor(Math.random() * arr.length)];

const generateJoke = (words) => {
  const [part1, part2, part3, part4, part5, part6] = words.map(pickRandomElem)
  return `${part1} приходить ${part2} i каже: "${part3}", а ${part4}: "${part5}". ${part6}.`;
}

const sendJokeWith = words => msg =>
  bot.sendMessage(msg.chat.id, generateJoke(words));


bot.onText(/\/regular_joke/, sendJokeWith(regularWords));
bot.onText(/\/apiko_joke/, sendJokeWith(apikoWords));
