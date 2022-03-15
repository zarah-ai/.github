require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
const { MAINNET_URL, RINKEBY_URL, MNEMONIC } = process.env;
const wallet = require("ethers").Wallet.fromMnemonic(MNEMONIC);

module.exports = {
    solidity: "0.8.4",
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
