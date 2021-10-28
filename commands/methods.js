const Discord = require('discord.js')
const prefix = "aa."

module.exports = {
  name: "methods",
  description: "methods command",
  async run(bot, message, args) {
    if (!message.member.hasPermission('MANAGE_MESSAGES'))
    return message.channel.send("You cant use this command since you're missing `manage_messages` perm").then((sent) => {
      setTimeout(function () {
        sent.delete();
      }, 2500);
            });
    if (message.content.startsWith(prefix + "methods")) {
      if (!message.guild) return;
      const embed = new Discord.MessageEmbed()
      .setColor(0xef5c50)
      .setAuthor("Payment Methods")
      .setDescription("💰 • Cashapp\n🅿️ • Paypal\n🔵 • Venmo\n💻 • Bitcoin\n💻 • Etherium\n \n*If you cannot use any of these methods please make a ticket*")
      .setFooter('Abyssal.cc')
      message.channel.send(embed);
    }
  }
}