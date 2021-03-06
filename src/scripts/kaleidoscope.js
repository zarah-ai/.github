const cv = require("canvas");
const pr = require("cli-progress");
const ge = require("gifencoder");
const fs = require("fs");
const pt = require("path");
const vn = require("./voronoi");

const main = async (args) => {
    const encoder = new ge(args.size, args.size);
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(16); 
    encoder.setQuality(1);

    const width = Math.floor((0.1 + 0.4 * Math.random()) * args.size);
    const height = (Math.sqrt(3) / 2) * width;
    
    const canvas = cv.createCanvas(args.size, args.size);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = await vn({ size: args.size });

    const xTile = Math.ceil(args.size / (width * 3)) + 4;
    const yTile = Math.ceil(args.size / (height * 1)) + 4;

    const rotation = Math.random() * Math.PI * 2;
    const rotationXOffset = Math.floor(Math.random() * width);
    const rotationYOffset = Math.floor(Math.random() * height);
    ctx.translate(args.size * 0.5, args.size * 0.5);
    ctx.rotate(rotation);
    ctx.translate(rotationXOffset - args.size * 0.5, rotationYOffset - args.size * 0.5);

    const barOptions = { format: "Creating gif [{bar}] {percentage}% | {eta}s ETA", clearOnComplete: true, hideCursor: true }
    const bar = new pr.SingleBar(barOptions, pr.Presets.legacy);
    bar.start(args.size, 0);

    for (let t = 0; t < args.size; t++) {
        for (let x = -2; x < xTile; x++) {
            for (let y = -2; y < yTile; y++) {
                const xOffset = width * 3 * x + (y & 1 ? 0.5 : -1) * width;
                const yOffset = height * (y - 2);
                for (let z = 0; z < 6; z++) {
                    ctx.save();
                    ctx.translate(xOffset, t + yOffset);
                    ctx.translate(width * 0.5, height - t);
                    ctx.rotate(z * 60 * Math.PI / 180);
                    ctx.translate(width * -0.5, t - height);
                    ctx.beginPath();
                    ctx.moveTo(0, -t);
                    ctx.lineTo(width, -t);
                    ctx.lineTo(0.5 * width, height - t);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }
            }
        }

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
