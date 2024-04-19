import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const SupplyChainMGMTModule = buildModule("SupplyChainMGMTModule", (m) => {
  const contract = m.contract("SupplyChainMGMT", [ethers.getAddress("0xeAec48AAf09566b4DE2d2dA7aaafb03D8AeCDe20")]);
  m.call(contract, "launch", []);
  return { contract };
});

export default SupplyChainMGMTModule;