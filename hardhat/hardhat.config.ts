require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: "0.8.24",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000,
            },
        },
    },
    allowUnlimitedContractSize: true,
    networks: {
        hardhat: {
            chainId: 1337,
        },
        sepolia: {
          url: process.env.SEPOLIA_RPC_URL,
          accounts: [process.env.PRIVATE_KEY],
        },
        mumbai: {
            url: process.env.MUMBAI_RPC_URL,
            accounts: [process.env.PRIVATE_KEY],
        }
    },
};