module.exports = {
    name: "string",
    parse(msg, command, arg, args, i) {
        console.log(arg, args, i)
        if (command.args.length === i + 1) return args.join(" ")
        return arg
    }   
}