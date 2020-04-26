const { fullHelp } = require("../../../utils/usage");

module.exports = {
    config: {
        name: "8ball",
        usage: "!8ball <question>",
        description: "Get a cheesy answer to a question",
        permissions: "none"
    },
    run: async (bot, message, args) => {
        if (args[0] == "help") { 
            let embed = fullHelp(bot, "8ball");
            return message.channel.send(embed);
        }
        let cmd = message.content.split(" ")[0];
        if(!args[2]) return message.channel.send(`Please ask a full question. \n Command Syntax: ${cmd} (question)`);
        //questions should be at least 3 words long

        let replies = 
        [
         "Yes.",
         "No.", 
         "I don't know.",
         "Ask again later!", 
         "I refuse to answer this!",
         "no u boi",
         "tHaTs wHaT sHe SaId", 
         `It is certain`,
         `Without a doubt`,
         `You may rely on it`,
         `Yes definitely`,
         `It is decidedly so`,
         `As I see it, yes`,
         `Most likely`,
         `Yes`,
         `Outlook good`,
         `Signs point to yes`,
         `Don’t count on it`,
         `Outlook not so good`,
         `My sources say no`,
         `Very doubtful`,
         `My reply is no`,
        ];

        let result = Math.floor((Math.random() * replies.length)); 
        return message.channel.send(replies[result]);
    }
}