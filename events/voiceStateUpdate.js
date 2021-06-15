const Guild = require("../database/schemas/GuildSettings.js");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
let order = new Map();
let channelsToCheck = new Map();

const order_cache = JSON.parse(
  fs.readFileSync(path.join(__dirname, ".order_cache"), reviver)
);
const vc_cache = JSON.parse(
  fs.readFileSync(path.join(__dirname, ".vc_cache")),
  reviver
);

if (order_cache) {
  order = new Map(order_cache.value);
}
if (vc_cache) {
  channelsToCheck = vc_cache;
}
module.exports = async (client, oldState, newState) => {
  verifyCache(newState.guild)
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
            if (!temp) {
              channelsToCheck.delete(guild.id);
              order.delete(guild.id);
            }
            saveCache();
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
          bitrate: resolved.bitrate,
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
          saveCache();
        });
    }
  }
};

function saveCache() {
  fs.writeFileSync(
    path.join(__dirname, ".vc_cache"),
    JSON.stringify(channelsToCheck, replacer),
    { encoding: "utf8" }
  );
  fs.writeFileSync(
    path.join(__dirname, ".order_cache"),
    JSON.stringify(order, replacer),
    { encoding: "utf8" }
  );
}


function verifyCache(guild) {
  let channels = channelsToCheck.get(guild.id)
  for (channel in channels){
    if(guild.available) {
      if(!guild.channels.resolve(channels[channel]))
      {
        channels.splice(channel,1)
        let number = order.get(guild.id)
        number -= 1
        if(number < 1) {
          number = 1
        }
        order.set(guild.id, number) 
      }
    }
  }
  saveCache()

}

function replacer(key, value) {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}

function reviver(key, value) {
  if (typeof value === "object" && value !== null) {
    if (value.dataType === "Map") {
      return new Map(value.value);
    }
  }
  return value;
}
