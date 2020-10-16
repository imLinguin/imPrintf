const Guild = require('../database/schemas/GuildSettings.js')
const mongoose = require('mongoose')
module.exports = (client,guild) =>{
    console.log(guild.id)
    Guild.deleteOne({guildId:guild.id},function (err) {})

}