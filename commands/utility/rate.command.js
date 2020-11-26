const linkRegex = /https?:\/\/(canary.discord|discord).com\/channels\/((\d){18})\/((\d){18})\/((\d){18})/;
module.exports = {
  name: "rate",
  description: "Literaly adds 👍 and 👎 to message",
  args: true,
  hidden: false,
  argsWzor: "<messageId(samechannel)/link(everyChannel)>",
  aliases: ["vote"],
  async run(message, args, client) {
    if (
      !message.member.hasPermisson("MANAGE_MESSAGES", {
        checkOwner: true,
        checkAdmin: true,
      })
    ) {
      return message.channel.send("❌ You aren't allowed to do that");
    }
    let link = args.join(" ");
    let isRegex = linkRegex.test(args.join(" "));
    try {
      if (isRegex) {
        let splitted = [];
        splitted = link.slice().split("/");
        splitted.splice(0, 4);
        let mess = await client.guilds
          .resolve(splitted[0])
          .channels.resolve(splitted[1])
          .messages.fetch(splitted[2]);

        await mess.react("👍");
        await mess.react("👎");
      } else {
        let msg = await message.channel.messages.fetch(args[0]);
        await msg.react("👍");
        await msg.react("👎");
      }
    } catch {}
  },
};
