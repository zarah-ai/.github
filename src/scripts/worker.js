const cp = require("child_process");
const pr = require("cli-progress");
const fs = require("fs");
const pt = require("path");

const main = async (args) => {
    const recursive = { recursive: true };
    if (args.clean && fs.existsSync(args.directory)) {
        fs.rmSync(args.directory, recursive);
    }
    fs.mkdirSync(args.directory, recursive);

    if (!fs.existsSync(args.directory)) {
        throw new Error("Could not create directory");
    }

    const workItem = async (index) => {
        return new Promise((resolve, reject) => {
            const command = ["run", "generate", "-p", pt.join(args.directory, index.toString()), "-s", args.size];
            if (args.keep) { command.push("-k") }
            cp.execFile("node", command, (error, stdout, _) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(stdout);
                }
            });
        });
    };

    const dispatch = async (chunk, bar) => {
        for (let i = 0; i < chunk.length; i++) {
            await workItem(chunk[i]);
            bar.update(i + 1);
        }
    };

    const files = fs.readdirSync(args.directory)
        .filter(x => x.endsWith(".json"))
        .map(x => parseInt(pt.parse(x).name));
    const start = Math.max(...files, 0);

    const missing = new Set([...Array(start).keys()].map(x => x + 1));
    files.forEach(x => missing.delete(x));

    const indexes = Array.from(missing);
    [...Array(args.amount - indexes.length).keys()].forEach(x => indexes.push(x + start + 1));

    const itemsPerThread = Math.floor(args.amount / args.threads);
    const leftIndex = itemsPerThread * args.threads;
    const leftOver = args.amount % args.threads;
    const chunks = [...Array(args.threads).keys()].map(x => indexes.slice(x * itemsPerThread, (x + 1) * itemsPerThread));
    [...Array(leftOver).keys()].forEach(x => chunks[x].push(indexes[leftIndex + x]));

    const barOptions = { format: "Thread {id} [{bar}] {percentage}% | {value}/{total}", clearOnComplete: true, hideCursor: true }
    const bar = new pr.MultiBar(barOptions, pr.Presets.legacy);

    const bars = [...Array(args.threads).keys()]
        .map(x => bar.create(chunks[x].length, 0, {id: x}));

    const threads = [...Array(args.threads).keys()]
        .map(x => dispatch(chunks[x], bars[x]));

    await Promise.all(threads);
    bar.stop();

    return "Successfully generated " + args.amount + " images\nTo upload the generated files to IPFS:\n./run upload -d " + args.directory;
};

module.exports = main;