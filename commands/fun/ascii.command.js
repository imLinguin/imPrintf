const figlet = require("figlet")
module.exports = {
    name: "ascii",
    description: "Returns Asci representation of text",
    args: true,
    hidden: false,
    argsWzor: "<text>",
    aliases: ["figlet"],
  
    run(message, args, client) {
        const text = args.join(" ")
        figlet(text,(err,data)=>{
            if(err)
            {
                return message.reply(err);
            }
            message.channel.send(data,{code:true})
        });
    
    },
}
  