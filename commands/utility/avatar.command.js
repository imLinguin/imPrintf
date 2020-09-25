const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    "name": "avatar",
    "description": "Sends user's avatar!",
    "args": false,
    "argsWzor": '<user>',
    "aliases": ["image", "icon"],

    run(message, args, client) {
        const mention = (message.mentions.users.first() || message.mentions.members.first());
        const avatarurl = mention ? mention.displayAvatarURL({
            dynamic: true,
            size: 1024
        }) : message.author.displayAvatarURL({
            dynamic: true,
            size: 1024
        })

        const embed = {
            title: `Avatar gracza ${mention ? (message.mentions.users.first().tag || message.mentions.members.first().tag) : message.author.tag}`,
            color: 0x095ff,
            type: `image`,
            fields: [{
                name: 'Linki do formatów',
                value: `[PNG](${mention ? mention.avatarURL({format:'png'}):message.author.avatarURL({format:'png',size:1024})} 'Format PNG avatara użytkownika ${mention ? mention.tag : message.author.tag}') | [JPG](${mention ? mention.avatarURL({format:'jpg'}):message.author.avatarURL({format:'jpg',size:1024})} 'Format JPG avatara użytkownika ${mention ? mention.tag : message.author.tag}') | [WEBP](${mention ? mention.avatarURL({format:'webp'}):message.author.avatarURL({format:'webp',size:1024})} 'Format WEBP avatara użytkownika ${mention ? mention.tag : message.author.tag}')`,
                inline: true
            }],
            image: {
                url: avatarurl,
            }
        }
        message.channel.send({
            embed: embed
        })


    }

}