const pickRandomElem = arr =>
  arr[Math.floor(Math.random() * arr.length)];

const replacer = lists => (_, key) => {
  const list = lists[key] || ['NONE'];
  return pickRandomElem(list);
}

const generateJoke = ({ templates, ...lists }) => {
  const template = pickRandomElem(templates);
  return template.replace(/{([^}]+)}/g, replacer(lists));
}

const loadPhrases = async (collection) => {
  const phrasesArray = await collection.find({}).toArray();
  return phrasesArray.reduce((accum, value) => {
    if (value.key && value.phrases) {
      return {
        ...accum,
        [value.key]: value.phrases,
      };
    }
    return accum; 
  }, {});
};

module.exports = {
  generateJoke,
  loadPhrases,
};
