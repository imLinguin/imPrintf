const Guild = require("../database/schemas/GuildSettings.js");
const mongoose = require("mongoose");
let order = new Map();
let channelsToCheck = new Map();
module.exports = async (client, oldState, newState) => {
  let guild = newState.guild;
  let channelTable = channelsToCheck.get(guild.id) || [];
  for (channelId of channelTable) {
    let ch = await newState.guild.channels.resolve(channelId);
    if (ch)
      if ((await ch.type) === "voice" && ch.members.array().length <= 0) {
        await ch.delete(`Channel empty > Auto create channels`);
        order.set(guild.id, order.get(guild.id) - 1);
        let temp = channelsToCheck.get(guild.id);
        for (j = 0; j < temp.length; j++) {
          if (temp[j] === ch.id) {
            temp.splice(j, 1);
          }
        }
      }
  }
  if (newState.channel === null) return;
  if (oldState.channel === newState.channel) return;

  const config = await Guild.findOne({ guildId: guild.id });
  if (!config || !config.voiceChannels) return;

  for (voiceChannel of config.voiceChannels) {
    if (newState.channelID === voiceChannel.id) {
      let resolved = await newState.guild.channels.resolve(voiceChannel.id);
      let chname = voiceChannel.text;
      if (!order.has(guild.id)) order.set(guild.id, 1);
      chname = chname.replace("%USER%", newState.member.user.username);
      chname = chname.replace("%NUMBER%", `${order.get(guild.id)}`);
      chname = chname.replace(
        "%GAME%",
        newState.member.user.presence.activities[0]
          ? newState.member.user.presence.activities[0].name
          : config.noGame
      );
      guild.channels
        .create(chname, {
          type: "voice",
          parent: config.createdCategory,
          reason: `Auto create channels`,
          userLimit: resolved.userLimit,
        })
        .then(async (c) => {
          let temp = [];
          temp = channelsToCheck.has(guild.id)
            ? channelsToCheck.get(guild.id)
            : [];
          temp.push(c.id);
          order.set(guild.id, order.get(guild.id) + 1);
          newState.setChannel(c, `Auto created channel`);
          channelsToCheck.set(guild.id, temp);
        });
    }
  }
};
