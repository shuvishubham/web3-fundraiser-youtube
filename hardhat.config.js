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
      url: "https://backend.buildbear.io/node/lucid-pascal-7532a7",
      accounts:["5975f1024d1d4db467fe7be8846a0045236440fd7726e0b42bf01cd817f1c61b"],
    }
  }
};

// chain id 8301