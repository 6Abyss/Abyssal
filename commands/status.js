const Discord = require('discord.js')
const prefix = "aa."

module.exports = {
  name: "status",
  description: "status command",
  async run(bot, message, args) {
    if (!message.member.hasPermission('MANAGE_MESSAGES'))
    return message.channel.send("You cant use this command since you're missing `manage_messages` perm").then((sent) => {
      setTimeout(function () {
        sent.delete();
      }, 2500);
            });
    if (message.content.startsWith(prefix + "status")) {
      if (!message.guild) return;
      const embed = new Discord.MessageEmbed()
      .setColor(0xef5c50)
      .setAuthor("Product Status")
      .setFooter('Abyssal.cc')
      .setDescription("🟢 • Steady & Undetected\n🔵 • Unavailable & Unstable\n🔴 • Detected & Unusable\n \n*Please read and follow the status (updated daily)*")
      message.channel.send(embed);
    }
  }
}