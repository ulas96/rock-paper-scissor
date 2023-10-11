import {useState} from "react";
import "./Navbar.css";
export function Navbar({account}) {

    return <>
    <div className="navbar">
        <div className="navbar-text">
                <ul >
                    <li onClick={() => {
                                location.href="/"
                            }}>
                        Home
                    </li>
                    <li id="play" onClick={() => {
                                location.href="/play"
                            }}>
                    Play
                    </li>
                    <li id="dashboard" onClick={() => {
                                location.href="/dashboard"
                            }}>
                    Dashboard
                    </li>
                    <li id="claim-rewards" onClick={() => {
                                location.href="/claim"
                            }}>
                    Claim Rewards
                    </li>
                </ul>
        </div>

        <div className="network">
            Goerli Testnet
        </div>


        <div className="account" > 
                    <div className="status-check">
                        {account !== "None" ? <div className="green-circle"></div> : <div className="gray-circle"> </div> }
                    </div>
                    <div className="account-address">
                        <small>{account !== "None" ? `${String(account).slice(0,5)}...${String(account).slice(39,42)}` : "Connect Walet"}</small>
            </div>
        </div>
    </div>

        </>;
}

