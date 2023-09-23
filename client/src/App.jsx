import { useState, useEffect } from 'react';
import {ethers} from "ethers";
import contract from './contract/RPS.json';

import './App.css';

function App() {
  // const gameAddr = "0x54F77c2200Ae81FE5Ce824Fa71071dE78e3061E4";
  const { abi: ABI } = contract;
  const [account, setAccount] = useState("None");
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [move,setMove] = useState("");
  const [pendingGames, setPendingGames] = useState([]);
    useEffect(() => {
      const connectWallet = async () => {
        const contractAddress = "0x08D06f587F1b588FEd3eeE2167a2415B271F3886";
        const contractABI = ABI;
          try{
            const { ethereum } = window;
            if (ethereum) {
              const _account = await ethereum.request({
                method: "eth_requestAccounts",
              });
              window.ethereum.on("chainChanged", () => {
                window.location.reload();
              });
    
              window.ethereum.on("accountsChanged", () => {
                window.location.reload();
              });
              
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            
            const contract = new ethers.Contract(contractAddress, contractABI,signer);
            setState({provider: provider, signer: signer, contract: contract});
            setAccount(_account);
            console.log(signer);
            }
  
          } catch(e) {
            console.log(e);
          }

      };
      connectWallet();
    }, []);

    useEffect(() => {
      getPendingGames();
    }, [])


  const handleCreateGame = async () => {
    let _move;
    if(move ===  "rock") {
      _move = 0;
    } else if(move === "paper"){
      _move = 1;
    } else if (move == "scissor") {
      _move = 2;
    }
    const pendingGame = await state.contract.createGame(_move, {value: 10});
    pendingGame.wait();
    //console.log(pendingGame);
  }    

  const handleMoveChange = (event) => {
    const selectedImages = document.querySelectorAll('.selected');
  
    if (selectedImages.length === 1) {
      selectedImages[0].classList.remove('selected');
    }
  
    event.target.classList.add('selected');
    setMove(event.target.id);
  };

  const getPendingGames = async () => {
        const _pendingGames = await state.contract.getActivePendingGames();
        setPendingGames(_pendingGames);

  };

  const handleJoinGame = async (e) => {
    let _move;
    if(move ===  "rock") {
      _move = 0;
    } else if(move === "paper"){
      _move = 1;
    } else if (move == "scissor") {
      _move = 2;
    }
    const game = await state.contract.joinGame(e.target.value, _move, {value: 10});
    await game.wait();
  } 

console.log(move); 

    return (
      <div>

      <div id="account" >
      <div id="status-check">
        {account ? <div id="green-circle"></div> : <div id="gray-circle">
        </div> }
      </div>
      <div id="account-address">
        <small>{String(account).slice(0,5)}...{String(account).slice(39,42)}</small>
      </div>
      </div>

      <div className="container">
      <div id="move-selection" >
        <p id="move-text">Make your move:</p>
        <img src="../src/assets/rock.png"  id="rock"  onClick={handleMoveChange}  />
        <img src="../src/assets/paper.png" id="paper" onClick={handleMoveChange} />
        <img src="../src/assets/scissor.png" id="scissor" onClick={handleMoveChange} />
      </div>
      
      <div id="create-button">
        <button onClick={handleCreateGame}>Create Game</button>
      </div>

      <div id="pending-games">
        <div>
          <button onClick={getPendingGames}>See pending games</button>
        </div>
        <div className="pending-games" height="100px">
            {pendingGames.map((g) => {
              return <div id="pending-game-element">
                <div>
                  {g.gameCreator}
                </div>
                <button value={parseInt(g.id._hex)} onClick={handleJoinGame}>join game</button>
                </div>;
            })}
        </div>
      </div>
      </div>

     
      
     
    </div>
    )
  
}

export default App
