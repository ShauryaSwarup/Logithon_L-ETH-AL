import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const CartonNFTModule = buildModule("CartonNFTModule", (m) => {
  const contract = m.contract("CartonNFT", [ethers.getAddress("0x423D91199356b0C0B921Ce6127D30Fcc6917868F")]);
  m.call(contract, "launch", []);
  return { contract };
});

export default CartonNFTModule;