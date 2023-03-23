const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');
const { request } = require('undici');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Permet d\'avoir des informations sur le serveur!'),
    async execute(interaction) {
        const catResult = await request('https://aws.random.cat/meow');
        const { file } = await catResult.body.json();
                
        await interaction.reply(file);
    }
};