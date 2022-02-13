const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "anime",
  description: "Returns a source of scene you attached",
  args: false,
  hidden: false,
  argsWzor: "",
  aliases: ["ani"],

  async run(message, args, client) {
    const values = Array.from(message.attachments.values());
    const attachment = values[0];
    if (
      attachment.contentType.startsWith("image") ||
      attachment.contentType.startsWith("video")
    ) {
      const response = await fetch(
        `https://api.trace.moe/search?url=${attachment.url}&anilistInfo`
      ).then((r) => r.json());

      if (response.result?.length > 0) {
        const mostAccurate = response.result[0];
        if (mostAccurate.similarity < 0.8)
          return message.reply("Couldn't find good enough match");
        const fromMinutes = Math.round(mostAccurate.from / 60);
        const fromSeconds = Math.round(mostAccurate.from % 60);
        const embed = new MessageEmbed({
          title: mostAccurate.anilist.title.english,
          fields: [
            { name: "Episode", value: `${mostAccurate.episode}` },
            {
              name: "Time",
              value: `${fromMinutes < 10 ? "0" + fromMinutes : fromMinutes}:${
                fromSeconds < 10 ? "0" + fromSeconds : fromSeconds
              }`,
            },
          ],
          image: { url: mostAccurate.image },
        });

        message.channel.send({ embeds: [embed] });
      }
      else message.reply('No results found')
    }
  },
};
