const fs = require("../wrappers/fileservice");
const rl = require("../wrappers/readline");
const im = require("../wrappers/image");
const dir = "assets";

const createMeta = async (i) => {
    const meta = im.createAttributes();
    const data = JSON.stringify(meta);
    await fs.writeAsync(dir + "/" + (i+1) + ".json", data);
    return meta;
};

const createImage = async (meta, i) => {
    const image = im.createImage(meta);
    await fs.writeAsync(dir + "/" + (i+1) + ".png", image);
};

const main = async () => {
    await fs.clearFolder(dir);

    const amount = await rl.integer("How many?");
    const count = [...Array(amount).keys()];

    const metas = await Promise.all(count.map(createMeta));
    await Promise.all(metas.map(createImage));

    return amount;
};

main().then((amount) => {
    console.log("Successfully generated " + amount + " images");
    process.exit(0);
}).catch(error => {
    console.error(error);
    process.exit(1);
});

