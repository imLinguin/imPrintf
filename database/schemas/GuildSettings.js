const mongoose = require(`mongoose`);

const GuildSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildId: String,
  guildName: String,
  voiceChannels: Array,
  autoRoles: Array,
  createdCategory: String,
  noGame: String,

  prefix: String,
});

module.exports = mongoose.model(`Guild`, GuildSchema);
