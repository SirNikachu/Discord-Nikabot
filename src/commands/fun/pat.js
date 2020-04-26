const Discord = require('discord.js');
const superagent = require('superagent');

module.exports = {
    config: {
        name: "pat",
        usage: "!pat <user>",
        description: "pats a user!!",
        permissions: "none"
    },
    run: async (bot, message, args, tools) => {
        if (!message.mentions.users.first()) return message.reply("You need to mention someone to pat them");
        if (message.mentions.users.first().id === "482128001828651008") return message.channel.send('<a:yayyy:497742636439044096>');
        const { body } = await superagent
        .get("https://nekos.life/api/pat");
        
        const embed = new Discord.RichEmbed()
        .setColor("#ff9900")
        .setTitle(`OwO, ${message.author.username} patted ${message.mentions.users.first().username}`)
        .setImage(body.url) 
        message.channel.send({embed})
    }
}