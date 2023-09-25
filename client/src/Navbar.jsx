import {useState} from "react";
import "./Navbar.css";
export function Navbar({account}) {
    const [active,setActive] = useState("home");
    const handleSetActive = (e) => {
        setActive(e.target.value);
    }
    return <>
    <div className="navbar">
        <div className="navbar-text">
                <ul>
                    <li value="home">
                    Home
                    </li>
                    <li value="play">
                    Play
                    </li>
                    <li value="dashboard">
                    Dashboard
                    </li>
                    <li value="claim-rewards">
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