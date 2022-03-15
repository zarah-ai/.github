const rl = require("../wrappers/readline")

const main = async () => {
    const cid = await rl.input("Please enter the CID of the metadata folder in IPFS");
    const proxy = (network.name === "rinkeby" ? "0xf57b2c51ded3a29e6891aba85459d600256cf317" : "0xa5409ec958c83c3f309868babaca7c86dcb077c1");
    const Contract = await ethers.getContractFactory("Zarah");
    const contract = await Contract.deploy(cid, proxy);
    await contract.deployed();
    return contract.address;
};
  
main().then(address => {
    console.log("Contract deployed to address:", address);
    process.exit(0);
}).catch(error => {
    console.error(error);
    process.exit(1);
});