const cv = require("canvas");

const width = 512;
const height = 512;

const createAttributes = () => {
    return {
        backgroundRed: Math.random(),
        backgroundGreen: Math.random(),
        backgroundBlue: Math.random(),
    };
};

const createImage = (attr) => {
    const color = (name) => Math.floor(attr[name] * 255)
    const rgb = (name) => "rgb(" + color(name + "Red") + "," + color(name + "Green") + "," + color(name + "Blue") + ")"
    const canvas = cv.createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = rgb("background")
    ctx.fillRect(0, 0, width, height)
    return canvas.toBuffer();
};

module.exports = {
    createAttributes: createAttributes,
    createImage: createImage
};