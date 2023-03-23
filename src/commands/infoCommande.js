const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Replies with your input!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Informations sur l\'utilisateur')
                .addUserOption(option => option.setName('target').setDescription('Le nom d\'utilisateur')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Info sur le serveur')
            ),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'user') {
            let user = interaction.options.getUser('target');

			if (user) {
				await interaction.reply('**Nom d\'utilisateur :** '+ user.username+'\n**Sa date d\'arrivée :**'+user.joinedAt);
            } else {
                await interaction.reply('**Nom d\'utilisateur :** '+interaction.user.username+'\n**Sa date d\'arrivée :** '+interaction.member.joinedAt);
            }
        } else if (interaction.options.getSubcommand() === 'server') {
            await interaction.reply('**Serveur :** '+interaction.guild.name+'\n**Nombre de membres :** '+interaction.guild.memberCount);
        }
    },
};