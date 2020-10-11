const Discord = require('discord.js');
require('dotenv').config();
const fs = require('fs');
//const mongoose = require(`mongoose`);
const PREFIX = '(';

const client = new Discord.Client();

/*mongoose.connect(`mongodb+srv://Bot:${process.env.dbpass}@discordbot.xhsms.mongodb.net/guilds?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
*/

client.on('ready', () => {
  console.log(`Zalogowano jako ${client.user.tag}`);
  client.user.setStatus('available')

  const updateInterval = setInterval(() => {
    client.user.setActivity(`Prefix: ( | Serwers: ${client.guilds.cache.size}`, {
      type: 'WATCHING'
    });
  }, 120000)

});
client.on(`disconnect`, () => {
  clearInterval(updateInterval)
  client.stopTyping()
})


client.commands = new Discord.Collection();
const Folders = fs.readdirSync('./commands/', {
  withFileTypes: true
}).filter(file => file.isDirectory()).map(dirent => dirent.name);



Folders.forEach(folder => {

  const Files = fs.readdirSync(`./commands/${folder.toString()}`).filter(file => file.endsWith(`command.js`))
  Files.forEach(command => {
    const comand = require(`./commands/${folder}/${command}`)

    if (comand.name) {
      client.commands.set(comand.name, comand)
    }
  })

})

client.on('message', message => {


  if (!message.content.startsWith(PREFIX) || message.author.bot) {
    return;
  }
  let args = message.content.slice(PREFIX.length).trim().split(" ");
  let cmdName = args[0].toLowerCase();
  const cmd = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
  args.shift();

  if (!cmd) {
    return;
  }
  if ((args.length === 0) && cmd.args === true) {
    message.channel.send(`No args given here's a template: **${PREFIX}${cmdName} ${cmd.argsWzor}**`)
    return;
  }

  try {
    cmd.run(message, args, client);
  } catch (error) {
    console.log(error)
  }
});

client.login(process.env.TOKEN);
client.on('error', error => {
  console.error(error)
  client.stopTyping()
});
client.on('warn', error => {
  console.warn(warn)
  client.stopTyping()
});