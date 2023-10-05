// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
const gameAddr = "0xCc80273F73fE16958B5FE3BEC4333C6Ed52A6555";
const contractName = "RPS";

async function main() {
  const game = await hre.ethers.getContractAt(contractName, gameAddr);

  const result = await game.getPendingGame(1);
  console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
