const Discord = require('discord.js')
module.exports = {
    name: "unmute",
    description: "unmute command",

    async run (bot, message, args) {
      const mentionMember = message.mentions.members.first();
      const testing = new Discord.MessageEmbed()
      .setColor(0xFF0000)
      .setDescription(`<@${mentionMember.id}> has been unmuted!`)
      if (message.content.startsWith("aa.unmute")) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
          let member = message.mentions.members.first();
          if (!member) message.channel.send("mention someone to unmute!");
          else {
            member.roles.remove("872411910799233044");
            message.channel.send(testing);
            message.channel.send({ embed });
          }
        } else {
          message.reply("You don't have permission to do that!");
        }
      }
    }
  }