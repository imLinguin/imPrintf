const { Collection, Client, Intents } = require("discord.js");
require("dotenv").config({ path: __dirname + "/.env" });
const fs = require("fs");
const mongoose = require(`mongoose`);
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS] });
//connect to DB
mongoose.connect(
  `mongodb+srv://Bot:${process.env.dbpass}@discordbot.xhsms.mongodb.net/discordBot?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
/*mongoose.connect(`mongodb://localhost:27017/printf`,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})*/
// Registering message context menu
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = [{
  "name": "Vote",
  "type": 3
}]

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Started refreshing application commands.');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application commands.');
  } catch (error) {
    console.error(error);
  }
})();

// Registering commands to collection, and client
client.commands = new Collection();
const Folders = fs
  .readdirSync("./commands/", {
    withFileTypes: true,
  })
  .filter((file) => file.isDirectory())
  .map((dirent) => dirent.name);

Folders.forEach((folder) => {
  const Files = fs
    .readdirSync(`./commands/${folder.toString()}`)
    .filter((file) => file.endsWith(`command.js`));
  Files.forEach((command) => {
    const comand = require(`./commands/${folder}/${command}`);

    if (comand.name) {
      client.commands.set(comand.name, comand);
    }
  });
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error;
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const evt = require(`./events/${file}`);
    let evtName = file.split(".")[0];
    console.log("Event loaded ", file);
    client.on(evtName, evt.bind(null, client));
  });
});

client.on("error", (error) => {
  console.error(error);
  client.stopTyping();
});
client.on("warn", (error) => {
  console.warn(warn);
  client.stopTyping();
});
client.login(process.env.TOKEN);