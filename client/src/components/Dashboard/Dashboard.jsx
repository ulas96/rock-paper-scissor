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

    const getPlayerWins = () => {
        let _wins = [];
        for(let i = 0; i < playerGames.length; i++) {
            if(parseInt(playerGames[i].winner) === parseInt(_account)) {
                _wins.push(playerGames[i]);
            }
        }
        setWins(_wins);
    } 
    
    const getPlayerLosses = async () => {
        let _losses = [];
        for(let i = 0; i < playerGames.length; i++) {
            if(parseInt(playerGames[i].winner) !== 0 && parseInt(playerGames[i].winner) !== parseInt(_account)) {
                _losses.push(playerGames[i]);
            }
        }
        setLosses(_losses);
    }
    
    const getPlayerDeuces = async () => {
        let _deuces = [];
        for(let i = 0; i < playerGames.length; i++) {
            if(parseInt(playerGames[i].winner) === 0) {
                _deuces.push(playerGames[i]);
            }
        }
        setDeuces(_deuces);
    }

    const getPlayerGames = async () => {
        const games = await state.contract.getPlayerGames(_account);
        setPlayerGames(games);
        getPlayerWins();
        getPlayerLosses();
        getPlayerDeuces();
    }

    const getPlayerPendingGames = async () => {
        const pendingGames = await state.contract.getPlayerPendingGames(_account);
        setPlayerPendingGames(pendingGames);
    }

    // const hanedleCancelGame = async (e) => {
    //     const game = await state.contract.cancelGame(e.id);
    //     game.wait();
    // }

    const moveConverter = (_move) => {
        if(_move === 0) {
            return "rock";
        }else if(_move === 1) {
            return "paper";
        }else {
            return "scissor";
        }
    }

    useEffect(() => {
        getPlayerGames();
        getPlayerPendingGames();
        console.log(playerGames)
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
                <div className="games" id="total-games">
                {playerGames.map((g) => {
                    return (
                        <div className={`game ${parseInt(g.winner) ===  0 ? "deuce" : parseInt(g.winner) === parseInt(_account) ? "win" : "loss"}`}>
                            <div className="game-child move" >
                                Your move: {g.opponent1 === _account ? moveConverter(parseInt(g.move1)) : moveConverter(parseInt(g.move2))}
                            </div>

                            <div className="game-child opponent" >
                                Opponent: {g.opponent1 === _account ? `${g.opponent1.slice(0,6)}...${g.opponent1.slice(38,42)}` : `${g.opponent2.slice(0,5)}...${g.opponent2.slice(39,42)}`}
                            </div>
                            <div className="game-child date">
                        Date: {new Date(g.timestamp * 1000).getDay() < 10 ? `0${new Date(g.timestamp * 1000).getDay()}` : new Date(g.timestamp * 1000).getDay()}/{new Date(g.timestamp * 1000).getMonth() < 10 ? `0${new Date(g.timestamp * 1000).getMonth()}` : new Date(g.timestamp * 1000).getMonth()}/{new Date(g.timestamp * 1000).getFullYear()} {new Date(g.timestamp * 1000).getHours() < 10 ? `0${new Date(g.timestamp * 1000).getHours()}` : new Date(g.timestamp * 1000).getHours()}:{new Date(g.timestamp * 1000).getMinutes() < 10 ? `0${new Date(g.timestamp * 1000).getMinutes()}` : new Date(g.timestamp * 1000).getMinutes()}
                            </div>
                        </div>

                        
                    );
                })}
                </div>

                <div className="games" id="pending-games">
                {playerPendingGames.map((p) => {
                    return (
                        <div class Name="pending-game" id={parseInt(p.id)}>

                            <div id="pending-game-id">
                                
                            </div>

                            <div className="">
                                Date: {new Date(p.timestamp * 1000).getDay() < 10 ? `0${new Date(p.timestamp * 1000).getDay()}` : new Date(p.timestamp * 1000).getDay()}/{new Date(p.timestamp * 1000).getMonth() < 10 ? `0${new Date(p.timestamp * 1000).getMonth()}` : new Date(p.timestamp * 1000).getMonth()}/{new Date(p.timestamp * 1000).getFullYear()} {new Date(p.timestamp * 1000).getHours() < 10 ? `0${new Date(p.timestamp * 1000).getHours()}` : new Date(p.timestamp * 1000).getHours()}:{new Date(p.timestamp * 1000).getMinutes() < 10 ? `0${new Date(p.timestamp * 1000).getMinutes()}` : new Date(p.timestamp * 1000).getMinutes()}
                            </div>
                            
                        </div>
                    );
                })}
                </div> 
            </div>

        </div>
            
        </>
    );
}