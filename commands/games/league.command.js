const fetch = require('node-fetch')
require('dotenv').config()
const fs = require('fs');
const {
    MessageAttachment
} = require('discord.js');

let champions;
let version;
const leagueDataURL = `https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner`;
const init = async () => {
    version = await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`).then(async res => {
        return await res.json();
    }).then(async json => {
        return await json[0];
    });
    champions = await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`).then(res => {
        return res
    }).then(json => {
        return json.json()
    })

}

const getChamps = setInterval(async () => {
    init();
    champions = await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`).then(res => {
        return res
    }).then(json => {
        return json.json()
    })
}, 86400000)



init();
module.exports = {
    "name": "league",
    "description": "League of Legends statistics and more...",
    "args": true,
    "hidden": false,
    "argsWzor": '<stats/rotations> <name>',
    "aliases": ["lol", "liga"],

    async run(message, args, client) {

        switch (args[0]) {
            case "stats":
            case "s":

                if (!args[1]) {
                    return message.reply(`You need to provide your League of Legends nick!`)
                }
                const user = await fetch(`https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${args[1]}?api_key=${process.env.riotKey}`).then(res => {
                    return res.json()
                })

                if (user.status && user.status.status_code !== 200) {
                    return message.channel.send(`I couldn't find user with this nickname <:Sadge:722852112349790238>`)
                }



                const leagueData = await fetch(`${leagueDataURL}/${user.id}?api_key=${process.env.riotKey}`).then(res => {
                    return res.json()
                })

                if (!leagueData[0]) {
                    return message.channel.send(`**${user.name}**'s level: **${user.summonerLevel}**\nNo rank data found!`, (new MessageAttachment(`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${user.profileIconId}.png`, `logo.png`)))
                }
                const tierEmote = getTierIcon(leagueData[0].tier)
                const avatar = new MessageAttachment(`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${user.profileIconId}.png`, `avatar.png`);
                const WinRate = (leagueData[0].wins / (leagueData[0].wins + leagueData[0].losses)).toPrecision(4) * 100;
                const embed = {
                    color: 0x095ff,
                    title: `${user.name}'s level: ${user.summonerLevel}`,
                    fields: [{
                        name: `League`,
                        value: `TIER: ${leagueData[0].tier} ${tierEmote} \nRank: ${leagueData[0].rank}\nWins: ${leagueData[0].wins}\nLoses: ${leagueData[0].losses}\nLeague Points: ${leagueData[0].leaguePoints}\nWinRate: ${WinRate}%`,
                        inline: true
                    }, {
                        name: `Champion Masteries`,
                        value: `${await bestChamp(user)}`,
                        inline: true
                    }],
                    thumbnail: {
                        url: `attachment://avatar.png`
                    }
                }
                message.channel.send({
                    files: [avatar],
                    embed: embed
                })
                break;
            case "rotation":
            case "rot":
            case "r":
                const rotationData = await fetch(`https://eun1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${process.env.riotKey}`).then(res => {
                    return res.json()
                });
                if (rotationData) {

                    championList = champions.data;
                    let freeChampions = [];
                    let freeChampionsNewPNames = [];
                    for (var i in rotationData.freeChampionIds) {
                        for (var y in championList)
                            if (championList[y].key.startsWith(rotationData.freeChampionIds[i])) {
                                freeChampions.push(championList[y].name);
                            }
                    }
                    freeChampions.join(`\n`)
                    for (var i in rotationData.freeChampionIdsForNewPlayers) {
                        for (var y in championList)
                            if (championList[y].key.startsWith(rotationData.freeChampionIdsForNewPlayers[i])) {
                                freeChampionsNewPNames.push(championList[y].name)
                            }
                    }
                    freeChampionsNewPNames.join('\n')
                    let embed = {
                        color: 0x095ff,
                        title: `Today's champion rotations are`,
                        fields: [{
                                name: `For everyone`,
                                value: freeChampions,
                                inline: true,
                            },
                            {
                                name: `For new players`,
                                value: freeChampionsNewPNames,
                                inline: true
                            }
                        ],
                        footer: {
                            text: `Max new player level: ${rotationData.maxNewPlayerLevel}`,
                            icon_url: `http://vignette4.wikia.nocookie.net/roblox/images/0/05/Noob_character.png/`,
                        },
                    }
                    return message.channel.send({
                        embed: embed
                    })
                } else {
                    return message.reply(`I couldn't fetch data from riot servers!`)
                }

                break;
        }
    }

}

const getTierIcon = (tier) => {

    emotes = [`<:SILVER:756983469292126229>`, `<:PLATINUM:756983483603353690>`, `<:MASTER:756983498509910116>`, `<:IRON:756983486434246767>`, `<:GRANDMASTER:756983498832871555>`, `<:GOLD:756983498312777819>`, `<:DIAMOND:756983498937729154>`, `<:BRONZE:756983492419518516>`, `<:CHALLANGER:756983499637915739>`]


    for (iconName in emotes) {
        const tempname = (emotes[iconName]).toLowerCase()
        if (tempname.indexOf(tier.toLowerCase()) > 0) {
            return (emotes[iconName])
        }

    }
}


const bestChamp = async (user) => {
    let MysteryData = await fetch(`https://eun1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${user.id}?api_key=${process.env.riotKey}`).then(async json => {
        return await json.json()
    });
    let temp1 = [];
    let temp2 = [];
    for (var i = 0; i <= 4; i++) {
        if (MysteryData[i] !== undefined) {
            const obj = {
                championId: MysteryData[i].championId,
                level: MysteryData[i].championLevel
            }
            temp1.push(obj);
        }
    }
    championList = champions.data;
    for (var i in championList) {

        for (var j = 0; j <= 4; j++) {
            //console.log(championList[i].id + " | " + championList[i].key + " | " + temp1[j])
            if (championList[i].key.startsWith(temp1[j].championId)) {
                let obj = {
                    name: championList[i].name,
                    level: temp1[j].level
                }
                temp2.push(obj)
            }
        }
    }
    temp2.sort(function (a, b) {
        return b.level - a.level;
    })

    for (i in temp2) {
        var text = `${text?text:``}\nName: **${temp2[i].name}**, Level: **${temp2[i].level}**`;
    }

    return (text)
}