const { MessageAttachment } = require("discord.js");
const Jimp = require("jimp");
module.exports = {
  name: "kissorslap",
  description: "Among us command",
  args: false,
  hidden: false,
  argsWzor: "<nick>",
  aliases: ["kos"],

  async run(message, args, client) {
    const random = Math.random();
    const target = message.mentions.users.first() || message.author;
    const avatar = await Jimp.read(
      target.displayAvatarURL({
        dynamic: false,
        format: "png",
        size: 256,
      })
    );

    let pic;
    let buffer;
    if (random > 0.5) {
      pic = await Jimp.read("data/kissorslap/kiss.png");
      avatar.resize(380, 380);
      avatar.circle({ radius: 190 });
      pic.composite(avatar, 55, 200);
      buffer = await pic.getBufferAsync(Jimp.MIME_PNG);
      message.channel.send("💋Kiss", new MessageAttachment(buffer, "kiss.png"));
    } else {
      pic = await Jimp.read("data/kissorslap/slap.png");
      avatar.resize(370, 370);
      avatar.circle({ radius: 185 });
      pic.composite(avatar, 527, 52);
      buffer = await pic.getBufferAsync(Jimp.MIME_PNG);
      await message.channel.send(
        "🤜Slap",
        new MessageAttachment(buffer, "slap.png")
      );
    }
  },
};
