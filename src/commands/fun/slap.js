const superagent = require('superagent');
const Discord = require("discord.js");

module.exports = {
    config: {
        name: "slap",
        usage: "!slap",
        description: "slap someone!",
        permissions: "none"
    },
    run: async (bot, message, args) => {
        if (!message.mentions.users.first()) return message.reply("You need to mention someone to slap them");
    if(message.mentions.users.first().id === "676247426411266071") return message.reply('You can\'t hurt him you pleblord.:facepalm:');
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/slap");
    
    const embed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle(`OwO, ${message.mentions.users.first().username} You got slapped by ${message.author.username}`)
    .setImage(body.url) 
    message.channel.send({embed})
    }
}