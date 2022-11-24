require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: ['2d1f1100effef7adcf2d875fd74e074bfae098cfb45bcf58a5453b78d206afaf']
    }
  },
  etherscan: {
    apiKey:'BTIHEVVDCCNZ81MMCTFTI13NQEPC7DUAQI'
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}