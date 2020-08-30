function formatWarns(warns, start) {
    let copy = warns.slice()
    let extra = []
    let formatted
    start = start || 0
    do {
        formatted = copy.map((reason, i) => `**${i + (1 + start)}.** ${reason}`).join('\n')
        if (formatted.length > 2000) extra.unshift(copy.pop())
    } while (formatted.length > 2000)
    if (extra.length < 1) return [formatted]
    return [formatted, ...formatWarns(extra, start + copy.length)]
}

module.exports = {
    name: 'warns',
    args: [
        {
            name: 'member',
            type: 'member',
            default: (msg) => msg.member
        }
    ],
    async run(msg, {member, reason}) {
        member.warns = member.warns || []
        const formatted = member.warns.length ?
            formatWarns(member.warns):
            ['This member has no warns']

        await msg.channel.send({
            embed: {
                author: {
                    name: member.user.tag,
                    iconURL: member.user.displayAvatarURL()
                },
                title: `Warned ${member.warns.length}x`,
                description: formatted[0]
            }
        })

        if (formatted.length > 1) {
            for (const chunk of formatted.slice(1)) {
                await msg.channel.send({
                    embed: {
                        description: chunk
                    }
                })
            }
        }
    }
}