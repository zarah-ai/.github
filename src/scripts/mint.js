const rl = require("../wrappers/readline")

const main = async () => {
    const address = await rl.input("Please enter the address of the contract");
    const contract = await ethers.getContractAt("Zarah", address);
    const transaction = await contract.mintNFTs();
    return transaction.hash;
};
  
main().then(hash => {
    console.log("Minted NFTs in trasaction:", hash);
    process.exit(0);
}).catch(error => {
    console.error(error);
    process.exit(1);
});
