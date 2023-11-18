// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//

const hre = require("hardhat");

const gameAddr = "0x6e0E489F411efCC81dC74DD43daA8acA0Db8307C"; // previous: "0x3853B8fc287C90970ca5fa9d6A7599422C4BAF48"
const gameName = "RPS";

const tokenAddr = "0x9e6969254D73Eda498375B079D8bE540FB42fea7"; // previous: "0x696653050c71C252254696D154E0318D06376AB3"
const tokenName = "Excelcium";

const personalAddress = "0x002C65Be429d430DF090f2DC847df3b468676029";
async function main() {

    const game = await hre.ethers.getContractAt(gameName, gameAddr);

    const token = await hre.ethers.getContractAt(tokenName, tokenAddr);


    const startBalance = await token.balanceOf(personalAddress);

    console.log(startBalance);

    const approveTx1 = await token.approve(gameAddr, 10);
    await approveTx1.wait();

    console.log("Approved");

    const transferTx1 = await game.createGame(1, 10);
    await transferTx1.wait();

    console.log("Game Created");

    const approveTx2 = await token.approve(gameAddr, 10);
    await approveTx2.wait();

    console.log("Approved");

    const transferTx2 = await game.joinGame(1, 0 , 10);
    await transferTx2.wait();

    console.log("Game Joined");

    const endBalance = await token.balanceOf(personalAddress);
    console.log(endBalance);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });