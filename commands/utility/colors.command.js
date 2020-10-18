module.exports = {
  name: "colors",
  description: "Sends you some preety nice colors",
  args: false,
  argsWzor: "No args needed",
  aliases: ["kolorki"],

  run(message, args, client) {
    const kolorki = require("../../kolorki.json");
    message.reply("Check DM :)").then((msg) => {
      msg.delete({
        timeout: 5000,
      });
      message.delete();
    });

    let kolorstring = [];
    for (color of kolorki.colors) {
      kolorstring.push(color.name);
    }
    kolorstring = kolorstring.join(", ");
    message.author.send(`Here are available colors: **${kolorstring}**.`);
  },
};
