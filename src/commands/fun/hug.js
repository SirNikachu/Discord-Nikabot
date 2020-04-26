const Discord = require('discord.js');
const superagent = require('superagent');

module.exports = {
    config: {
        name: "hug",
        usage: "!hug <user>",
        description: "hugs a user!!",
        permissions: "none"
    },
    run: async (bot, message, args, tools) => {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to hug them");
    const { body } = await superagent
    .get("https://nekos.life/api/hug");
    
    const embed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle(`OwO, ${message.author.username} hugged ${message.mentions.users.first().username}`)
    .setImage(body.url) 
    message.channel.send({embed})
    }
}