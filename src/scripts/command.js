
const main = (args) => {
    const module = require("./" + args._[0]);
    module(args).then(log => {
        console.log(log);
        process.exit(0);
    }).catch(error => {
        console.log(error);
        process.exit(1);
    });
};

module.exports = main;