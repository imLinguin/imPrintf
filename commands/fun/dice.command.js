module.exports = {
    name: "dice",
    description: "If no number provided gives value from 1 to 6.",
    args: false,
    hidden: false,
    argsWzor: "<max(optional)>",
    aliases: [],
  
    run(message, args, client) {
      const max = args[0] ? args[0] : 6;
      const random = Math.floor(Math.random() * (max - 1)+1);
      return message.channel.send(`🎲 Random number from 1 to ${max} is **${random}**`)
    },
  };
  