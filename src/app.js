const { Client, Events, GatewayIntentBits } = require('discord.js');
const conf = require('../conf.json');
const TOKEN = conf.token;
const fs = require('node:fs');
const path = require('node:path');

var Discord = require("discord.js");


// Créer un nouveau client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.commands = new Discord.Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if (command.data) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
    }
}

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(
            `Aucune commande ${interaction.commandName} n'a été trouvée.`
        );
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'Erreur dans l\'exécution de la commande !',
            ephemeral: true,
        });
    }
});


client.on("guildMemberAdd", (member) => {
    let guild = member.guild; // Reading property `guild` of guildmember object.
    let memberTag = member.user.tag; // GuildMembers don't have a tag property, read property user of guildmember to get the user object from it
    if(guild.systemChannel){ // Checking if it's not null
        guild.systemChannel.send(memberTag + " vive les chats !\nhttps://skylord.fr");
    }
    });
// ...

// Le token permet à votre client de se connecter à Discord
client.login(TOKEN);