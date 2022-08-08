// const { inputToConfig } = require("@ethereum-waffle/compiler")

const { getNamedAccounts, deployments, ethers, network } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
const { assert, expect } = require("chai")
const { experimentalAddHardhatNetworkMessageTraceHook } = require("hardhat/config")
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Unit Tests", async function () {
          let raffle, raffleEntranceFee, deployer

          beforeEach(async function () {
              //   const { deployer } = await getNamedAccounts()
              // new line to get deployer
              deployer = (await getNamedAccounts()).deployer
              raffle = await ethers.getContract("Raffle", deployer)
              raffleEntranceFee = await raffle.getEntranceFee()
          })
          describe("fulfillRandomWords", function () {
              isCallTrace(
                  "works with live Chainlink Keeprs and Chainlink VRF, we get a random winner",
                  async function () {
                      //enter raffle
                      const startingTimeStamp = await raffle.getLatestTimeSTamp()
                      const deployerAccount = await ethers.getSigners()

                      // set up the listener
                      await new Promise(async (resolve, reject) => {
                          // our new listener => raffle.once...
                          raffle.once("WinnerPicked", async () => {
                              console.log("WinnerPicked event fired!")
                              resolve()
                              try {
                                  // Add our asserts here
                                  const recentWinner = await raffle.getRecentWinner()
                                  const raffleSTate = await raffle.getRaffleSTate()
                                  const winnerEndingBalance = await accounts[0].getBalance()
                                  const endingTimeStamp = await raffle.getLatestTimeSTamp()

                                  await expect(raffle.getPlayer(0)).to.be.reverted
                                  assert.equal(recentWinenr.toString(), accounts[0].address)
                                  assert.equal(raffleState, 0)
                                  assert.equal(
                                      winnerEndingBalance.tostring(),
                                      winnerStartingBalance.add(raffleEntranceFee).toSTring()
                                  )
                                  assert(endingTimeStamp > startingTimeStamp > startingTimeStamp)
                                  resolve()
                              } catch (error) {
                                  this.console.log(error)
                                  reject(e)
                              }
                          })
                          // Then entering the raffle
                          await raffle.enterRaffle({ value: raffleEntranceFee })
                          const winnerStartingBalance = await accounts[0].getBalance()
                          // and this code WONT complete  until our listener has finished listening!
                      })
                  }
              )
              //
          })
      })
