module.exports = {
    "name": "colors",
    "description": "Sends you some preety nice colors",
    "args": false,
    "argsWzor": 'No args needed',
    "aliases": ["kolorki"],

    run(message, args, client) {
        const kolorki = require('../../kolorki.json')
        message.reply("Sprawdź dm :)").then(msg => {
            msg.delete({
                timeout: 2000
            })
            message.delete();
        })

        var kolorixy = "";
        shareLen = Object.keys(kolorki.colors).length - 1;
        for (z = 0; shareLen >= z; z++) {
            kolorixy += kolorki.colors[z].name;
            kolorixy += ", ";
        }

        message.author.send(`Dostępne kolory to: **${kolorixy}**`);
    }

}