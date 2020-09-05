module.exports = {
    "name": "ping",
    "description": "PONG byczq",
    "args": false,
    "argsWzor": 'argumenty nie potrzebne',

    run(message, args, client) {
        message.reply('Pong!');
    }

}