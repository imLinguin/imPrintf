const {

} = require("discord.js");
const kolorki = require('../kolorki.json');
module.exports = {
  "name": "embed",
  "description": "wyświetla co chcesz i kiedy chcesz",

  run(message, args) {
    const Discord = require('discord.js')
    const {
      MessageEmbed
    } = require('discord.js');
    const client = new Discord.Client();



    if (!args[1] || !args[2] || !args[3]) {
      message.reply("Błąd!").then(message => {
        message.delete({
          timeout: 2000
        })
      }).catch;

      return;
    }

    if (!args[2].startsWith("#")) {
      args[2] = args[2].toLowerCase();
      var pom3 = GiveColor(args[2]);
      if (args[2] === "error") {
        message.reply("Nie mam takiego koloru w bazie!");
      }
    } else {
      pom3 = args[2]
    }

    var pom = args[1].split("_").join(" ");
    var pom2 = args[3].split("_").join(" ");


    const embed = new MessageEmbed()

      .setTitle(pom)

      .setColor(pom3)

      .setDescription(pom2)

      .setFooter(`sent by ${message.author.username}`)

    message.channel.send(embed);

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