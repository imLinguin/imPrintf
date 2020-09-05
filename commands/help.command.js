const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    "name": "help",
    "description": "Wyświetla dostępne komendy",
    "args": false,
    "argsWzor": "🙃🙃 właśnie używasz tej komendy 🙃🙃",

    run(message, args, client) {
        const array = client.commands.array();
        if (!args[0]) {
            const embed = new MessageEmbed().setTitle(`LISTA KOMEND`).setColor(0x0096ff)
            array.forEach(element => {
                embed.addField(
                    element.name,
                    element.description,
                    true
                );
            })
            embed.setFooter(`UŻYJ (help nazwa_komendy po przykład użycia`)

            message.channel.send(embed)
        } else {
            args[0] = args[0].toLowerCase()
            cmdData = client.commands.get(args[0])
            if (!cmdData) return message.channel.send(`Nie znaleziono komendy sprawdź czy nie pominąłeś żadnej literki 🙃`)
            const embed = new MessageEmbed().setTitle(`PRZYKŁAD UŻYCIA KOMENDY ${args[0].toUpperCase()}`).setColor(0x0096ff)
            embed.addField(cmdData.name, `${cmdData.description}`).addField(`(${cmdData.name} ${cmdData.argsWzor}`, '\u200b')
            message.channel.send(embed)
        }

    }

}