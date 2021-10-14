const {

} = require("discord.js");
const kolorki = require('../../kolorki.json');
module.exports = {
  "name": "embed",
  "description": "Allows you to send embed. Cool usage in announcements. Replace spaces with _ thanks man!",
  "args": true,
  "argsWzor": "<title> <color> <bottom_text>",
  "aliases": ["emb"],

  run(message, args, client) {
    const Discord = require('discord.js')
    const {
      MessageEmbed
    } = require('discord.js');



    if (!args[1].startsWith("#")) {
      args[1] = args[1].toLowerCase();
      var pom3 = GiveColor(args[1]);
      if (args[1] === "error") {
        message.reply("Nie mam takiego koloru w bazie!");
      }
    } else {
      pom3 = args[1]
    }

    var pom = args[0].split("_").join(" ");
    var pom2 = args[2].split("_").join(" ");


    const embed = new MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())

      .setTitle(pom)

      .setColor(pom3)

      .setDescription(pom2)


    message.channel.send({embeds:[embed]});

    message.delete();

  }
}

function GiveColor(arg) {

  shareInfoLen = Object.keys(kolorki.colors).length - 1;

  for (x = 0; shareInfoLen >= x; x++) {

    if (arg === kolorki.colors[x].name) {
      return kolorki.colors[x].code;
    }
  }

}