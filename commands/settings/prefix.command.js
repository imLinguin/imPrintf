const Guild = require('../../database/schemas/GuildSettings.js');
const mongoose = require('mongoose');
module.exports = {
    "name": "prefix",
    "description": "Allows you to change bot prefix",
    "args": true,
    "hidden": false,
    "argsWzor": "No args needed",
    "aliases": [],

    run(message, args, client) {
        let author = message.member;
        if(author.hasPermission('MANAGE_GUILD'))
        {
            Guild.updateOne({guildId:message.guild.id},{prefix:args[0]},(err,res)=>{
                if(err)
                {
                    return message.reply(`An error occured use setup command!`);
                }
            })
            message.react("🆗");
        }
        else return message.reply(`You don't have permissions to do that!`)
    }

}