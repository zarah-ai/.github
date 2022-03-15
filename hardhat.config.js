require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
const { MAINNET_URL, RINKEBY_URL, MNEMONIC } = process.env;
const wallet = require("ethers").Wallet.fromMnemonic(MNEMONIC);

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
