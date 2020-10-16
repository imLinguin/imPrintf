const Guild = require("../database/schemas/GuildSettings.js");
const mongoose = require("mongoose");
module.exports = async (client, message) => {
  let PREFIX;
  let config = await Guild.findOne({ guildId: message.guild.id });
  config ? (PREFIX = config.prefix) : (PREFIX = "(");
  if (!config) {
    if (
      message.content.startsWith(PREFIX) &&
      !message.content.startsWith(`${PREFIX}setup`)
    ) {
      return message.channel.send(
        `❌Server isn't stored to database please use **setup** command!`
      );
    }
  }

  if (!message.content.startsWith(PREFIX) || message.author.bot) {
    return;
  }
  let args = message.content.slice(PREFIX.length).trim().split(" ");
  let cmdName = args[0].toLowerCase();
  const cmd =
    client.commands.get(cmdName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(cmdName));
  args.shift();

  if (!cmd) {
    return;
  }
  if (args.length === 0 && cmd.args === true) {
    message.channel.send(
      `No args given here's a template: **${PREFIX}${cmdName} ${cmd.argsWzor}**`
    );
    return;
  }

  try {
    cmd.run(message, args, client);
  } catch (error) {
    console.log(error);
  }
};
