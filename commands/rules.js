const Discord = require('discord.js')
const prefix = "aa."

module.exports = {
  name: "rules",
  description: "rules command",
  async run(bot, message, args) {
    if (!message.member.hasPermission('MANAGE_MESSAGES'))
    return message.channel.send("You cant use this command since you're missing `manage_messages` perm").then((sent) => {
      setTimeout(function () {
        sent.delete();
      }, 2500);
            });
    if (message.content.startsWith(prefix + "rules")) {
      if (!message.guild) return;
      const embed = new Discord.MessageEmbed()
      .setColor(0xef5c50)
      .setAuthor("Discord Rules")
      .setDescription("• Do not spam \n• Do not @ staff members or carriers \n• Chargebacks will be banned \n• No Refunds for any reason \n• What carry says goes \n• No recording or streaming of anything \n• We are not responsible for any bans or suspensions caused by us or our products and will provide no compensation. \n• Rules can be added, changed or removed \n \n *A violation of these rules will result in an immediate ban from our services.*")
      .setFooter('Abyssal.cc')
      message.channel.send(embed);
    }
  }
}