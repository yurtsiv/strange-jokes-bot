const Telegraf = require('telegraf');

const regularWords = require('../words/regular.js');
const apikoWords = require('../words/apiko.js');

const bot = new Telegraf(process.env.BOT_TOKEN);

const pickRandomElem = arr =>
  arr[Math.floor(Math.random() * arr.length)];

const generateJoke = (words) => {
  const [part1, part2, part3, part4, part5, part6] = words.map(pickRandomElem)
  return `${part1} приходить ${part2} i каже: "${part3}", а ${part4}: "${part5}". ${part6}.`;
}

const sendJokeWith = words => ({ reply }) => reply(generateJoke(words));

bot.command('/regular_joke', sendJokeWith(regularWords));
bot.command('/apiko_joke', sendJokeWith(apikoWords));

bot.launch()
