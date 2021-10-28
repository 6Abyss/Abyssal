const Discord = require('discord.js');
const bot = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const enmap = require('enmap');
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

const settings = new enmap({
    name: "settings",
    autoFetch: true,
    cloneLevel: "deep",
    fetchAll: true
});
const disbut = require('discord-buttons')(bot);

const { MessageButton, MessageActionRow } = require('discord-buttons')
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
    reaction.message.react('✅')
    if (!reaction.message.guild) return;
    if (reaction.message.id === '879031620303200257') {
        if (reaction.emoji.name === '✅') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('798688954240466964')
            user.send('Verified Role has been given')
        }
    }
})
bot.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    reaction.message.react('✅')
    if (reaction.message.id === '879031620303200257') {
        if (reaction.emoji.name === '✅') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('798688954240466964')
            user.send('Verified Role has been removed')
        }
    }
})
//------------------------------------------------------------------------------------------------
bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command == "ticket-setup") {
        let channel = message.mentions.channels.first();
        if (!channel) return message.reply("Usage: `aa.ticket-setup #channel`");

        let sent = await channel.send(new Discord.MessageEmbed()
            .setTitle("Support Ticket")
            .setDescription("React to speak to staff!")
            .setFooter("Abyssal.cc")
            .setColor("ef5c50")
        );

        sent.react('🎫');
        settings.set(`${message.guild.id}-ticket`, sent.id);

        message.channel.send("Ticket System Setup Done!")
    }

    if (command == "close") {
        if (!message.channel.name.includes("ticket-")) return message.channel.send("You cannot use that here!")
        message.channel.delete();
    }
});


bot.on('messageReactionAdd', async (reaction, user) => {
    if (user.partial) await user.fetch();
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();
    if (user.bot) return;
    let ticketid = await settings.get(`${reaction.message.guild.id}-ticket`);
    if (!ticketid) return;
    if (reaction.message.id == ticketid && reaction.emoji.name == '🎫') {
        reaction.users.remove(user);

        reaction.message.guild.channels.create(`ticket-${user.username}`, {
            permissionOverwrites: [{
                    id: user.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                },
                {
                    id: '798691322704953385',
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS']
                },
                {
                    id: reaction.message.guild.roles.everyone,
                    deny: ["VIEW_CHANNEL"]
                }
            ],
            type: 'text'
        }).then(async channel => {
            channel.send(`<@${user.id}>` + `<@&798691322704953385>`, new Discord.MessageEmbed().setTitle("Welcome to your ticket!").setDescription("Please follow the format in this ticket, Do not tag staff or anyone in this ticket. If it has been more than 24hr since the last reply from your ticket you may tag staff. You can use aa.close at any time to close the ticket." + "\n" + "\n" + "**Your Order-ID**:" + "\n" + "**What you are making a ticket for**:" + "\n" + "\n" + "*If you do not follow format this ticket could be closed. If not please specify what this ticket is being made for!*").setColor("ef5c50"))
console.log();
});
    }
})




bot.login(token);