const Discord = require('discord.js')
module.exports = {
  name: "mute",
  description: "mute command",

  async run(bot, message, args) {
    const mentionMember = message.mentions.members.first();
    const embed = new Discord.MessageEmbed()
      .setColor(0xef5c50)
      .setDescription(`${mentionMember} has been muted!`)
    if (message.content.startsWith("aa.mute")) {
      if (message.member.hasPermission("ADMINISTRATOR")) {
        let member = message.mentions.members.first();
        if (!member) message.channel.send("Please mention a user!");
        else {
          member.roles.add("872026223746895963");
          message.channel.send(embed);
        }
      } else {
        message.reply("You don't have permission to do that!");
      }
    }
  }
}