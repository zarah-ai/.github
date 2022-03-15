# zarah.ai

## Getting started

Clone this repository. You will need node and npm installed globally on your machine.

First you need to install the dependencies:
```
npm install
```
Then you can start the react server:
```
npm start
```

## How to deploy contract

First you will need to generate images and metadata:
```
node src/scripts/generate.js
```
Then you need to upload the iamges and metadata to ipfs:
```
node src/scripts/upload.js
```
And finally you can deploy the contract to the blockchain:
```
// Careful: this command with costh you Ether
npx hardhat run src/scripts/deploy.js
```
And mint some NFTs:
```
// Careful: this command with costh you Ether
npx hardhat run src/scripts/mint.js
```