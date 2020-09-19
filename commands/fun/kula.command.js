const {
    MessageAttachment
} = require("discord.js")

module.exports = {
    "name": "kula",
    "description": "kula jeść kula pić",
    "args": true,
    "argsWzor": "<czynność>",
    "aliases": ["marcinek"],

    run(message, args, client) {
        const jedzonko = new MessageAttachment('https://i.imgur.com/WUIYLMt.jpg');
        const picie = new MessageAttachment('https://i.imgur.com/ViLKioN.jpg');
        const spanko = new MessageAttachment('https://i.imgur.com/zfmhZ27.mp4');
        const granko = new MessageAttachment('https://i.imgur.com/1Er0sL1.mp4');
        const sranko = new MessageAttachment('https://i.imgur.com/bfZw48V.mp4');
        args[0] = args[0].toLowerCase();

        switch (args[0]) {
            case 'jeść':
                message.channel.send(jedzonko);
                break;
            case 'pić':
                message.channel.send(picie);
                break;
            case 'spać':
                message.channel.send(spanko);
                break;
            case 'grać':
                message.channel.send(granko);
                break;
            case 'srać':
                message.channel.send(sranko)
        }



    }

}