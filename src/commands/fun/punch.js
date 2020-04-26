const Discord = require('discord.js');
const superagent = require('superagent');

module.exports = {
    config: {
        name: "punch",
        usage: "!punch <user>",
        description: "punches a user!!",
        permissions: "none"
    },
    run: async (bot, message, args, tools) => {
        var owner = "676247426411266071"
        let user = message.mentions.users.first();
        if (message.mentions.users.size < 1) return message.reply('You must mention someone to punch them.')
              if(user.id === owner){
                return message.reply("You can't hurt him you pleblord.");
        }else{
                message.reply('You have punched <@' + user.id + '>')
        }
    }
}