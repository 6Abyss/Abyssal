const Discord = require('discord.js')
const prefix = "aa."
module.exports = {
  name: "clear",
  description: "clear command",

  async run(bot, message, args) {
    if (
      message.content.toLowerCase().startsWith(prefix + 'clear') ||
      message.content.toLowerCase().startsWith(prefix + 'c ')
    ) {
      if (!message.member.hasPermission('MANAGE_MESSAGES'))
        return message.channel.send("No perm");
      if (!isNaN(message.content.split(' ')[1])) {
        let amount = 0;
        if (message.content.split(' ')[1] === '1' || message.content.split(' ')[1] === '0') {
          amount = 1;
        } else {
          amount = message.content.split(' ')[1];
          if (amount > 100) {
            amount = 100;
          }
        }
        await message.delete().catch(e => {
          amount++;
        });

        await message.channel.bulkDelete(amount, true).then((_message) => {
          message.channel.send(`I have cleared \`${_message.size}\` messages :broom:`).then((sent) => {
            setTimeout(function () {
              sent.delete();
            }, 2500);
          });
        });
      } else {
        message.channel.send('Invalid Amount').then((sent) => {
          setTimeout(function () {
            sent.delete();
          }, 2500);
        });
      }
    }
  }
}