const Guild = require("../database/schemas/GuildSettings.js");
const mongoose = require("mongoose");
module.exports = async (client, member) => {
  let config = await Guild.findOne({ guildId: member.guild.id });

  if (!config.autoRoles) return;
  let autoroles = config.autoRoles;

  member.roles.add(autoroles, `Auto-roles functionality`);
};
