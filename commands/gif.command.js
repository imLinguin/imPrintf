const fetch = require('node-fetch');
const trendingUrl = 'https://api.tenor.com/v1/trending?key=V37IT23T7QBQ&locale=pl_PL&limit=20';
const randomUrl = 'http://api.tenor.com/v1/random?key=V37IT23T7QBQ&q=smiech&locale=pl_PL&limit=20';
const {
    MessageAttachment,
    MessageFlags
} = require('discord.js');
module.exports = {
    "name": "gif",
    "description": "daje gify",
    "args": true,
    "argsWzor": "<trending/random/search/info> <fraza(jeśli_search)>",

    run(message, args) {
        switch (args[0]) {
            case 'trending':
                Trending(message);
                break;
            case 'random':
                Random(message);
                break;
            case 'search':
                Search(message, args);
                break;
            case 'info':
                Info(message);
                break;
            default:
                message.channel.send('Byczq coś ci się argumenty nie ten tego');
                break;
        }
    }
}

async function Trending(msg) {
    await fetch(trendingUrl).then(res => {
        return res.json()
    }).then(json => {
        try {
            //console.log(json.results[0].media[0].tinygif.url)
            var pom = new MessageAttachment(json.results[Math.floor((Math.random() * 20) + 1)].media[0].tinygif.url);
            msg.channel.send(pom);
        } catch (err) {
            msg.channel.send("Wystąpił błąd");
        }
    }).catch();

}
async function Random(msg) {
    await fetch(randomUrl).then(res => {
        return res.json()
    }).then(json => {

        try {
            var pom = new MessageAttachment(json.results[Math.floor((Math.random() * 20) + 1)].media[0].tinygif.url);
            msg.channel.send(pom);
        } catch (err) {
            msg.channel.send("Wystąpił błąd");
        }
        //console.log(pom)
    }).catch();

}

async function Search(msg, arg) {

    let tem = arg;
    let tem2 = '';
    tem.shift();
    tem2 = tem.join('%20');

    if (tem2.indexOf('ą') != -1 || tem2.indexOf('ć') != -1 || tem2.indexOf('ź') != -1 || tem2.indexOf('ż') != -1 || tem2.indexOf('ó') != -1 || tem2.indexOf('ę') != -1 || tem2.indexOf('ś') != -1 || tem2.indexOf('ń') != -1 || tem2.indexOf('ł') != -1) {
        msg.reply("Wyszukiwanie nie może zawierać polskich znaków bo przeglądarka wybucha NotLikeThis");
        return;
    }
    const url = `https://api.tenor.com/v1/search?key=V37IT23T7QBQ&q=${tem2}&locale=pl_PL&limit=20`
    await fetch(url).then(res => {
        return res.json()
    }).then(json => {

        try {
            var pom = new MessageAttachment(json.results[Math.floor((Math.random() * 20) + 1)].media[0].tinygif.url);
            msg.channel.send(pom);
        } catch (err) {
            msg.channel.send('Wystąpił błąd');
        }
    }).catch();
}

function Info(msg) {
    msg.reply("Świetne gify dostarcza `TENOR`");
}