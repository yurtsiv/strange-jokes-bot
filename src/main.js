const TelegramBot = require('node-telegram-bot-api');
const MongoClient = require('mongodb').MongoClient;

const settings = require('../settings.json');

const { generateJoke, loadPhrases } = require('./utils');

const startBot = async (Phrases) => {
  let phrases = await loadPhrases(Phrases);

  const changeStream = Phrases.watch();
  changeStream.on('change', async (event) => {
    phrases = await loadPhrases(Phrases);
    console.log(`Phrases changed by ${event.operationType} type`);
  });

  const bot = new TelegramBot(settings.api_token, {polling: true});
  
  const sendJoke = msg => bot.sendMessage(msg.chat.id, generateJoke(phrases));
  
  bot.onText(/\/apiko_joke/, sendJoke);
}

const Client = new MongoClient(settings.MONGO_URI, { useNewUrlParser: true });
Client.connect().then((client) => {
  console.log('Connected to mongo');

  const db = client.db(settings.DB_NAME);
  const Collection = db.collection(settings.COLLECTION);

  startBot(Collection);
}).catch(err => console.log(`Can't connect to mongoDB: ${err}`));
