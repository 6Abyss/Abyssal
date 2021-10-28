const Discord = require('discord.js')
const prefix = "aa."

module.exports = {
  name: "pricing",
  description: "pricing command",
  async run(bot, message, args) {
    if (!message.member.hasPermission('MANAGE_MESSAGES'))
return message.channel.send("You cant use this command since you're missing `manage_messages` perm").then((sent) => {
  setTimeout(function () {
    sent.delete();
  }, 2500);
        });
if (message.content.startsWith(prefix + "pricing")) {
  if (!message.guild) return;
  const embed = new Discord.MessageEmbed()
  .setColor(0xef5c50)
  .setAuthor("Product Status")
  .setFooter('Abyssal.cc')
  .setDescription("☣️ • **Standard Raids** - *$5* \n🧪 • **Labs Raids** - *$5*\n👥 • **Add a friend** - *$1*\n💼 • **Bring a case** - *$1*\n \n*Our current pricing, may very depending on time of wipe.*")
  message.channel.send(embed);
    }
  }
}