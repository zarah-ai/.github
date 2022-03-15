const main = async () => {
    const Contract = await ethers.getContractFactory("Zarah");
    const contract = await Contract.deploy();
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