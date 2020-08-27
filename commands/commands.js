module.exports = {
    name: "commands",
    run(msg) {
        msg.channel.send({
            embed: {
                title: "List of commands",
                description: "Type `!command` to run a command\n\n" + msg.client.commands.map(
                    v => `\`${v.name}${v.args.length ? " " : ""}${v.args.map(
                        (v) => v.default === undefined ? `<${v.name}>` : `[${v.name}]`
                    ).join(" ")}\``
                ).join("\n")
        }
        })
    }
}