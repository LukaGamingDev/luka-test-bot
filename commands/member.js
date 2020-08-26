module.exports = {
    name: "member",
    args: [
        {
            name: "member",
            type: "member"
        }
    ],
    run(msg, {member}) {
        msg.channel.send(member.displayName)
    }
}