module.exports = {
    "name": "clear",
    "description": "Czyści określoną liczbę wiadomości",
    "args": true,
    "argsWzor": "<liczba>",
    run(msg, args) {
        if (!isNaN(args[0])) {
            if (msg.member.hasPermission('MANAGE_MESSAGES')) {
                if (msg.guild.me.hasPermission('MANAGE_MESSAGES')) {
                    msg.channel.bulkDelete(args[0]).then(messages => {
                        msg.channel.send(`✅ Usunięto ${messages.size} wiadomości`).then(mzg => {
                            mzg.delete({
                                timeout: 3000
                            })
                        });
                    });


                } else {
                    msg.reply("Nie mam uprawnień, potrzebne uprawnienia to Zarządzanie Wiadomościami")
                }
            } else {
                msg.reply('Nie masz uprawnień')
            }
        } else {
            msg.reply('Musisz podać liczbę');
        }
    }
}