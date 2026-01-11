require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.24",
    networks: {
        // Local Hardhat Network
        hardhat: {
        },
        // Polygon Amoy Testnet
        amoy: {
            url: process.env.POLYGON_RPC_URL || "https://rpc-amoy.polygon.technology",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            gasPrice: 35000000000, // 35 Gwei
        },
    },
};
