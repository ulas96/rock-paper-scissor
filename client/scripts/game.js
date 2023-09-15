const gameAddr = "0x54F77c2200Ae81FE5Ce824Fa71071dE78e3061E4";
const contractName = "RPS";

async function main() {
  const game = await hre.ethers.getContractAt(contractName, gameAddr);

  //const tx1 = await game.createGame(1, { value: 1 });
  //console.log(tx1);

  //const tx2 = await game.joinGame(1, 0, { value: 1 });
  //await tx2.wait();

  const result = await game.getGame(1);
  console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
