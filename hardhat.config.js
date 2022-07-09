require("@nomiclabs/hardhat-waffle");
require('dotenv').config({ path: './.env.local' });

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
})

const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY

module.exports = {
  solidity: "0.8.10",
  defaultNetwork: "buildbear",
  networks: {
    hardhat: {},
    buildbear: {
      url: "https://backend.buildbear.io/node/clever-williams-b356e4",
      accounts:["331a3f5d6341c5d08e85b7c0535da803272d011c28b409a55ac9f0c065d329f3"],
    }
  }
};

// chain id 8301