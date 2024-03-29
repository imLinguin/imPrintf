const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  description: "Allows you to kick people",
  hidden: false,
  args: true,
  argsWzor: "<member> <reason>",
  aliases: ["k", "wyjeb", "remove"],

  run(message, args, client) {
    const member = message.mentions.members.first();
    args.shift();
    let reason = args.join(` `);
    reason === undefined ? (reason = "Unspecified") : (reason = reason);

    if (message.member.hasPermission(`KICK_MEMBERS`)) {
      if (message.guild.me.hasPermission(`KICK_MEMBERS`) && member.kickable) {
        try {
          member.kick(reason);
          const embed = {
            title: `Succesfully kicked ${member.user.tag}`,
            footer: {
              text: `Reason: ${reason}`,
            },
            color: 0x0096ff,
          };

          message.channel.send({
            embeds: [embed],
          });
        } catch {
          return message.channel.send(`I couldn't kick ${member}`);
        }
      } else {
        message.channel.send(
          `I can't kick ${member}! Check my permissions or role hierarchy.`
        );
      }
    } else {
      message.reply("You don't have permission to use that command!");
    }
  },
};
