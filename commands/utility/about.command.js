module.exports = {
    "name": "about",
    "description": "Cool things about bot's authors",
    "args": false,
    "hidden": false,
    "argsWzor": 'No args needed',
    "aliases": ["ab"],

    run(message, args, client) {
        const embed = {
            color: 0x0095ff,
            title: `About`,
            fields: [{
                name: `\u200B`,
                value: "Programmer: **Linguin**\nDesigner **olboy**, Ideas **~~GaVeX~~**, Bot tester: **[xTKEYY](https://www.discord.io/tykeyacze 'His server')**"
            }]
        }
        message.channel.send({
            embed: embed
        })


    }

}