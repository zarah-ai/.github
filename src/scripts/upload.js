const ipfs = require("nft.storage");
const fs = require("../wrappers/fileservice");

require("dotenv").config();
const { IPFS_KEY } = process.env;

const client = new ipfs.NFTStorage({ token: IPFS_KEY })
const dir = "assets";

const loadImages = async (name) => {
    const data = await fs.readAsync(dir + "/" + name);
    return new ipfs.File([data], name, { type: "image/png" });
};

const transformAttrKey = (key) => {
    const capitalized = key.charAt(0).toUpperCase() + key.slice(1);
    return capitalized.split(/(?=[A-Z])/).join(" ");
}

const loadMeta = async (name, cid) => {
    const id = parseInt(name.split(".")[0], 16);
    const data = await fs.readAsync(dir + "/" + name);
    const attr = JSON.parse(data.toString());
    const metaAttr = Object.keys(attr).map(x => {
        return {
            trait_type: transformAttrKey(x),
            value: attr[x]
        };
    });
    const meta = {
        image: "ipfs://" + cid + "/" + id.toString(16).padStart(64, "0") + ".png",
        external_url: "https://zarah.ai/" + id, 
        attributes: metaAttr
    };
    const metadata = JSON.stringify(meta);
    return new ipfs.File(metadata, name, { type: "application/json" });
};

const main = async () => {
    const files = await fs.readDirAsync(dir);

    const imagePaths = files.filter(x => x.endsWith("png"));
    const imageFiles = await Promise.all(imagePaths.map(loadImages));
    const imagesCID = await client.storeDirectory(imageFiles);

    const metaPaths = files.filter(x => x.endsWith("json"));
    const metaFiles = await Promise.all(metaPaths.map(x => loadMeta(x, imagesCID)));
    const metaCID = await client.storeDirectory(metaFiles);

    return metaCID;
};
  
main().then(address => {
    console.log("Metadata deployed to cid:", address);
    process.exit(0);
}).catch(error => {
    console.error(error);
    process.exit(1);
});