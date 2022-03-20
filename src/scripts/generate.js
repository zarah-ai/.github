require("dotenv").config();
const fs = require("fs");
const pt = require("path");
const ipfs = require("nft.storage");
const ks = require("./kaleidoscope");

const main = async (args) => {
    const client = new ipfs.NFTStorage({ token: process.env.IPFS_KEY });
    const data = await ks({ size: args.size });

    if (args.keep) {
        const path = pt.format({ ...pt.parse(args.path), base: "", ext: ".gif" });
        fs.writeFileSync(path, data);
    }

    const blob = new ipfs.Blob([data]);
    const cid = await client.storeBlob(blob);

    const id = pt.parse(args.path).name;
    const meta = {
        image: "ipfs://" + cid,
        external_url: "https://zarah.ai/" + id
    };
    const metadata = JSON.stringify(meta, null, 4);
    const metapath = pt.format({ ...pt.parse(args.path), base: "", ext: ".json" });
    fs.writeFileSync(metapath, metadata);
    
    return "Successfully generated image with id " + id + " and uploaded to IPFS with cid " + cid;
};

module.exports = main;