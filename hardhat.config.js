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
      url: "https://backend.buildbear.io/node/bold-bohr-2aa906",
      accounts: ['3d2336ebefb8b312bb716771f9c4c6d41ff70102b3a77b2efb5a80a408d3ef29']
    }
  }
};

