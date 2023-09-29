import {useState} from "react";
import "./Navbar.css";

export let  activeDiv;


export function Navbar({account}) {
    const [active,setActive] = useState("home");
    const handleSetActive = (e) => {
        setActive(e.target.id);
        activeDiv = active;
    }

    console.log(activeDiv);
    
    return <>
    <div className="navbar">
        <div className="navbar-text" onClick={handleSetActive}>
                <ul >
                    <li>
                        <a id="home" href="/home"> Home</a>
                    </li>
                    <li id="play" href="/play">
                    <a id="play" href="/play">Play</a>

                    </li>
                    <li id="dashboard">
                    Dashboard
                    </li>
                    <li id="claim-rewards">
                    Claim Rewards
                    </li>
                </ul>
        </div>


        <div id="account" > 
                    <div id="status-check">
                        {account ? <div id="green-circle"></div> : <div id="gray-circle"> </div> }
                    </div>
                    <div id="account-address">
                        <small>{String(account).slice(0,5)}...{String(account).slice(39,42)}</small>
            </div>
        </div>
    </div>

        </>;
}

