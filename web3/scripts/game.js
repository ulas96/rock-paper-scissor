// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
const gameAddr = "0xC4E531D1a73Cd53d85229BA29C66140D585A1f92" // previous "0xAa84c17C94E8242122200f2532725bC45b572694"
const contractName = "RPS";

async function main() {
  const game = await hre.ethers.getContractAt(contractName, gameAddr);

  const result = await game.getGames();
  console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
