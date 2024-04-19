// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CartonNFT is ERC721, Ownable {

    struct CartonAttributes {
        uint256 cartonId;
        string name;
        uint256 weight;
        string src;
        string dest;
        string currLoc;
        int256 shipmentId;
    }

    uint256 private tokenIdCounter;
    string status;
    mapping(uint256 => CartonAttributes) private cartonAttributes;

    constructor(address initialOwner) ERC721("CartonNFT", "CNFT") Ownable(initialOwner){
        status = "ignition";
    }

    function mint(
        address to,
        string memory name,
        uint256 weight,
        string memory src,
        string memory dest,
        string memory currLoc
    ) external returns (uint256) {
        uint256 newTokenId = tokenIdCounter;
        tokenIdCounter++;
        _safeMint(to, newTokenId);
        cartonAttributes[newTokenId] = CartonAttributes(newTokenId, name, weight, src, dest, currLoc, -1);
        return newTokenId;
    }

    function getCartonAttributes(uint256 tokenId) external view returns (uint256, string memory, uint256, string memory, string memory, string memory, int256) {
        CartonAttributes memory attributes = cartonAttributes[tokenId];
        return (attributes.cartonId, attributes.name, attributes.weight, attributes.src, attributes.dest, attributes.currLoc, attributes.shipmentId);
    }

    // Deploy

    function launch() public {
        status = "lift-off";
    }

}