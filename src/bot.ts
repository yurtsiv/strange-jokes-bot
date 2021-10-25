import Telegraf from 'telegraf';

import regularWords from './words/regular';
import apikoWords from './words/apiko';
import polskaWords from './words/polska';

const bot = new Telegraf(process.env.BOT_TOKEN);

console.log('Listenting');

const pickRandomElem = arr =>
  arr[Math.floor(Math.random() * arr.length)];

const generateJoke = (words) =>
  words.map(pickRandomElem).join(' ');

const sendJokeWith = words => ({ reply }) => reply(generateJoke(words));

bot.command('/regular_joke', sendJokeWith(regularWords));
bot.command('/apiko_joke', sendJokeWith(apikoWords));
bot.command('/polska_joke', sendJokeWith(polskaWords));

bot.launch()
