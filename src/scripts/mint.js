const main = async () => {
    const contract = await ethers.getContractAt("Zarah", "0x0A0D4F82110Ab2051DDd4c83b1ae40EfbF78c5E2");
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
