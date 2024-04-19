// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ShipmentNFT is ERC721, Ownable {

    struct ShipmentAttributes {
        uint256 shipmentId;
        string name;
        uint256 weight;
        string src;
        string dest;
        string currLoc;
        uint256 price;
        string[] journey;
        uint256[] cartonIds;
    }

    mapping(uint256 => ShipmentAttributes) private shipmentAttributes;
    uint256 private tokenIdCounter;

    constructor(address initialOwner) ERC721("ShipmentNFT", "SNFT") Ownable(initialOwner){}

    function mint(
        address to,
        string memory name,
        uint256 weight,
        string memory src,
        string memory dest,
        string memory currLoc,
        uint256 price,
        string[] memory journey,
        uint256[] memory cartonIds
    ) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenIdCounter;
        tokenIdCounter++;
        _safeMint(to, newTokenId);
        shipmentAttributes[newTokenId] = ShipmentAttributes(newTokenId, name, weight, src, dest, currLoc, price, journey, cartonIds);
        return newTokenId;
    }

    function getShipmentAttributes(uint256 tokenId) public view returns (ShipmentAttributes memory) {
        return shipmentAttributes[tokenId];
    }
}
