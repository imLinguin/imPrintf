module.exports = (client) => {
  console.log(`Zalogowano jako ${client.user.tag}`);
  client.user.setStatus("available");

  const updateInterval = setInterval(() => {
    client.user.setActivity(`(help | Serwers: ${client.guilds.cache.size}`, {
      type: "WATCHING",
    });
  }, 120000);

  client.on(`disconnect`, () => {
    clearInterval(updateInterval);
    client.stopTyping();
  });
};
