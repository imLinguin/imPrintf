const Guild = require("../../database/schemas/GuildSettings.js");
const mongoose = require("mongoose");
module.exports = {
  name: "voice",
  description: "Temporar voice channels related settings!",
  args: true,
  hidden: false,
  argsWzor: "<category/channel/title/nogame> <add/delete/ID/title>",
  aliases: ["vc"],

  async run(message, args, client) {
    if (!message.member.hasPermission(`MANAGE_GUILD`))
      return message.reply(`You are not allowed to do that!`).then((m) => {
        m.delete({ timeout: 5000 });
      });
    const guildConfig = await Guild.findOne({ guildId: message.guild.id });
    args[0].toLowerCase();
    let channels = guildConfig.voiceChannels;
    switch (args[0]) {
      case "category":
      case "cat":
        args[1].toLowerCase();
        if (!args[1])
          return message.channel.send(`You need to specify category ID`);
        if (!message.guild.channels.cache.get(args[1]))
          return message.channel.send(`ID is invalid`);
        let id = args[1];
        await Guild.updateOne(
          { guildId: message.guild.id },
          { createdCategory: id }
        );
        message.react("764459481303875584");

        break;
      case "create":
      case "channel":
      case "cr":
        switch (args[1]) {
          case "add":
            if (!args[2])
              return message.channel.send(
                `You need to specify voice channel ID`
              );
            if (!message.guild.channels.cache.get(args[2]))
              return message.channel.send(`ID is invalid`);

            for (channel of channels) {
              if (channel === args[2])
                return message.channel.send("That channel is already added!");
            }

            channels.push(args[2]);
            await Guild.updateOne(
              { guildId: message.guild.id },
              { voiceChannels: channels }
            );
            message.react("764459481303875584");
            break;
          case "delete":
          case "del":
            if (!args[2])
              return message.channel.send(
                `You need to specify voice channel ID`
              );
            if (!message.guild.channels.cache.get(args[2]))
              return message.channel.send(`ID is invalid`);
            for (i = 0; i < channels.length; i++) {
              if (channels[i] === args[2]) {
                channels.splice(i, 1);
              }
            }
            await Guild.updateOne(
              { guildId: message.guild.id },
              { voiceChannels: channels }
            );
            message.react("764459481303875584");
            break;

          default:
            return message.channel.send(
              `Somenthing is not ok. Template: **${guildConfig.prefix}voice channel add/delete __CHANNEL_ID__**`
            );
            break;
        }

        break;
      case "template":
      case "title":
        args.shift();
        if (!args[0])
          return message.reply(
            `You have to specify a title of channels that I'll create`
          );
        const title = args.join(" ");

        await Guild.updateOne(
          { guildId: message.guild.id },
          { VCTemplate: title }
        );
        message.react("764459481303875584");
        break;
      case "no-game":
      case "nogame":
        args.shift();
        if (!args[0])
          return message.reply(
            `You have to specify a text when user is not in game`
          );
        const nogametitle = args.join(" ");
        await Guild.updateOne(
          { guildId: message.guild.id },
          { noGame: nogametitle }
        );
        message.react("764459481303875584");
        break;
      default:
        message.channel.send(
          `You forgot something **${guildConfig.prefix}voice <category/channel/title> <add/delete/ID>**`
        );
        break;
    }
  },
};
