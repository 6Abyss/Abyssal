const Discord = require('discord.js')
module.exports = {
  name: "unmute",
  description: "unmute command",

  async run(bot, message, args) {
    const mentionMember = message.mentions.members.first();
    const testing = new Discord.MessageEmbed()
      .setColor(0xef5c50)
      .setDescription(`${mentionMember} has been unmuted!`)
    if (message.content.startsWith("aa.unmute")) {
      if (message.member.hasPermission("ADMINISTRATOR")) {
        let member = message.mentions.members.first();
        if (!member) message.channel.send("mention someone to unmute!");
        else {
          member.roles.remove("872026223746895963");
          message.channel.send(testing);
          };
      } else {
        message.reply("You don't have permission to do that!");
      }
    }
  }
}