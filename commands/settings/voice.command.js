const Guild = require("../../database/schemas/GuildSettings.js");
const mongoose = require("mongoose");
module.exports = {
  name: "voice",
  description: "Temporar voice channels related settings!",
  args: true,
  hidden: false,
  argsWzor: "<category/channel/nogame> <add/delete/ID> <new channel title>",
  aliases: ["vc"],

  async run(message, args, client) {
    if (!message.member.permissionsIn(message.channel).has("MANAGE_GUILD"))
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
        message.react("🆗");

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
            let text = args;
            if (!text)
              return message.channel.send(
                `You need to specify text for new channel`
              );
            if (!message.guild.channels.cache.get(args[2]))
              return message.channel.send(`ID is invalid`);

            for (channel of channels) {
              if (channel && channel.id === args[2])
                return message.channel.send("That channel is already added!");
            }
            let id = args[2];
            text.splice(0, 3);
            text = text.join(" ");
            channelObj = {
              id: id,
              text: text,
            };
            channels.push(channelObj);
            await Guild.updateOne(
              { guildId: message.guild.id },
              { voiceChannels: channels }
            );
            message.react("🆗");
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
              if (channels[i].id === args[2]) {
                channels.splice(i, 1);
              }
            }
            await Guild.updateOne(
              { guildId: message.guild.id },
              { voiceChannels: channels }
            );
            message.react("🆗");
            break;

          default:
            return message.channel.send(
              `Somenthing is not ok. Template: **${guildConfig.prefix}voice channel add/delete __CHANNEL_ID__ __channel title__**`
            );
            break;
        }

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
        message.react("🆗");
        break;
      default:
        message.channel.send(
          `You forgot something **${guildConfig.prefix}voice <category/channel/title> <add/delete/ID>**`
        );
        break;

      case "list":
        let configEmbed = {
          color: 0x095ff,
          title: `⚙ Config for ${message.guild.name}`,
          fields: [
            {
              name: "Prefix",
              value: `${guildConfig.prefix}`,
              inline: true,
            },
            {
              name: "VoiceChannels",
              value: `${
                guildConfig.voiceChannels
                  ? resolveChannelNames(guildConfig.voiceChannels, message)
                  : "Not Configured"
              }`,
              inline: true,
            },
            {
              name: "VoiceChannels Category",
              value: `${
                guildConfig.createdCategory
                  ? message.guild.channels.resolve(guildConfig.createdCategory)
                      .name
                  : "Not Configured"
              }`,
            },
            {
              name: "Autoroles",
              value: `${
                guildConfig.autoRoles[0]
                  ? resolveRoleNames(guildConfig.autoRoles, message)
                  : "Not Configured"
              }`,
              inline: true,
            },
          ],
        };

        message.channel.send({ embed: configEmbed });
        break;
    }
  },
};
function resolveChannelNames(array, message) {
  let outString = "";
  for (element of array) {
    outString += message.guild.channels.resolve(element.id).name + "\n";
  }
  return outString;
}

function resolveRoleNames(array, message) {
  let outString1 = "";
  for (element of array) {
    outString1 += message.guild.roles.resolve(element).name + "\n";
  }
  return outString1;
}
