const Jimp = require('jimp')
const { MessageAttachment } = require("discord.js");
const memesPath = "data/memes/";

module.exports = async (client, interaction) => {
    if (!interaction.isContextMenu()) return;

    if (interaction.commandName === 'Vote'){
        const message = interaction.options.getMessage('message')
        await message.react('👍')
        await message.react('👎')
        interaction.reply('Done')
    }
}