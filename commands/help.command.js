const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    "name": "help",
    "description": "Wyświetla dostępne komendy",
    "args": false,
    "argsWzor": "🙃🙃 właśnie używasz tej komendy 🙃🙃",
    "aliases": ["idk", "h"],

    run(message, args, client) {
        const array = client.commands.array();
        if (!args[0]) {
            const embed = new MessageEmbed().setTitle(`COMMANDS`).setColor(0x0096ff)
            array.forEach(element => {
                embed.addField(
                    element.name,
                    element.description,
                    true
                );
            })
            embed.setFooter(`USE (help command_name for an example`)

            message.channel.send(embed)
        } else {
            args[0] = args[0].toLowerCase()
            cmdData = client.commands.get(args[0]) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
            if (!cmdData) return message.channel.send(`I couldn't find that command check your spelling 🙃`)
            let aliases
            //making string from array
            aliases = cmdData.aliases.join(", ")
            const embed = new MessageEmbed().setTitle(`Example usage of ${cmdData.name.toUpperCase()} command`).setColor(0x0096ff).setFooter(`Aliases: ${aliases}`)
            embed.addField(cmdData.name, `${cmdData.description}`).addField(`(${cmdData.name} ${cmdData.argsWzor}`, '\u200b')
            message.channel.send(embed)
        }

    }

}