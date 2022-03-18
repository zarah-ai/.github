const cp = require("child_process");
const fs = require("fs");
const pt = require('path');

const main = async (args) => {
    const startTime = new Date();

    const recursive = { recursive: true };
    if (args.clean && fs.existsSync(args.dir)) {
        fs.rmSync(args.dir, recursive);
    }
    fs.mkdirSync(args.dir, recursive);

    if (!fs.existsSync(args.dir)) {
        throw new Error("Could not create directory");
    }

    const files = fs.readdirSync(args.dir).map(x => parseInt(pt.parse(x).name));
    const start = Math.max(Math.max(...files), 0) + 1;
    const count = [...Array(args.amount).keys()].map(x => x + start);

    await Promise.all(count.map(i => {
        return new Promise((resolve, reject) => {
            const command = ["run", "kaleidoscope", "-p", pt.join(args.dir, i.toString()), "-s", args.size];
            cp.execFile("node", command, (error, stdout, _) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(stdout);
                }
            });
        });
    }));

    const endTime = new Date();
    const time = Math.round((endTime - startTime) * 0.001);
    const rate =  Math.round(time / args.amount);
    return "Successfully generated " + args.amount + " images in " + time + " seconds (" + rate + " s/op)" +
        "\nTo upload the generated files to IPFS:\nXYZ";
};

module.exports = main;
