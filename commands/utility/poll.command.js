const kolorki = require('../../kolorki.json');
module.exports = {
  "name": "poll",
  "description": "You can easly create polls. Use _ instead of spaces in title and text field",
  "args": true,
  "hidden": false,
  "argsWzor": "<title> <color> <text>",
  "aliases": ["glosowanie", "vote", "pl"],

  async run(message, args, client) {

    const {
      MessageEmbed
    } = require('discord.js');



    if (!args[0] || !args[1] || !args[2]) {
      message.reply("You didn't provided required amount of arguments.").then(message => {
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
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setTitle(pom)

      .setColor(pom3)

      .setDescription(pom2);



    message.channel.send({embeds:[embed]}).then(messageReaction => {
      messageReaction.react('👍');
      messageReaction.react('👎');

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
  msg.reply('Bro, I didn\'t found that color. Check command colors');
  return 0;
}