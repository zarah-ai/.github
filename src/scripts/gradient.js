const cv = require("canvas");
const pr = require("cli-progress");
const ge = require("gifencoder");
const fs = require("fs");
const pt = require("path");


const main = async (args) => {
    const encoder = new ge(args.width, args.height);
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(64); 
    encoder.setQuality(1);

    const canvas = cv.createCanvas(args.width, args.height);
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, args.width * 4, args.height*4);
    gradient.addColorStop(0.00, "#23d5ab");
    gradient.addColorStop(0.33, "#23a6d5");
    gradient.addColorStop(0.66, "#e73c7e");
    gradient.addColorStop(1.00, "#ee7752");
    ctx.fillStyle = gradient;

    const barOptions = { format: "Creating gif [{bar}] {percentage}% | {eta}s ETA", clearOnComplete: true, hideCursor: true }
    const bar = new pr.SingleBar(barOptions, pr.Presets.legacy);
    bar.start(256, 0);

    for (let t = 0; t < 256; t++) {
        const offset = Math.pow(Math.E, (-Math.pow(t - 128, 2) * 0.0003)) * args.width * 4;

        ctx.save();
        ctx.translate(-offset, -args.height * 1.5);
        ctx.fillRect(offset, args.height * 1.5, args.width, args.height);
        ctx.restore();

        encoder.addFrame(ctx);
        bar.update(t + 1);
    }

    encoder.finish();
    bar.stop();

    if (args.path != null) {
        const gifPath = pt.format({ ...pt.parse(args.path), base: "", ext: ".gif" })
        fs.writeFileSync(gifPath, encoder.out.getData());
        return "Succesfully created kaleidoscope gif at " + gifPath;
    } else {
        return encoder.out.getData();
    }
};

module.exports = main;