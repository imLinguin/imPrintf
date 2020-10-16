const Guild = require('../database/schemas/GuildSettings.js')
const mongoose = require('mongoose')
module.exports = (client,old,neo) =>{
    
    if(neo.name !== old.name)
    {
        Guild.updateOne({guildId:old.id},{guildName:neo.name}, (err,res)=>{})
    }


}