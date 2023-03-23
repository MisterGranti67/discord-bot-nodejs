const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { request } = require('undici');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('urban')
        .setDescription('Permet d\'avoir des informations sur le serveur!')
        .addStringOption(option =>
            option.setName('element')
                .setDescription('Terme à rechercher')
                .setRequired(true)
        ),
    async execute(interaction) {
        const element = interaction.options.getString("element")
        const resultat = await request('https://api.urbandictionary.com/v0/define?term='+element);
    
        const { list } = await resultat.body.json();
        for (let i = 0; i < list.length; i++) {
            const monMot = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(list[i].word)
                .setURL(list[i].permalink)
                .setAuthor({ name: list[i].author})
                .setDescription(list[i].definition)
                .addFields({ name: 'Exemple(s):', value: list[i].example, inline: true })
                .setTimestamp()
                .setFooter({ text: list[i].written_on + ' votes : '+ list[i].current_vote});

            interaction.channel.send({ embeds: [monMot] });
            // interaction.channel.send('**définition :** '+list[i].definition+'\n**exemple: **'+list[i].example)
            // interaction.channel.send('----')
        }
    }
};