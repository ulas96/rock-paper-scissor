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

    const hanedleCancelGame = async (e) => {
        const game = await state.contract.cancelGame(e.id);
        game.wait();
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
                            <div className="game-id">
                                {parseInt(g.id)}
                            </div>

                            <div className="opponent">
                                Oponent: {g.opponent1 === _account ? g.opponent1 : g.opponent2}
                            </div>


                        </div>
                    );
                })}
                </div>

                <div className="games">
                {playerPendingGames.map((p) => {
                    return (
                        <div clasName="pending-game" id={parseInt(p.id)}>
                            {p.active ? new Date(p.timestamp * 1000).toLocaleString() : ""}
                        </div>
                    );
                })}
                </div> 
            </div>

        </div>
            
        </>
    );
}