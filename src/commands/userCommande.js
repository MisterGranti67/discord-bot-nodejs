const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Permet d\'avoir des informations sur le serveur!')
        .addUserOption(option => option.setName('target').setDescription('Le nom d\'utilisateur')),
    async execute(interaction) {
        await interaction.reply('**Nom d\'utilisateur :** '+interaction.user.username+'\n**Sa date d\'arrivée :** '+interaction.member.joinedAt)
    }
};