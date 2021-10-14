const Guild = require("../database/schemas/GuildSettings.js");
const mongoose = require("mongoose");
module.exports = async (client, member) => {
  let config = await Guild.findOne({ guildId: member.guild.id });

  let autoroles = config?.autoRoles;
  if (!autoroles || autoroles == []) return;
  

  member.roles.add(autoroles, `Auto-roles functionality`);
};
