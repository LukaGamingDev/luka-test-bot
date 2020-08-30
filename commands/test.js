module.exports = {
    name: 'test',
    args: [
        {
            prompt: 'What do you want me to say?',
            name: 'text',
            type: 'string'
        }
    ],
    run(msg, {text}) {
        msg.channel.send(text)
    }
}