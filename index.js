const Discord = require('discord.js');
const dotenv = require('dotenv').config();
const fs = require('fs');

const PREFIX = '(';

const client = new Discord.Client();
client.on('ready', () => {
  console.log(`Zalogowano jako ${client.user.tag}`);
  client.user.setStatus('available')
  client.user.setActivity('prefix (', {
    type: 'PLAYING'
  });

});



client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.command.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  if (command.name) {
    client.commands.set(command.name, command)
  }
}

client.on('message', message => {
  //SearchForBadWord(message);

  if (!message.content.startsWith(PREFIX) || message.author.bot) {
    return;
  }
  let args = message.content.slice(PREFIX.length).trim().split(" ");
  let cmdName = args[0]
  args.shift();

  if (!client.commands.has(cmdName)) {
    return;
  }
  if ((args.length === 0) && client.commands.get(cmdName).args === true) {
    message.channel.send(`Nie podano argumentów, wzór: **${PREFIX}${cmdName} ${client.commands.get(cmdName).argsWzor}**`)
    return;
  }

  try {
    client.commands.get(cmdName).run(message, args, client);
  } catch (error) {
    console.log(error)
  }
});

client.login(process.env.token);
client.on('error', error => {
  console.error(error)
});
client.on('warn', error => {
  console.warn(warn)
});

function SearchForBadWord(mzg) {
  if (mzg.content.search('debil') >= 0 || mzg.content.search('śmiec') >= 0) {
    mzg.channel.send(`Kto przezywa ten się tak sam nazywa ${mzg.author.tag}`);

    if (mzg.guild.me.permissionsIn(mzg.channel).has('MANAGE_NICKNAMES')) {
      mzg.guild.member(mzg.author).setNickname('debil', "przezywanie ludzi").catch(err => {})
    } else {
      mzg.channel.send("Nie mam uprawnień do zmiany nicków").then(y => {
        y.delete({
          timeout: 2000
        })
      })

    }
  }
}