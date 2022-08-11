const { commify } = require("ethers/lib/utils")

require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL

const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    mocha: {
        timout: 100000000, //200 seconds max
    },

    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            blockConfirmations: 1,
        },
        localhost: {
            chainId: 31337,
            // },
            // etherscan: {
            //     apiKey: ETHERSCAN_API_KEY,
        },

        rinkeby: {
            chainId: 4,
            blockConfirmations: 1,
            url: RINKEBY_RPC_URL,
            accounts: [PRIVATE_KEY],
            saveDeployments: true,
            //     etherscan: {
            //         apiKey: ETHERSCAN_API_KEY,
            //     },
        },
    },

    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },

    solidity: {
        compilers: [
            {
                version: "0.8.7",
            },
            {
                version: "0.4.24",
            },
        ],
    },

    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
        player: {
            default: 1,
        },
    },

    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
        token: "ETH",
    },

    contractSizer: {
        runOnCompile: false,
        only: ["Raffle"],
    },
}
