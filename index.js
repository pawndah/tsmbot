const config = require("./config.json");
      Discord = require("discord.js");
      bot = new Discord.Client({disableEveryone: false});
      db = require("quick.db");
      fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files)=> {
  if (err) console.error(err);
  let jsfiles = files.filter(f => f.split('.').pop() === 'js');
  if(jsfiles.length <= 0) {
      console.log('No commands to load!');
      return;
    }
    console.log(`Loading a Total of ${files.length} commands.`)
    jsfiles.forEach(f => {
      let props = require(`./commands/${f}`);
      console.log(`Loaded ${f} Successfully.`);
      bot.commands.set(props.help.name , props);
    });
  });

bot.on("ready", async () => {

  let status = `-invite | -help`;
  setInterval(function() {

    bot.user.setActivity(status, {type: `playing`});
  }, 25000)
});
bot.on("guildMemberAdd", async () => {

  let status = `${bot.users.size}+ Users`;
  bot.user.setActivity(status, {type: `watching`});
});
bot.on("guildCreate", async (guild) => {

  let status = `${bot.guilds.size}+ Servers`;
  bot.user.setActivity(status, {type: `listening`});
});
   bot.on("message", async message => {

    const sender = message.author;
    const msg = message.content.toLowerCase();
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let prefix = config.prefix;
	  if(!msg.startsWith(prefix)) return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
  });
bot.login(config.token);
