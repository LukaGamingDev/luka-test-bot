const mentionRegex = /^<@!?(\d+)>$/

module.exports = {
    name: "member",
    parse(msg, command, arg, args) {
        const matches = mentionRegex.exec(arg)

        arg = arg.toLowerCase()

        let id = matches ? matches[1] : arg
        let user = msg.guild.members.cache.get(id)

        if (user == null) {
            const matchingMembers = msg.guild.members.cache.filter((m) => 
                m.displayName.toLowerCase().startsWith(arg) ||
                m.user.username.toLowerCase().startsWith(arg)
            )
            console.log(matchingMembers.size)
            if (matchingMembers.size === 1) {
                return matchingMembers.first()
            }
            return
        }

        return user
    }   
}