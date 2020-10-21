const Guild = require("../database/schemas/GuildSettings.js");
const mongoose = require("mongoose");
module.exports = (client, guild) => {
  const guildToSave = new Guild({
    _id: mongoose.Types.ObjectId(),
    guildId: guild.id,
    guildName: guild.name,
    voiceChannels: [],
    autoRoles: [],
    createdCategory: null,
    noGame: "NO GAME",
    VCTemplate: "Temporar channel %NUMBER%",
    prefix: "(",
  });
  guildToSave.save();
};
