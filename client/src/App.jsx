import { useState, useEffect } from 'react';
import {ethers} from "ethers";
import contract from './contract/RPS.json';
import "./Navbar";
import './App.css';
import { Navbar, active } from './Navbar';
import {Play} from "./Play";

function App() {
  // const gameAddr = "0x54F77c2200Ae81FE5Ce824Fa71071dE78e3061E4";
  const { abi: ABI } = contract;
  const [account, setAccount] = useState("None");
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });


  const _active = Navbar.active;
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

  const mainRender = () => {
    if(_active === "play") {
      return <Play state={state}/>
    }
  }

  console.log(active);

    return (
      <>
        <Navbar account={account}></Navbar>
      <div>
        {mainRender}
    </div>
      </>
      
    )
  
}

export default App
