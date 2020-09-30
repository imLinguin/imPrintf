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
            title: `Avatar of ${mention ? (message.mentions.users.first().tag || message.mentions.members.first().tag) : message.author.tag}`,
            color: 0x095ff,
            type: `image`,
            fields: [{
                name: 'Linki to formats',
                value: `[PNG](${mention ? mention.avatarURL({format:'png'}):message.author.avatarURL({format:'png',size:1024})} 'PNG format of ${mention ? mention.tag : message.author.tag}\'s avatar') | [JPG](${mention ? mention.avatarURL({format:'jpg'}):message.author.avatarURL({format:'jpg',size:1024})} 'JPG format of ${mention ? mention.tag : message.author.tag}\'s avatar') | [WEBP](${mention ? mention.avatarURL({format:'webp'}):message.author.avatarURL({format:'webp',size:1024})} 'WEBP format of ${mention ? mention.tag : message.author.tag}\'s avatar')`,
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