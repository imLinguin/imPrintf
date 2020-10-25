const { MessageAttachment } = require("discord.js");
const Jimp = require("jimp");
const memesPath = "data/memes/";
module.exports = {
  name: "meme",
  description: "Do a lot of things with your friends",
  args: true,
  hidden: false,
  argsWzor: "<slap/kick/communism> <target(user)>",
  aliases: [],

  async run(message, args, client) {
    let buffer;
    const target = message.mentions.users.first();
    if (!target) {
      return message.channel.send("You didn't specifyed any person");
    }
    const authorImg = await Jimp.read(
      message.author.displayAvatarURL({ format: "png", dynamic: false })
    );
    const targetImg = await Jimp.read(
      target.displayAvatarURL({ format: "png", dynamic: false })
    );
    let base;
    let phrase;
    switch (args[0]) {
      case "slap":
        base = await Jimp.read(memesPath + "slap.png");
        phrase = "slapped";
        authorImg.resize(135, 135).circle({ radius: 135 / 2 });
        targetImg.resize(170, 170).circle({ radius: 170 / 2 });
        base.composite(authorImg, 307, 13);
        base.composite(targetImg, 130, 75);
        buffer = await base.getBufferAsync(Jimp.MIME_PNG);
        break;

      case "kick":
        base = await Jimp.read(memesPath + "kick.png");
        phrase = "kicked";
        authorImg.resize(40, 40).circle({ radius: 40 / 2 });
        targetImg.resize(50, 50).circle({ radius: 50 / 2 });
        base.composite(authorImg, 343, 2);
        base.composite(targetImg, 150, 29);
        buffer = await base.getBufferAsync(Jimp.MIME_PNG);
        break;
      case "communism":
        base = await Jimp.read(memesPath + "zsrr.png");
        base.opacity(0.7);
        targetImg.resize(480, 480);
        targetImg.composite(base, 0, 0);
        buffer = await targetImg.getBufferAsync(Jimp.MIME_PNG);

        return await message.channel.send(
          new MessageAttachment(buffer, "communism.png")
        );
        break;
    }

    const attachment = new MessageAttachment(buffer, "meme.png");
    await message.channel.send(
      `${message.author} ${phrase} ${target}`,
      attachment
    );
  },
};
