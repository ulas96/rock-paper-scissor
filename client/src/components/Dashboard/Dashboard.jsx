import "./Dashboard.css"
import { useEffect, useState } from "react";
import "./Dashboard.css"
export default function Dashboard({state, account}) {

    const [_account] = account
    const [wins, setWins] = useState([]);
    const [losses,setLosses] = useState([]);
    const [deuces, setDeuces] = useState([]);
    const [playerGames, setPlayerGames] = useState([]);
    const [playerPendingGames, setPlayerPendingGames] = useState([]);

    const getPlayerWins = async () => {
        const _wins = await state.contract.getPlayerWins(_account);
        setWins(_wins);
    } 

    const getPlayerLosses = async () => {
        const _losses = await state.contract.getPlayerLoses(_account);
        setLosses(_losses);
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
        getPlayerLosses();
        getPlayerDeuces();
        getPlayerGames();
        getPlayerPendingGames();
    });

    return (
        <>
        <div className="dashboard-container">
            <div className="summary">
                <div className="summary-info">
                    <p>Total games:</p>
                    <p>{playerGames.length}</p>
                </div>

                <div className="vertical-line">

                </div>

                <div className="summary-info">
                    <p>Wins:</p>
                    <p>{wins.length}</p>
                </div>
                
                <div className="vertical-line">

                </div>

                <div className="summary-info">
                <p>Losses:</p>
                    <p>{losses.length}</p>
                </div>

                <div className="vertical-line">

                </div>

                <div className="summary-info">
                <p>Deuces:</p>
                    <p>{deuces.length}</p>
                </div>
                
                
                
                
            </div>

            <div className="game-history">
                <div className="games">
                {playerGames.map((g) => {
                    return (
                        <div className={`game ${parseInt(g.winner) ===  0 ? "deuce" : parseInt(g.winner) === parseInt(_account) ? "win" : "loss"}`}>
                            <div className="game-child" id="id">
                                {parseInt(g.id)}
                            </div>

                            <div className="game-child" id="opponent">
                                Opponent: {g.opponent1 === _account ? `${g.opponent1.slice(0,6)}...${g.opponent1.slice(38,42)}` : `${g.opponent2.slice(0,5)}...${g.opponent2.slice(39,42)}`}
                            </div>
                            <div className="game-child" id="winner">
                                
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