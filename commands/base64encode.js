module.exports = {
    name: "base64encode",
    args: [
        {
            name: "text",
            type: "string"
        }
    ],
    run(msg, {text}) {
        msg.channel.send(Buffer.from(text).toString("base64").substring(0, 1999))
    }
}