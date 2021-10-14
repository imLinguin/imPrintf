const Guild = require("../../database/schemas/GuildSettings.js");
const mongoose = require("mongoose");
module.exports = {
  name: "autorole",
  description: "Allows you to set roles that I'll give to new users!",
  args: true,
  hidden: false,
  argsWzor: "<add/delete> <roleID>",
  aliases: ["ar", "auro"],

  async run(message, args, client) {
    let author = message.member;
    if (author.hasPermission("MANAGE_GUILD")) {
      if (!message.guild.me.hasPermission(`MANAGE_ROLES`))
        return message.reply(`First I need **MANAGE_ROLES** permission`);
      let config = await Guild.findOne({ guildId: message.guild.id });
      let roles = config.autoRoles;
      let roleObj = message.guild.roles.cache.get(args[1]);
      switch (args[0]) {
        case "add":
        case "create":
          if (!args[1])
            return message.channel.send(`You need to specify role ID`);
          if (!message.guild.roles.cache.get(args[1]))
            return message.channel.send(`ID is invalid`);

          for (role of roles) {
            if (role === args[1])
              return message.channel.send(
                "This role is already saved to my config!"
              );
          }
          let valid = true;
          for (role of message.guild.me.roles.cache.array()) {
            if (roleObj.comparePositionTo(role) >= 0) {
              valid = false;
            } else {
              valid = true;
              break;
            }
          }
          if (valid === false)
            return message.channel.send(
              "❌ I can't manage this role make sure to put my role higher in hierarchy!"
            );
          roles.push(args[1]);
          await config.updateOne({ autoRoles: roles });
          message.react("🆗");
          break;
        case "delete":
        case "del":
          if (!args[1])
            return message.channel.send(`You need to specify role ID`);
          if (!message.guild.roles.cache.get(args[1]))
            return message.channel.send(`ID is invalid`);

          for (i = 0; i < roles.length; i++) {
            if (roles[i] === args[1]) {
              roles.splice(i, 1);
            }
          }

          await config.updateOne({ autoRoles: roles });
          message.react("🆗");
          break;
      }
    } else return message.reply(`You don't have permissions to do that!`);
  },
};
//message.react('764459481303875584');
