# zarah.ai

## Getting started

* Clone this repository. You will need node and a few other packages installed globally on your machine: `brew install pkg-config cairo pango libpng jpeg giflib librsvg node`.
* Then you can install the node dependencies: `npm install`.
* And start the react frontend: `npm start` or deploy a contract.

## How to deploy a contract

* First you will need to create a .env file (see .env_example).
* Then you can generate NFTs: `./run worker`.
* Then you will need to upload the NFT metadata to IPFS: `./run upload`.
* Finally you can deploy the contract to the blockchain: `./run deploy`. **This command will cost Ether!**
* And then mint some NFTs: `./run mint`. **This command will cost Ether!**

*For more information about a command and the configuration options you can run `./run [command] --help`*