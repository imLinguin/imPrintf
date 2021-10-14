const {
    MessageEmbed
} = require("discord.js");


module.exports = {
    "name": "help",
    "description": "Shows you list of available commands",
    "args": false,
    "hidden": false,
    "argsWzor": "🙃🙃 you are using this command right now 🙃🙃",
    "aliases": ["idk", "h"],
    run(message, args, client) {
        const array = []
        client.commands.forEach((v,key)=>{
            array.push(v)
        })
        if (!args[0]) {
            const embed = new MessageEmbed({title:"COMMANDS", description:"List of commands and their descriptions", color:0x0096ff, footer:{text:"USE (help command_name for an example"}})
            array.forEach(element => {
                if (!element.hidden) {
                    embed.addField(
                        element.name,
                        element.description,
                        true
                    );
                }

            })
            message.channel.send({embeds:[embed]})
        } else {
            args[0] = args[0].toLowerCase()
            cmdData = client.commands.get(args[0]) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
            if (!cmdData) return message.channel.send(`I couldn't find that command check your spelling 🙃`)
            let aliases
            //making string from array
            aliases = cmdData.aliases.join(", ")
            const embed = new MessageEmbed().setTitle(`Example usage of ${cmdData.name.toUpperCase()} command`).setColor(0x0096ff).setFooter(`Aliases: ${aliases}`)
            embed.addField(cmdData.name, `${cmdData.description}`).addField(`(${cmdData.name} ${cmdData.argsWzor}`, '\u200b')
            message.channel.send({ embeds: [embed] });
        }

    }

}