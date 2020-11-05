require("dotenv").config()
const Genius = new (require("genius-lyrics")).Client(process.env.GENIUS);
module.exports = {
  "name": "lyrics",
  "description": "Get lyrics of your favourite song!",
  "args": true,
  "hidden": false,
  "argsWzor": "<song name>",
  "aliases": ["ly"],

  async run(message, args, client) {
    const query = args.join(" ");
    try{
    const data = await Genius.songs.search(query,{limit:1});
    
    if(!data | !data[0]) return message.channel.send("❌ No Lyrics was found.");

    const lyrics = await data[0].lyrics();
    if (!lyrics) return message.channel.send("❌ No Lyrics was found.");
    
    message.channel.send(lyrics, { code: true, split: true });
    }
    catch(err){
        return message.channel.send("❌ No Lyrics was found.")
    }
  }
}