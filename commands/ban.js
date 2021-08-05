const Discord = require('discord.js')

module.exports = {
    name: "ban",
    description: "ban command",

    async run (bot, message, args) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You cant use this command!")

        const mentionMember = message.mentions.members.first();
        let reason = args.slice(1).join(" "); //.ban <args(0) aka @member> | <args(1) aka reason>
        if (!reason) reason = "No reason given";

        const embed = new Discord.MessageEmbed()
        .setTitle(`You were banned from **${message.guild.name}**`)
        .setDescription(`Reason: ${reason}`)
        .setColor(0xFF0000)
        .setTimestamp()
        .setFooter(bot.user.tag, bot.user.displayAvatarURL())
        
        const testembed = new Discord.MessageEmbed()
        .setTitle("Abyss Bot Moderation")
        .setDescription(`**<@${mentionMember}>** has been banned! **Reason**: ${reason}`)
        .setColor(0xFF0000)

        if (!args[0]) return message.channel.send("You need to specify a user to ban");

        if(!mentionMember) return message.channel.send("Invalid User");

        if(!mentionMember.bannable) return message.channel.send("I was unable to ban this user!");

        await mentionMember.send(embed);
        await message.channel.send(testembed);
        await mentionMember.ban({
            reason: reason
        })
    }
}
