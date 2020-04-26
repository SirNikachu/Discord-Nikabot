const { readdirSync, lstatSync, readdir } = require("fs");
const logger = require("../utils/logger"); 

module.exports = (bot) => {
  const load = dirs => {
    const commands = readdirSync(`./src/commands/${dirs}/`).filter(d => d.endsWith('.js')); 

    for (let file of commands) {
      let pull = require(`../src/commands/${dirs}/${file}`);
      bot.commands.set(pull.config.name, pull);
      if (pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));
    };

  };
  readdir(`./src/commands/`, (err, directories) => {
    if (err) logger.error(err); 
    var dirArray = [];
    directories.forEach((f, i) => { 
      if (lstatSync(`./src/commands/${f}`)) {  
        dirArray.push(f);
      }
    });

    dirArray.forEach(x => load(x));
  });
};