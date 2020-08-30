module.exports = {
    name: 'disconnect',
    async run(msg) {
        const voiceState = msg.guild.voice

        if (voiceState == null || voiceState.connection == null)
            return msg.react('❌')
        
        voiceState.connection.disconnect()
        msg.react('☑')
    }
}