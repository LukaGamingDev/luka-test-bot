require('dotenv').config()

const {Client} = require('discord.js')
const CommandHandler = require('./commandHandler')
const client = new Client()

CommandHandler(client)

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.login(process.env.BOT_TOKEN)