const child = require("child_process");

const main = (args) => {
    const promise = new Promise((resolve, reject) => {
        const arguments = Object.keys(args)
            .filter(x => x.length > 1 && x != "$0")
            .flatMap(x => ["--" + x, args[x]]);
        const command = ["hardhat", args._[0]].concat(arguments);
        child.execFile("npx", command, (error, stdout, stderr) => {
            if (error) {
                reject(error + "\n" + stderr);
            } else {
                resolve(stdout);
            }
        });
    });
    promise.then(log => {
        console.log(log);
        process.exit(0);
    }).catch(error => {
        console.log(error);
        process.exit(1);
    });
}

module.exports = main;