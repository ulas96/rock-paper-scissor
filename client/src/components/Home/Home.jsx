import React from "react";
import "./Home.css"

export default function Home(){
    return (
        <div className="home-container">
            <h1>Welcome to toe2toe</h1><br/>

            <p>It is a simple promise. Play rock scissor game on the blockchain. Winner takes all. </p><br/>
            <p>You can audit the relability of the system from here.</p><br/>

            <button className="play-ref" onClick={() => {
                location.href="/play"
            }} >
                Let's play
            </button>

            <p>If you have already won a game:</p> <br/>
            <button className="claim-ref" onClick={() => {
                location.href="/claim"
            }}>
                Claim Rewards
            </button>
        </div>
            );
}