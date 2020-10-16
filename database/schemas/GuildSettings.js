const mongoose = require(`mongoose`);

const GuildSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildId: String,
  guildName: String,
  voiceChannels: Array,
  autoRoles: Array,
  createdCategory: String,
  VCTemplate: String,
  prefix: String,
});

module.exports = mongoose.model(`Guild`, GuildSchema);
