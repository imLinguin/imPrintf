module.exports = {
    "name": "clear",
    "description": "Clears specific amount of messages max is 100. I'll try to hack it.",
    "args": true,
    "hidden": false,
    "argsWzor": "<liczba>",
    "aliases": ["cc"],
    run(message, args, client) {
        if (!isNaN(args[0])) {
            if (message.member.hasPermission('MANAGE_MESSAGES')) {
                if (message.guild.me.hasPermission('MANAGE_MESSAGES')) {
                    message.channel.bulkDelete(args[0], true).then(messages => {
                        message.channel.send(`✅ Usunięto ${messages.size} wiadomości`).then(mzg => {
                            mzg.delete({
                                timeout: 5000
                            })
                        });
                    });


                } else {
                    message.reply("Nie mam uprawnień, potrzebne uprawnienia to Zarządzanie Wiadomościami")
                }
            } else {
                message.reply('Nie masz uprawnień')
            }
        } else {
            message.reply('Musisz podać liczbę');
        }
    }
}