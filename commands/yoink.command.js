const {
    MessageAttachment
} = require("discord.js");

module.exports = {
    "name": "yoink",
    "description": "Pozwala kraść emotki es?",
    "args": true,
    "argsWzor": "<emotka lub ID>",
    run(message, args, client) {

        let emojiID;
        let animated = false;
        if (args[0].startsWith('<')) {
            const emojiPos = args[0].lastIndexOf(':')
            emojiID = args[0].substring(emojiPos + 1)
            emojiID = emojiID.substring(0, emojiID.length - 1);
            if (args[0].startsWith('<a:')) {
                animated = true;
            } else {
                animated = false;
            }
        } else {
            const numbers = new RegExp("^[0-9]+$")
            if (!numbers.test(args[0])) {
                return message.channel.send(`Musisz podać emotkę lub ID emotki`)
            }
            emojiID = args[0];
        }
        send(emojiID, message, animated)
    }
}
const send = async (ID, message, isAnimated) => {
    if (isAnimated) {
        await message.channel.send(new MessageAttachment(`https://cdn.discordapp.com/emojis/${ID}.gif`, 'emoji.gif'))
    } else {
        await message.channel.send(new MessageAttachment(`https://cdn.discordapp.com/emojis/${ID}.png`, 'emoji.png'))
    }
}