module.exports = {
    //https://discord.com/oauth2/authorize?client_id=730077906054938655&permissions=1916267615&scope=bot
    "name": "invite",
    "description": "Sends invite link so you can invite imPrintf to your own server!",
    "args": false,
    "hidden": false,
    "argsWzor": 'No args needed',
    "aliases": ["inv"],

    run(message, args, client) {
        message.author.send(`Here you are: https://discord.com/oauth2/authorize?client_id=730077906054938655&permissions=1916267615&scope=bot`)
        message.channel.send(`${message.author.username} sprawdź DM`).then(msg => {
            msg.delete({
                timeout: 3000
            })
        })
        message.delete();
    }
}