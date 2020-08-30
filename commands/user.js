module.exports = {
    name: 'user',
    args: [
        {
            name: 'user',
            type: 'user'
        }
    ],
    run(msg, {user}) {
        msg.channel.send(user.tag)
    }
}