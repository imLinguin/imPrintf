module.exports = {
    "name": "vcroll",
    "description": "Allows you to randomly pick user from Voice Chat",
    "args": false,
    "hidden": true,
    "argsWzor": "<channelID/nothing>",
    "aliases": [],

    async run(message, args, client) {
        let author = message.member;
        let channelID = args[0];
        let channel;
        if(channelID)
        {
            channel = await message.guild.channels.resolve(channelID);
        }
        else{
            if(!author.voice.channel)
            {
                return message.reply("You need to provide a voice channelID or be in a voice channel!");
            }
            channel = author.voice.channel;
        }

        if(channel.type !== "voice")
        {
            return message.reply("Providen ID is invalid");
        }

        let users = channel.members.array();
        return message.channel.send("I've picked: "+ users[Math.floor(Math.random() * users.length)].user.username);
        
    }

}
