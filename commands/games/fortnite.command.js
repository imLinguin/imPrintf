const FortniteAPI = require("fortnite-api-io");
const { MessageEmbed, MessageAttachment } = require("discord.js");
require("dotenv").config();
const fortniteAPI = new FortniteAPI(process.env.ftapi);
module.exports = {
  name: "fortnite",
  description: "Fortnite related commands. Spaces in nicks are welcome",
  args: true,
  hidden: false,
  argsWzor: "<map/stats/server> <nick>",
  aliases: ["fortnight", "fortcraft", "fort", "forknight"],
  async run(message, args, client) {
    switch (args[0]) {
      case "map":
        const maps = await fortniteAPI.listPreviousMaps();
        const lastMap = maps.maps[maps.maps.length - 1]; //""
        //const URL = lastMap.urlPOI.split("en").join("pl")
        const embed = new MessageEmbed()
          .setTitle(`Map from ${lastMap.releaseDate}`)
          .setImage(
            lastMap.urlPOI ||
              "https://miro.medium.com/max/978/1*pUEZd8z__1p-7ICIO1NZFA.png"
          )
          .setFooter(`Game version: ${lastMap.patchVersion}`)
          .setColor(0x095ff);

        message.channel.send(embed);
        break;
      case "stats":
        message.channel.startTyping();

        const nick = message.content.substring(
          message.content.indexOf(args[1])
        );
        const ID = await fortniteAPI.getAccountIdByUsername(nick);
        if (ID.result !== true) {
          message.channel.stopTyping();
          return message.channel.send(
            `Couldn't find player with this username!`
          );
        }
        const stats = await fortniteAPI.getGlobalPlayerStats(ID.account_id);
        const recentGames = await fortniteAPI.getPlayerRecentMatches(
          ID.account_id
        );

        if (stats.result === true && stats.global_stats !== null) {
          const embed = new MessageEmbed()
            .setTitle(
              `${stats.name}'s level: **${
                stats.account.level ? stats.account.level : "NO DATA"
              }**`
            )
            .addFields(
              {
                name: `SOLO`,
                value: `Wins: ${stats.global_stats.solo.placetop1}\nKD: ${stats.global_stats.solo.kd}\nMatches played: ${stats.global_stats.solo.matchesplayed}\nKills: ${stats.global_stats.solo.kills}`,
                inline: true,
              },
              {
                name: `DUO`,
                value: `Wins: ${stats.global_stats.duo.placetop1}\nKD: ${stats.global_stats.duo.kd}\nMatches played: ${stats.global_stats.duo.matchesplayed}\nKills: ${stats.global_stats.duo.kills}`,
                inline: true,
              },
              {
                name: `SQUADS`,
                value: `Wins: ${stats.global_stats.squad.placetop1}\nKD: ${stats.global_stats.squad.kd}\nMatches played: ${stats.global_stats.squad.matchesplayed}\nKills: ${stats.global_stats.squad.kills}`,
                inline: true,
              }
            )
            .setColor(0x095ff);

          if (recentGames.matches !== []) {
            const latestGame = recentGames.matches[0];
            embed.addField(
              `LATEST GAME`,
              `Kills: ${latestGame.kills}\nMode: ${latestGame.readable_name}\nPlatform: ${latestGame.platform}`,
              false
            );
          }

          message.channel.send(embed);
          message.channel.stopTyping();
        } else {
          message.channel.stopTyping();
          return message.channel.send(`My man something went wrong 🚫`);
        }
        break;

      case "server":
        const isOnline = await fortniteAPI.getStatus();
        message.reply(
          `${isOnline ? "Fortnite is online 🟢" : "Fortnite is down 🔴"}`
        );
        break;

      default:
        return message.reply(
          `You do that wrong! Try: **(fortnite <map/stats/server> <nick>**`
        );
        break;
    }
  },
};
