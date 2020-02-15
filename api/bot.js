const Telegraf = require('telegraf');

const regularWords = require('../words/regular.js');
const apikoWords = require('../words/apiko.js');

const { token, url, secret_query } = process.env;

const bot = new Telegraf(token);

const pickRandomElem = arr =>
  arr[Math.floor(Math.random() * arr.length)];

const generateJoke = (words) => {
  const [part1, part2, part3, part4, part5, part6] = words.map(pickRandomElem)
  return `${part1} приходить ${part2} i каже: "${part3}", а ${part4}: "${part5}". ${part6}.`;
}

const sendJokeWith = words => ({ reply }) => reply(generateJoke(words));

bot.command('/regular_joke', sendJokeWith(regularWords));
bot.command('/apiko_joke', sendJokeWith(apikoWords));

module.exports = async (req, res) => {
  const queryKeys = Object.keys(req.query);

  if (req.body && queryKeys.includes(secret_query)) {
    bot.handleUpdate(req.body, res)
      .then(response => console.log('bot response', response))
      .catch(error => console.log('error', error));
  } else if(queryKeys.includes('set-url')) {
    const fullUrl = `${url}?${secret_query}`;
    bot.telegram.setWebhook(fullUrl)
      .then(() => res.send(`url set to ${fullUrl}`))
      .catch(error => res.json(error));
  } else {
    res.send('ok');
  }
}