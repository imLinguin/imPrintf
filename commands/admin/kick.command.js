const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    "name": "kick",
    "description": "Allows you to kick people",
    "hidden": false,
    "args": true,
    "argsWzor": '<member> <reason>',
    "aliases": ["k", "wyjeb", "remove"],

    run(message, args, client) {

        const member = message.mentions.members.first();
        args.shift()
        const reason = args.join(` `);
        if (message.member.hasPermission(`KICK_MEMBERS`)) {
            if (message.guild.me.hasPermission(`KICK_MEMBERS`)) {
                try {
                    member.kick(reason)
                    const embed = {
                        title: `Succesfully kicked ${member.user.tag}`,
                        footer: {
                            text: `Reason: ${reason}`
                        },
                        color: 0x0096ff
                    }


                    message.channel.send({
                        embed: embed
                    })
                } catch {
                    return message.channel.send(`I couldn't kick ${member.user.tag}`)
                }

            }
        }
    }
}