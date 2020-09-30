const {
    MessageAttachment
} = require("discord.js");

module.exports = {
    "name": "yoink",
    "description": "You can basicly STEAL emotes es?",
    "args": true,
    "hidden": false,
    "argsWzor": "<emote or ID> <gif(if it has to be a gif)>",
    "aliases": ["jumbo", "kradziez", "thief", "steal"],
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
                return message.channel.send(`You have to provide valid emoji ID or emoji like this: <a:chicken:752540562279628810>`)
            }
            if (args[1] === "gif") {
                animated = true;
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