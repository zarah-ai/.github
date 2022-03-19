require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
const { MAINNET_URL, RINKEBY_URL, MNEMONIC } = process.env;
const wallet = require("ethers").Wallet.fromMnemonic(MNEMONIC);

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (args) => {
    const wei = await ethers.provider.getBalance(args.account);
    const eth = ethers.utils.formatEther(wei);
    const balance = Math.round(eth * 1000) / 1000;
    process.stdout.write("Account " + args.account + " has " + balance + " ETH");
});

task("deploy", "Deploy a smart contract to the blockchain")
  .addParam("cid", "The CID of the directory in IPFS")
  .setAction(async (args) => {
    const proxy = (network.name === "rinkeby" ? "0xf57b2c51ded3a29e6891aba85459d600256cf317" : "0xa5409ec958c83c3f309868babaca7c86dcb077c1");
    const Contract = await ethers.getContractFactory("Zarah");
    const contract = await Contract.deploy(args.cid, proxy);
    await contract.deployed();
    process.stdout.write("Contract deployed to address: " + contract.address + "\nTo mint NFTs using this contract run:\n./run mint -a " + contract.address);
});

task("mint", "Mint NFTs in a smart contract")
  .addParam("address", "The address of the contract to mint in")
  .setAction(async (args) => {
    const contract = await ethers.getContractAt("Zarah", args.address);
    const transaction = await contract.mintNFTs();
    process.stdout.write("Minted NFTs in transaction: " + transaction.hash);
});

module.exports = {
    solidity: {
        version: "0.8.4",
        settings: {
            optimizer: {
              enabled: true,
              runs: 2000,
            },
        },
    },
    defaultNetwork: "rinkeby",
    networks: {
        hardhat: {},
        mainnet: {
            url: MAINNET_URL,
            accounts: [ wallet.privateKey ]
        },
        rinkeby: {
            url: RINKEBY_URL,
            accounts: [ wallet.privateKey ]
        }
    },
}
