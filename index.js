const Discord = require('discord.js');
const bot = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const {
    token
} = require('./config.json');
const {
    readdirSync,
    read
} = require('fs');
const {
    join
} = require('path');
//------------------------------------------------------------------------------
bot.commands = new Discord.Collection();
//------------------------------------------------------------------------------
const prefix = 'aa.';
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    bot.commands.set(command.name, command);
}
bot.on("error", console.error);
//------------------------------------------------------------------------------
bot.on('ready', () => {
    console.log('Bot is ready!');
    bot.user.setStatus('idle');
    bot.user.setActivity('Input Commands!', {
        type: "WATCHING"
    }).catch(console.error)
})
//------------------------------------------------------------------------------
bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        if (!bot.commands.has(command)) return;
        try {
            bot.commands.get(command).run(bot, message, args);
        } catch (error) {
            console.error(error);
        }
    }
})
//------------------------------------------------------------------------------------------------
bot.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.id === '872443920376795167') {
        if (reaction.emoji.name === '✅') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('865807637945778216')
            user.send('You have obtained a role!')
        }
    }
})
bot.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.id === '872443920376795167') {
        if (reaction.emoji.name === '✅') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('865807637945778216')
            user.send('One of your roles has been removed!')
        }
    }
})
//------------------------------------------------------------------------------------------------

bot.login(token);