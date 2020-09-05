const kolorki = require('../kolorki.json');
module.exports = {
  "name": "poll",
  "description": "Pozwala stworzyć głosowanie",
  "args": true,
  "argsWzor": "<tytuł> <kolor> <tekst>",

  async run(message, args, client) {

    const {
      MessageEmbed
    } = require('discord.js');



    if (!args[0] || !args[1] || !args[2]) {
      message.reply("Błąd!").then(message => {
        message.delete({
          timeout: 2000
        })
      }).catch;

      return;
    }
    var pom = args[0].split("_").join(" ");
    var pom2 = args[2].split("_").join(" ");
    args[2] = args[2].toLowerCase()
    var pom3 = GiveColor(message, args[1]);
    if (pom3 === 0) {
      return;
    }
    const embed = new MessageEmbed()

      .setTitle(pom)

      .setColor(pom3)

      .setDescription(pom2);



    message.channel.send(embed).then(messageReaction => {
      if (message.guild.id === '710802417926537297') {
        messageReaction.react(message.guild.emojis.cache.get('725654422700425286'));
        messageReaction.react(message.guild.emojis.cache.get('725655000952471593'));
      } else {
        messageReaction.react('👍');
        messageReaction.react('👎');
      }
    })
    message.delete();
  }


}

function GiveColor(msg, arg) {
  shareInfoLen = Object.keys(kolorki.colors).length - 1;

  for (l = 0; shareInfoLen >= l; l++) {

    if (arg === kolorki.colors[l].name) {
      return kolorki.colors[l].code;
    }
  }
  msg.reply('Chyba nie mam takiego koloru sprawdź komendę (colors');
  return 0;
}