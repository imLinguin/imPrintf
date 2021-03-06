module.exports = {
  name: "info",
  description: "Allows you to see info about specific user",
  args: false,
  hidden: false,
  argsWzor: "<user or nothing>",
  aliases: ["i"],

  run(message, args, client) {
    const user = args[0] ? message.mentions.members.first() : message.member;

    const embed = {
      color: user.roles.color.color,
      author: {
        name: user.user.tag,
        icon_url: user.user.avatarURL({
          dynamic: true,
          size: 1024,
        }),
      },
      description: `[Avatar](${user.user.displayAvatarURL({
        dynamic: true,
        size: 1024,
      })})`,
      fields: [
        {
          name: `Roles`,
          value: listRoles(user),
          inline: true,
        },
        {
          name: `Created at`,
          value: `${user.user.createdAt.toLocaleString(`en-GB`, {
            timezone: "UTC",
          })} UTC`,
          inline: true,
        },
        {
          name: `Joined at`,
          value: `${user.joinedAt.toLocaleString(`en-GB`, {
            timezone: "UTC",
          })} UTC`,
          inline: true,
        },
      ],
      footer: {
        text: `ID: ${user.user.id}`,
      },
    };

    return message.channel.send({
      embed: embed,
    });
  },
};

const listRoles = (user) => {
  const roles = user.roles.cache.array();
  const list = [];
  for (var i in roles) {
    if (roles[i].name !== "@everyone") {
      list.push(roles[i]);
    }
  }
  list.sort((a, b) => {
    return b.position - a.position;
  });
  list.join("\n");
  return list;
};
