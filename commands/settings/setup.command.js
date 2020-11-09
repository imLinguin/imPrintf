const Guild = require("../../database/schemas/GuildSettings.js");
const mongoose = require("mongoose");
module.exports = {
  name: "setup",
  description: "Use that if bot was on your server before db update!",
  args: false,
  hidden: false,
  argsWzor: 'No args needed"',
  aliases: [],

  async run(message, args, client) {
    const guild = message.guild;
    //console.log(await Guild.findOne({guildId:guild.id}).exec())
    if ((await Guild.findOne({ guildId: guild.id }).exec()) !== null) {
      return;
    }
    const guildToSave = new Guild({
      _id: mongoose.Types.ObjectId(),
      guildId: guild.id,
      guildName: guild.name,
      voiceChannels: [],
      autoRoles: [],
      createdCategory: null,
      noGame: "NO GAME",
      prefix: "(",
    });
    guildToSave.save();

    message.channel.send(`Server config stored to db!`);
  },
};
