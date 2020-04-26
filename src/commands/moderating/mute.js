const Discord = require('discord.js');
const ms = require("ms");

module.exports = {
    config: {
        name: "mute",
        usage: "!mute <user>",
        description: "mute a user!!",
        permissions: "none"
    },
    run: async (bot, message, args, tools) => {
        let tomute = message.mentions.users.first() || message.guild.members.get(args[0]);
        if(!tomute) return message.reply("Couldn't find dat boi.");
        if(message.author.id === message.mentions.users.first()) return message.reply("You can't mute yourself:facepalm:");
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have the permission to do that:facepalm:");
        let muteRole = message.guild.roles.find(`name`, "Muted");
        if (!muteRole) {
            try {
                muteRole = await message.guild.createRole({
                    name:"Muted",
                    color: "#000000",
                    permissions:[]
                });
        
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muteRole, {
                        SEND_MESSAGES: false,
                        MANAGE_MESSAGES: false,
                        READ_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch(e) {
                console.log(e.stack);
            }
        }
        
        const embed = new Discord.RichEmbed()
        .setColor(0x00FFFF)
        .setTimestamp()
        .addField('Action:', 'Muted')
        .addField('User:', `${tomute.username}#${tomute.discriminator} (${tomute.id})`)
        .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
        message.channel.send({embed});
        message.guild.member(tomute).addRole(muteRole);
    }
}