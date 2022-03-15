// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Zarah is ERC1155, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC1155("ipfs://bafybeifpnppfdquxbczz6ju2jaudjlluuo4dowfdnzwq4vix52ukzm2rji/{id}.json") { }

    function mintNFTs() public onlyOwner {
        for (uint i = 0; i < 25; i++) {
            _tokenIds.increment();
            uint256 newId = _tokenIds.current();
            _mint(msg.sender, newId, 1, "");
        }
    }

}