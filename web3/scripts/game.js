// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
const gameAddr = "0x08D06f587F1b588FEd3eeE2167a2415B271F3886";
const contractName = "RPS";

async function main() {
  const game = await hre.ethers.getContractAt(contractName, gameAddr);

  // const tx1 = await game.createGame(1, { value: 10 });
  // await tx1.wait();

  // const tx2 = await game.joinGame(1, 0, { value: 1 });
  // await tx2.wait();

  const result = await game.getPendingGame(1);
  console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
