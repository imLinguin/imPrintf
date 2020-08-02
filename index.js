const dotenv = require('dotenv').config();
const Discord = require('discord.js');
const {
  MessageEmbed,
  Collection
} = require('discord.js');
const client = new Discord.Client();
const PREFIX = '('
client.on('ready', () => {
  console.log(`Zalogowano jako ${client.user.tag}!`);
  client.user.setActivity("prefix ( ").catch(console.error);
});



const fs = require("fs");
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  if (command.name) {
    client.commands.set(command.name, command)
  }
}

client.on('message', msg => {
  if (!msg.content.startsWith(PREFIX)) {
    return;
  }
  let args = msg.content.substring(PREFIX.length).split(" ");

  if (!client.commands.has(args[0])) {
    return;
  }

  try {
    client.commands.get(args[0]).run(msg, args);
  } catch (error) {
    console.log(error)
  }

});

client.login(process.env.token);