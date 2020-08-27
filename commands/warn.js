module.exports = {
    name: "warn",
    args: [
        {
            name: "member",
            type: "member"
        },
        {
            name: "reason",
            type: "string",
            default: "No reason"
        }
    ],
    run(msg, {member, reason}) {
        member.warns = member.warns || []
        member.warns.push(reason)
        msg.channel.send({
            embed: {
                title: "Warned",
                description: `Warned **${member.user.tag}** for **${reason}**` 
            }
        }).catch(console.error)

        console.log(member, reason)

        member.send({
            embed: {
                title: "Warning",
                description: `You are warned on **${msg.guild.name}** for **${reason}**`
            }
        }).catch((e) => {
            msg.channel.send("Failed to DM user").catch(console.error)
        })
    }
}