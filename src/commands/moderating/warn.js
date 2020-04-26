const errors = require("../../../utils/errors.js"); //better errors
const fs = require("fs");
const ms = require("ms");
const Discord = require('discord.js');
const client = new Discord.Client();


module.exports = {
    config: {
        name: "warn",
        usage: "!warn <user> <reason>",
        description: "Somebody misbehaving? Try warning them",
        permissions: "administrator"
    },
    run: async (bot, message, args) => {
        let reason = args.slice(1).join(' ');
        let user = message.mentions.users.first();
        let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
        //let logchannel = message.guild.channels.find('name', 'logs');
        if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);
        
        if (message.mentions.users.first().id === message.author.id) return message.reply('I can\' let you do that, self-harm is bad:facepalm:');
        if (message.mentions.users.first().id === "676247426411266071") return message.reply("You can't warn my Developer:wink:");
        //if (!logchannel) return message.channel.send('I cannot find a logs channel');
        if (reason.length < 1) reason = 'No reason supplied.';
  
        if(!warns[`${user.id}, ${message.guild.id}`]) warns[`${user.id}, ${message.guild.id}`] = {
        warns: 0
        };

  warns[`${user.id}, ${message.guild.id}`].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), err => {
    if(err) throw err;
  });

  const embed = new Discord.RichEmbed()
  .setColor(0xFFFF00)
  .setTimestamp()
  .addField('Action:', 'Warning')
  .addField('User:', `${user.username}#${user.discriminator}`)
  .addField('Warned by:', `${message.author.username}#${message.author.discriminator}`)
  .addField('Number of warnings:', warns[`${user.id}, ${message.guild.id}`].warns)
  .addField('Reason', reason)

  let logchannel = message.guild.channels.find('name', 'logs');
  if  (!logchannel){
    message.channel.send({embed})
  }else{
    client.channels.get(logchannel.id).send({embed});
    message.channel.send({embed})
  }
  if(user.bot) return;
  message.mentions.users.first().send({embed}).catch(e =>{
    if(e) return 
  });

}
}