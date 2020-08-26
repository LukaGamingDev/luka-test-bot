module.exports = {
    name: "string",
    parse(msg, command, arg, args) {
        console.log(msg, command, arg, args)
        if (command.args.length === 1) return args.join(" ")
        return arg
    }   
}