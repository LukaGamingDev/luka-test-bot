module.exports = {
    name: "warns",
    args: [
        {
            name: "member",
            type: "member",
            default: (msg) => msg.member
        }
    ],
    run(msg, {member, reason}) {
        member.warns = member.warns || []
        const formatted = member.warns.length ?
            member.warns.map((reason, i) => `**${i + 1}.** ${reason}`).join("\n"):
            "This member has no warns"

        msg.channel.send({
            embed: {
                author: {
                    name: member.user.tag,
                    iconURL: member.user.displayAvatarURL()
                },
                title: `Warned ${member.warns.length}x`,
                description: formatted
            }
        })
    }
}