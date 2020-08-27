const {inspect} = require("util")

module.exports = {
    name: "eval",
    args: [
        {
            name: "code",
            type: "string"
        }
    ],
    run(msg, {code}) {
        if (msg.author.id !== "474648225740226591") return msg.reply("You can't use this")

        try {
            const result = eval(code)
            msg.channel.send(`
Evaluated!
\`\`\`js
${inspect(result, { compact: false })}
\`\`\`
            `)
        }catch(e){
            msg.channel.send(`
Failed to evaluate
\`\`\`js
${e}
\`\`\`
`)
        }
    }
}