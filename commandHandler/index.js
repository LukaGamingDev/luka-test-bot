const commandRegex = /^!(.+)/
const argRegex = /\S+/

const fs = require("fs")
const path = require("path")
const { args } = require("../commands/test")

module.exports = (client) => {
    const commandFiles = fs.readdirSync(path.join(__dirname, "../commands"))
    const typeFiles = fs.readdirSync(path.join(__dirname, "types"))

    this.commands = commandFiles
        .filter(file => file.endsWith(".js"))
        .map(file => require(path.join(__dirname, "../commands", file)))

    this.types = typeFiles
        .filter(file => file.endsWith(".js"))
        .map(file => require(path.join(__dirname, "types", file)))

    console.log(this.commands)
    console.log(this.types)

    client.on("message", this.handleMessage)
}

exports.handleMessage = async (msg) => {
    // Check if message is sent by bot
    if (msg.author.bot) return

    // Check prefix
    const parsedContent = commandRegex.exec(msg.content)
    if (parsedContent == null) return

    // Split command
    const [commandName, ...rawArgs] = parsedContent[1].split(" ")
    const command = this.commands.find(cmd => cmd.name === commandName.toLowerCase())

    if (command == null) return

    // Prompts
    for (const [i, v] of command.args.entries()) {
        if (v.default !== undefined) continue
        let rawArg = rawArgs[i]

        if (rawArg == null) {
            const filter = m => m.author === msg.author
            try {
                msg.channel.send({
                    embed: {
                        title: v.prompt || `Please enter \`${v.name}\``,
                        description: "Type `cancel` to cancel",
                        footer: {text: "Prompt ends in 30 seconds"}
                    }
                })
                const collected = await msg.channel.awaitMessages(filter, {
                    errors: ["time"],
                    time: 30 * 1000,
                    max: 1
                })
                const response = collected.first()
                if (response.content === "cancel") return msg.channel.send({
                    embed: {
                        title: "Canceled",
                        description: "Prompt canceled"
                    }
                })
                rawArg = response.content
                rawArgs[i] = rawArg
            }catch{
                return msg.channel.send({
                    embed: {
                        title: "Prompt ended",
                        description: "Ran out of time"
                    }
                })
            }
        }

        const type = this.types.find(type => type.name === v.type)
        let parsed

        while (true) {
            parsed = type.parse(msg, command, rawArg, rawArgs)
            if (parsed) break

            const filter = m => m.author === msg.author
            try {
                msg.channel.send({
                    embed: {
                        title: "Invalid argument",
                        description: `You provided an invalid \`${v.type}\`\nType\`cancel\` to cancel`,
                        footer: {
                            text: "Prompt ends in 30 seconds"
                        }
                    }
                })
                const collected = await msg.channel.awaitMessages(filter, {
                    errors: ["time"],
                    time: 30 * 1000,
                    max: 1
                })
                const response = collected.first()
                if (response.content === "cancel") return msg.channel.send({
                    embed: {
                        title: "Canceled",
                        description: "Prompt canceled"
                    }
                })
                rawArg = response.content
                rawArgs[i] = rawArg
            }catch{
                return msg.channel.send({
                    embed: {
                        title: "Prompt ended",
                        description: "Ran out of time"
                    }
                })
            }
        }
    }

    const parsedArgs = {}
    command.args.forEach((v, i) => {
        const rawArg = rawArgs[i]
        if (rawArg == null) return
        const type = this.types.find((type) => type.name === v.type)
        parsedArgs[v.name] = type.parse(msg, command, rawArg, rawArgs)
    });

    command.run(msg, parsedArgs)
}