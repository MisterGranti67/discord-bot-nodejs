const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        // client.users.fetch('242971700440989697', false).then((user) => {
        //     user.send('Vive http://skylord.fr ou https://crypto.skylord.fr');
        // });
    },
};