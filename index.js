const Discord = require("discord.js");
require("dotenv").config();
const fs = require("fs");
const mongoose = require(`mongoose`);
const client = new Discord.Client();
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

client.commands = new Discord.Collection();
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
client.login(process.env.TOKEN);
client.on("error", (error) => {
  console.error(error);
  client.stopTyping();
});
client.on("warn", (error) => {
  console.warn(warn);
  client.stopTyping();
});
