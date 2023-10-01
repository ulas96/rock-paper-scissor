import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider} from "react-router-dom";

import contract from "/Users/ulas/Documents/GitHub/rock-paper-scissor/client/src/contract/RPS.json"
import './App.css';
import Play from '../Play/Play';
import Root from '../Root';
import Home from '../Home/Home';
import Dashboard from '../Dashboard/Dashboard';
import Claim from  "../Claim/Claim";


function App() {
  // const gameAddr = "0x54F77c2200Ae81FE5Ce824Fa71071dE78e3061E4";
  const { abi: ABI } = contract;
  const [account, setAccount] = useState("None");
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
    account: null
  });

    useEffect(() => {
      const connectWallet = async () => {
        const contractAddress = "0x08D06f587F1b588FEd3eeE2167a2415B271F3886";
        const contractABI = ABI;
          try{
            const { ethereum } = window;
            console.log(ethereum);
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
            setAccount(_account);
            setState({provider: provider, signer: signer, contract: contract, account: account});
            }
  
          } catch(e) {
            console.log(e);
          }

      };
      connectWallet();
    }, []);





  const router = createBrowserRouter( createRoutesFromElements(
    <Route path="/" element={<Root account={account}/>}>
      <Route path="/" element={<Home />}/>
      <Route path="play" element={<Play state={state} />}/>
      <Route path="dashboard" element={<Dashboard />}/>
      <Route path="claim" element={<Claim state={state} account={account}/>}/> 
    </Route>
));

  
    return <RouterProvider router={router} />;
  
}

export default App;
