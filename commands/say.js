const Discord = require('discord.js')
const prefix = "aa."

module.exports = {
  name: "say",
  description: "say command",
  async run(bot, message, args) {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You cant use this command!").then((sent) => {
      setTimeout(function () {
        sent.delete();
      }, 2500);
    });
    if (message.content.startsWith(prefix + 'say')) {
      let rest_of_the_string = message.content.slice('aa.say'.length); //removes the first part
      let array_of_arguments = rest_of_the_string.split('; '); //[title, description, link, image]
      if (!message.guild) return;
      let embed = new Discord.MessageEmbed()
        .setAuthor(array_of_arguments[0])
        .setDescription(`${array_of_arguments[1]}`)
        .setColor(0xFF0000)
        .setTimestamp()

      message.delete();
      message.channel.send({
        embed
      });
    }
  }
}