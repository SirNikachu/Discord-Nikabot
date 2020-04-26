const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const ms = require("ms");

module.exports = {
    config: {
      name:"Clear Warns",
      usage: "!clearwarns",
      description: "Clear the warnings!",
      permissions: "none" 
    },
    run: async (bot, message, args) => {
        let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
        let user = message.mentions.users.first();
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("❌**Error:** You don't have the **Kick Members** permission!");
        if(message.mentions.users.size < 1) return message.reply('You must mention someone to clear their warns.').catch(console.error);
        if(!user) return message.reply("Couldn't find that user...");
        if(!warns[`${user.id}, ${message.guild.id}`]){
        warns[`${user.id}, ${message.guild.id}`] = {
            warns: 0
        };
    }
        let reason = `${warns[`${user.id}, ${message.guild.id}`].warns} warnings have been cleared for this person`;
        if(warns[`${user.id}, ${message.guild.id}`].warns > 0) {
            warns[`${user.id}, ${message.guild.id}`] = {
            warns: 0
        };
        }else{
            reason = 'This user doesn\'t have any warnings:wink:'
        };
    
        fs.writeFile("./warnings.json", JSON.stringify(warns), err => {
            if(err) throw err;
          });
    
        const embed = new Discord.RichEmbed()
        .setColor(0xFFFF01)
        .setTimestamp()
        .addField('Action:', 'Clear Warns', true)
        .addField('User:', `${user.username}#${user.discriminator}`, true)
        .addField('Result:',reason, true)
        .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
        message.channel.send({embed});
    }
}
