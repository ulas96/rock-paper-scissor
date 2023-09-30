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


        <div id="account" > 
                    <div id="status-check">
                        {account !== "None" ? <div id="green-circle"></div> : <div id="gray-circle"> </div> }
                    </div>
                    <div id="account-address">
                        <small>{String(account).slice(0,5)}...{String(account).slice(39,42)}</small>
            </div>
        </div>
    </div>

        </>;
}

