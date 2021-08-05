const Discord = require('discord.js')
module.exports = {
    name: "mute",
    description: "mute command",

    async run (bot, message, args) {
        const mentionMember = message.mentions.members.first();
        const testing = new Discord.MessageEmbed()
        .setColor(0xFF0000)
        .setDescription(`<@${mentionMember.id}> has been muted!`)
if (message.content.startsWith("aa.mute")) {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      let member = message.mentions.members.first();
      if (!member) message.channel.send("Please mention a user!");
      else {
        member.roles.add("872411910799233044");
        message.channel.send(testing);
      }
    } else {
      message.reply("You don't have permission to do that!");
    }
}
    } 
}