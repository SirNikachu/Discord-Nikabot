const Discord = require('discord.js');
const superagent = require('superagent');


module.exports = {
    config: {
        name: "tickle",
        usage: "!tickle <user>",
        description: "tickles a user!!",
        permissions: "none"
    },
    run: async (bot, message, args, tools) => {
        if (!message.mentions.users.first()) return message.reply("You need to mention someone to tickle them");
        const { body } = await superagent
        .get("https://nekos.life/api/v2/img/tickle");
        
        const embed = new Discord.RichEmbed()
        .setColor("#ff9900")
        .setTitle(`OwO, ${message.author.username} tickled ${message.mentions.users.first().username}`)
        .setImage(body.url) 
        message.channel.send({embed})
    }
}