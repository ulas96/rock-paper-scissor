import { useState, useEffect } from 'react';
import {ethers} from "ethers";
import contract from './contract/RPS.json';
import './App.css';
import {Play} from "./Play";

import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider, useNavigate} from "react-router-dom";
import Root from './Root';
import { Home } from './Home';


function App() {
  // const gameAddr = "0x54F77c2200Ae81FE5Ce824Fa71071dE78e3061E4";
  const { abi: ABI } = contract;
  const [account, setAccount] = useState("None");
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (window["ethereum"]){ 
  //   navigate("/home"); 
  // }
  // });

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
            setState({provider: provider, signer: signer, contract: contract});
            setAccount(_account);
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

    </Route>
));

  
    return <RouterProvider router={router} />;
  
}

export default App;
