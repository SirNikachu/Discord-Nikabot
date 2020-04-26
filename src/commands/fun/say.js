const Discord = require("discord.js");

module.exports = {
    config: {
        name: "say",
        usage: "!say",
        description: "Repeats whatever you want!!",
        permissions: "none"
    },
    run: async (bot, message, args) => {
        if (message.content.startsWith("!say")) {
            message.channel.sendMessage(message.content.replace('!say ',''));
            let args = message.content.split(" ").slice(1);
            message.delete();
            };
    }
}