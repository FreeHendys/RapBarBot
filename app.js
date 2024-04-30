const { Client, GatewayIntentBits } = require('discord.js')
const { token } = require('./config.json')
const generateRapBar = require('./rapGenerator'); // Import function


const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.once('ready', () => {
    console.log('Bot online')
})

// client.on('messageCreate', async message => {
//     if(message.author.bot) return;

//     const prefix = `/`

//     if(!message.content.startsWith(prefix)) return;

//     if(message.content.startsWith(prefix + `ping`)) {
//         message.reply(`Bot latency: ` + client.ws.ping + ` ms`)
//     }

//     if(message.content.startsWith(prefix + `bar`)) {
//         try {
//         const rapbar = await generateRapBar();
//         message.reply(`Bars??? ${rapbar}`)
//         } catch {
//             console.error('Failed to generate rap bar:', error);
//             message.reply(`Sorry, I could not generate a rap bar right now. I'm super lame`);
//         }
//     }
// })

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const prefix = `$`;

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === `ping`) {
        message.reply(`Bot latency: ${client.ws.ping} ms`);
    } else if (command === `bar`) {
        try {
            const userInput = args.join(' ')
                                 .replace(/["']/g, ''); // Remove all single and double quotes
            const rapBar = await generateRapBar(userInput); // Assume generateRapBar accepts an argument
            message.reply(`Bars??? ${rapBar}`);
        } catch (error) {
            console.error('Failed to generate rap bar:', error);
            message.reply(`Sorry, I could not generate a rap bar right now. I'm super lame`);
        }
    }
});




client.login(token)