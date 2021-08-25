module.exports = {
  name: "clear",
  description: "Clears specific amount of messages max is 100.",
  args: true,
  hidden: false,
  argsWzor: "<liczba>",
  aliases: ["cc"],
  run(message, args, client) {
    if (!isNaN(args[0])) {
      if (message.member.permissionsIn(message.channel).has("MANAGE_MESSAGES")) {
        if (message.guild.me.permissionsIn(message.channel).has("MANAGE_MESSAGES")) {
          if (args[0] > 100) args[0] = 100;
          message.channel.bulkDelete(args[0], true).then((messages) => {
            message.channel
              .send(`✅ I deleted ${messages.size} messages!`)
              .then((mzg) => {
                mzg.delete({
                  timeout: 5000,
                });
              });
          });
        } else {
          message.reply("I need manage messages permission!");
        }
      } else {
        message.reply("You are not allowed to use that command!");
      }
    } else {
      message.reply("You have to pass a number");
    }
  },
};
