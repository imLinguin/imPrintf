module.exports = {
    //https://discord.com/oauth2/authorize?client_id=730077906054938655&permissions=1916267615&scope=bot
    "name": "invite",
    "description": "Wysyła link na pv dzięki czemu możesz dodać bota na swój serwer",
    "args": false,
    "argsWzor": 'argumenty nie potrzebne',
    "aliases": ["inv"],

    run(message, args, client) {
        message.author.send(`Łap tutaj link :) aby dodać bota na swój serwer :) https://discord.com/oauth2/authorize?client_id=730077906054938655&permissions=1916267615&scope=bot`)
        message.channel.send(`${message.author.username} sprawdź DM`).then(msg => {
            msg.delete({
                timeout: 3000
            })
        })
        message.delete();
    }
}