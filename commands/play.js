const ytdl = require('ytdl-core-discord')

module.exports = {
    name: 'play',
    args: [
        {
            name: 'link',
            type: 'string',
            prompt: 'Please enter da video link now'
        }
    ],
    async run(msg, {link}) {
        let voiceState = msg.guild.voice
        const memberVoice = msg.member.voice
        if (memberVoice.channel == null) return msg.reply(':microphone2: Join a Voice Channel')
        if (voiceState == null || voiceState.channel == null || voiceState.connection == null) {
            await memberVoice.channel.join()
            voiceState = msg.guild.voice
        }
        voiceState.connection.play(await ytdl(link), {type: 'opus'})
    }
}