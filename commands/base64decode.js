module.exports = {
    name: "base64decode",
    args: [
        {
            name: "encoded",
            type: "string"
        }
    ],
    run(msg, {encoded}) {
        msg.channel.send(Buffer.from(encoded, "base64").toString())
    }
}