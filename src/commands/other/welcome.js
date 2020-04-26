const { RichEmbed } = require("discord.js");
const { prefix } = require("../../loaders/reader") //get prefix from botconfig
const usage = require("../../../utils/usage.js"); //better help-messages
const errors = require("../../../utils/errors.js"); //better errors

module.exports = {
    config: {
        name: "welcome",
        usage: "!welcome <user>",
        description: "Welcome a user to the Server!!",
        permissions: "member"
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return message.channel.send("This command only works in a server!");

        let cmd = message.content.split(" ")[0].replace(prefix, '');
        if(args[0] == "help") return message.channel.send(usage.fullHelp(bot, cmd));

        let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!wUser) return errors.cantfindUser(message.channel);

        let wReason = args.join(" ").slice(22);
        if(!wReason) wReason = "Because We Can!";

        let welcomeembed = new RichEmbed()
        .setDescription("~Welcome to the Server!!~")
        .setColor("#"+((1<<24)*Math.random()|0).toString(16))
        .setThumbnail(bot.user.displayAvatarURL) 
        .addField("Server Name", message.guild.name)
        .addField("Welcomed User", `${wUser} with ID ${wUser.id}`)
        .addField("Total Members", message.guild.memberCount)
        .addField("Comments?", "Make sure to follow the rules and have fun!");
        message.channel.send(welcomeembed);
    }
}