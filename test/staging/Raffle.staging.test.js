// const { inputToConfig } = require("@ethereum-waffle/compiler")

const { getNamedAccounts, deployments, ethers, network } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
const { assert, expect } = require("chai")
// const { experimentalAddHardhatNetworkMessageTraceHook } = require("hardhat/config")
// const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Staging Tests", async function () {
          let raffle, raffleEntranceFee, deployer

          beforeEach(async function () {
              //   const { deployer } = await getNamedAccounts()
              // new line to get deployer
              deployer = (await getNamedAccounts()).deployer
              raffle = await ethers.getContract("Raffle", deployer)
              raffleEntranceFee = await raffle.getEntranceFee()
          })
          describe("fulfillRandomWords", function () {
              it("works with live Chainlink Keeprs and Chainlink VRF, we get a random winner", async function () {
                  //enter raffle
                  console.log("Setting up test...")
                  const startingTimeStamp = await raffle.getLatestTimeStamp()
                  //   const deployerAccount = await ethers.getSigners()   MY ORIGINAL LINE
                  const accounts = await ethers.getSigners()

                  // set up the listener
                  await new Promise(async (resolve, reject) => {
                      // our new listener => raffle.once...
                      raffle.once("WinnerPicked", async () => {
                          console.log("WinnerPicked event fired!")

                          resolve() // MY ORIGINAL LINE
                          try {
                              // Add our asserts here
                              const recentWinner = await raffle.getRecentWinner()
                              const raffleState = await raffle.getRaffleState()
                              const winnerEndingBalance = await accounts[0].getBalance()
                              const endingTimeStamp = await raffle.getLatestTimeSTamp()

                              await expect(raffle.getPlayer(0)).to.be.reverted
                              assert.equal(recentWinenr.toString(), accounts[0].address)
                              assert.equal(raffleState, 0)
                              assert.equal(
                                  winnerEndingBalance.tostring(),
                                  winnerStartingBalance.add(raffleEntranceFee).toString()
                              )
                              //   assert(endingTimeStamp > startingTimeStamp > startingTimeStamp)
                              assert(endingTimeStamp > startingTimeStamp)
                              resolve()
                          } catch (error) {
                              this.console.log(error)
                              reject(error)
                          }
                      })
                      // Then entering the raffle
                      console.log("Entering Raffle...")
                      if (checkUpkeep() === true) {
                          console.log("function returns true")
                      }

                      await raffle.enterRaffle({ value: raffleEntranceFee })
                      const tx = await 1
                      //   console.log("ok, time to wait...")
                      const winnerStartingBalance = await accounts[0].getBalance()
                      // and this code WONT complete  until our listener has finished listening!
                  })
              })
          })
      })
