const Discord = require('discord.js')

module.exports = {
  name: "help",
  description: "help command",

  async run(bot, message, args) {
    if (message.content.startsWith('aa.help')) {
      if (!message.guild) return;
      let embed = new Discord.MessageEmbed()
        .setAuthor(`Abyss Bot Help Page`)
        .setDescription(`*All bot commands will start with aa.*\n**Ban**\n*This command bans anyone mentioned in command!(Admin Only)*\n**Kick**\n*This command kicks anyone mentioned in command!(Admin Only)*\n**Mute/Unmute**\n*This command mutes/unmutes anyone mentioned in command!(Admin Only)*\n**Clear**\n*This command clears any messages in a channel!(Admin Only)*`)
        .setColor(0xFF0000)
        .setTimestamp()

      message.delete();
      message.channel.send({
        embed
      });
    }
  }
}