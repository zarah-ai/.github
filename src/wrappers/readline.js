const readline = require('readline');

const confirm = async (message) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, _) => {
        rl.question(message + " [y/n]\n", response => {
            if (response === "yes" || response === "y" || response === "true" || response === "t") {
                resolve(true);
            } else {
                resolve(false);
            }
            rl.close();
        });
    });
};

const integer = async (message) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, _) => {
        rl.question(message + " [Int]\n", response => {
            const int = parseInt(response) | 0;
            resolve(int);
            rl.close();
        });
    });
};

const input = async (message) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, _) => {
        rl.question(message + "\n", response => {
            resolve(response);
            rl.close();
        });
    });
};

module.exports = {
    confirm: confirm,
    integer: integer,
    input: input
};