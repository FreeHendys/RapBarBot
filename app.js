const { Client, GatewayIntentBits, ThreadChannel } = require('discord.js')
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


const prefix = `$`;


client.once('ready', () => {
    console.log('Bot online')
})


client.on('messageCreate', async message => {
    if (message.author.bot) return;

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === `ping`) {
        message.reply(`Bot latency: ${client.ws.ping} ms`);
    } 
    if (command === `bar`) {
        try {
            const userInput = args.join(' ').replace(/["']/g, ''); // Remove all single and double quotes
            const rapBar = await generateRapBar(userInput); // Assume generateRapBar accepts an argument
            message.reply(`Bars??? ${rapBar}`);
        } catch (error) {
            console.error('Failed to generate rap bar:', error);
            message.reply(`Sorry, I could not generate a rap bar right now. I'm super lame`);
        }
    }
    
});

client.on('messageCreate', async message => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === `robbie`) {
        const filter = m => m.author.id === message.author.id;
        message.reply(`The IRS is after Robbie and his Sera **PICK A NUMBER** and beat the IRS`).then(() => {
            message.channel.awaitMessages({filter, max: 1, time: 10000, errors: [`time`]})
                .then(collected => {message.reply(`Yo ${message.author} killed Robbie and blew up his Sera with the help of the IRS, FUCK YOU💢`)})
                .catch(err => {console.error('Error collecting messages:', err);
                    message.reply(`${message.author}, YOU TOOK TO LONG AND LET THE IRS KILLED HIM!😭`);});
                
        })
    }
})






client.login(token)