module.exports = {
    "name": "among",
    "description": "Among us command",
    "args": true,
    "hidden": false,
    "argsWzor": '<nick>',
    "aliases": ["eject","impostor","imposter"],

    run(message, args, client) {
        
        const random = Math.random();
        const nick = message.mentions.users.first() ? message.mentions.users.first() : args[0]
        if(random > 0.5)
        {   
            message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.\n\n　　　.　　　 　　.　　　　　。　　 。　. 　\n\n.　　 。　　　　　 ඞ 。 . 　　 • 　　　\n　　ﾟ　　 ${nick} was An Impostor.　 。　.\n\n　　'　　　 1 Impostor remains 　 　　。\n\n　　ﾟ　　　.　　　. ,　　　　.　 .`)
        }
        else{
            message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.\n\n　　　.　　　 　　.　　　　　。　　 。　. 　\n\n.　　 。　　　　　 ඞ 。 . 　　 • 　　　\n　　ﾟ　　 ${nick} was not An Impostor.　 。　.\n\n　　'　　　 1 Impostor remains 　 　　。\n\n　　ﾟ　　　.　　　. ,　　　　.　 .`)
        }

    }

}