import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';
import { string } from "hardhat/internal/core/params/argumentTypes";
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: "https://rpc2.sepolia.org",
      gasPrice: 225000000000,
      accounts: [process.env.WALLET_KEY || ""],
    }
  },
};

export default config;

