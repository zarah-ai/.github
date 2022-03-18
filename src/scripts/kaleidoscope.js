const cv = require("canvas");
const ge = require("gifencoder");
const fs = require("fs");
const pt = require("path");
const vn = require("./voronoi");

const main = async (args) => {
    const attr = {
        voronoiDensity: Math.random(),
        voronoiThickness: Math.random(),
        kaleidoscopeSize: Math.random(),
    };
    const clamped = (name, min, max) => Math.floor(attr[name] * (max - min) + min);

    const attrData = JSON.stringify(attr, null, 4);
    const attrPath = pt.format({ ...pt.parse(args.path), base: "", ext: ".json" })
    fs.writeFileSync(attrPath, attrData);

    const encoder = new ge(args.size, args.size);
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(16); 
    encoder.setQuality(10);

    const patternDensity = clamped("voronoiDensity", args.size*0.1, args.size*0.3);
    const patternThickness = clamped("voronoiThickness", 0, 5);

    const width = clamped("kaleidoscopeSize", args.size*0.1, args.size*0.4, attr);
    const height = (Math.sqrt(3) / 2) * width;
    
    const canvas = cv.createCanvas(args.size, args.size);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = await vn({ density: patternDensity, thickness: patternThickness, size: args.size });

    const xTile = Math.ceil(args.size / (width * 3)) + 1;
    const yTile = Math.ceil(args.size / (height * 1)) + 1;

    for (let t = 0; t < args.size; t++) {
        for (let x = 0; x < xTile; x++) {
            for (let y = 0; y < yTile; y++) {
                const xOffset = width * 3 * x + (y & 1 ? 0.5 : -1) * width;
                const yOffset = height * (y - 1);
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
    }

    encoder.finish();
    const gifPath = pt.format({ ...pt.parse(args.path), base: "", ext: ".gif" })
    fs.writeFileSync(gifPath, encoder.out.getData());
    return "Succesfully created kaleidoscope gif at " + gifPath;
};

module.exports = main;



// const drawShape = (attr, ctx) => {
//     const xOffset = width - clamped("shapeWidth", 0.8*width, 0.9*width, attr);
//     const yOffset = height - clamped("shapeHeight", 0.8*height, 0.9*height, attr);
//     const xCurve = xOffset + clamped("shapeWidth", xOffset*0.1 - width*0.05, width*0.25 - xOffset*0.5, attr);
//     const yCurve = yOffset + clamped("shapeCurve", xOffset*0.1 - width*0.05, height*0.25 - yOffset*0.5, attr);

//     ctx.beginPath();
//     ctx.fillStyle = gradient
//     ctx.moveTo(width*0.5, yOffset);
//     ctx.bezierCurveTo(width-xCurve, yOffset, width-xOffset, yCurve, width-xOffset, height*0.5);
//     ctx.bezierCurveTo(width-xOffset, height-yCurve, width-xCurve, height-yOffset, width*0.5, height-yOffset);
//     ctx.bezierCurveTo(xCurve, height-yOffset, xOffset, height-yCurve, xOffset, height*0.5);
//     ctx.bezierCurveTo(xOffset, yCurve, xCurve, yOffset, width*0.5, yOffset);
//     ctx.fill();
// };