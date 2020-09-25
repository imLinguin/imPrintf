module.exports = {
    "name": "ping",
    "description": "PONG byczq",
    "args": false,
    "hidden": false,
    "argsWzor": 'argumenty nie potrzebne',
    "aliases": ["pingpong"],

    run(message, args, client) {
        message.reply('Pong!');
    }

}