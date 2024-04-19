import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LockModule = buildModule("LockModule", (m) => {
  const contract = m.contract("SupplyChainMGMT", []);
  m.call(contract, "launch", []);
  return { contract };
});

export default LockModule;