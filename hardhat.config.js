require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: "./.env.local" });

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();
	for (const account of accounts) console.log(account.address);
});

const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;

module.exports = {
	solidity: "0.7.3",
	defaultNetwork: "rinkeby",
	networks: {
		hardhat: {},
		rinkeby: {
			url: process.env.NEXT_PUBLIC_RPC_URL,
			accounts: [privateKey]
		}
	}
};
