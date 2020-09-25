const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    "name": "ban",
    "description": "Allows you to ban people",
    "hidden": false,
    "args": true,
    "argsWzor": '<member> <reason>',
    "aliases": [""],

    run(message, args, client) {

        const member = message.mentions.members.first();
        args.shift()
        const reason = args.join(` `);
        if (message.member.hasPermission(`BAN_MEMBERS`)) {
            if (message.guild.me.hasPermission(`BAN_MEMBERS`)) {
                try {
                    /*- member.ban({
                         reason: reason,
                     })*/
                    const embed = {
                        title: `Succesfully banned ${member.user.tag}`,
                        footer: {
                            text: `Reason: ${reason}`
                        },
                        color: 0x0096ff
                    }


                    message.channel.send({
                        embed: embed
                    })
                } catch {
                    return message.channel.send(`I couldn't ban ${member.user.tag}`)
                }

            }
        }
    }
}