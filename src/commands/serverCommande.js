const { SlashCommandBuilder, SlashCommandStringOption, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Permet d\'avoir des informations sur le serveur!'),
    async execute(interaction) {
        await interaction.reply('**Serveur :** '+interaction.guild.name+'\n**Nombre de membres :** '+interaction.guild.memberCount)
    }
};