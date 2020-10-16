module.exports = {
  name: "ping",
  description: "PONG byczq",
  args: false,
  hidden: false,
  argsWzor: "No args needed",
  aliases: ["pingpong"],

  run(message, args, client) {
    message.reply(
      `🏓 Current API <-> BOT latency is ${Math.round(client.ws.ping)}`
    );
  },
};
