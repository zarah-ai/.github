require("dotenv").config();
const ipfs = require("nft.storage");
const fs = require("fs");
const pt = require("path");

const main = async (args) => {
    const client = new ipfs.NFTStorage({ token: process.env.IPFS_KEY });

    const files = fs.readdirSync(args.directory)
        .filter(name => name.endsWith("json"))
        .map(name => {
            const path = pt.join(args.directory, name);
            const data = fs.readFileSync(path);
            return new ipfs.File(data, name, { type: "application/json" });
        });

    const cid = await client.storeDirectory(files);

    return "Metadata deployed to IPFS with cid: " + cid + "\nTo deploy a contract using this cid:\n./run deploy -c " + cid;
};

module.exports = main;