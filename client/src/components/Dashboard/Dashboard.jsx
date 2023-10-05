import "./Dashboard.css"
import { useEffect, useState } from "react";
import "./Dashboard.css"
export default function Dashboard({state, account}) {

    const [_account] = account

    const [wins, setWins] = useState([]);
    const [loses,setLoses] = useState([]);
    const [deuces, setDeuces] = useState([]);
    const [playerGames, setPlayerGames] = useState([]);
    const [playerPendingGames, setPlayerPendingGames] = useState([]);

    const getPlayerWins = async () => {
        const _wins = await state.contract.getPlayerWins(_account);
        setWins(_wins);
    } 

    const getPlayerLoses = async () => {
        const _loses = await state.contract.getPlayerLoses(_account);
        setLoses(_loses);
    }

    const getPlayerDeuces = async () => {
        const deuces =  await state.contract.getPlayerDeuces(_account);
        setDeuces(deuces);
    }

    const getPlayerGames = async () => {
        const games = await state.contract.getPlayerGames(_account);
        setPlayerGames(games);
    }

    const getPlayerPendingGames = async () => {
        const pendingGames = await state.contract.getPlayerPendingGames(_account);
        setPlayerPendingGames(pendingGames);
    }


    useEffect(() => {
        getPlayerWins();
        getPlayerLoses();
        getPlayerDeuces();
        getPlayerGames();
        getPlayerPendingGames();
    });

    return (
        <>
        <div className="dashboard-container">
            <div className="summary">
                <p>{`Total Games: ${playerGames.length}`}</p>
                <p>{`Wins: ${wins.length}`}</p>
                <p>{`Loses: ${loses.length}`}</p>
                <p>{`Deuces: ${deuces.length}`}</p>
            </div>

            <div className="game-history">
                <div className="games">
                {playerGames.map((g) => {
                    return (
                        <div clasName="game">
                            {parseInt(g.id)}
                        </div>
                    );
                })}
                </div>

                <div className="games">
                {playerPendingGames.map((p) => {
                    return (
                        <div clasName="pending-game">
                            {p.active ? parseInt(p.id) : ""}
                        </div>
                    );
                })}
                </div> 
            </div>

        </div>
            
        </>
    );
}