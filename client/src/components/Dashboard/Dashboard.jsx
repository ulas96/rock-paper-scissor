import "./Dashboard.css"
import { useEffect, useState } from "react";
import "./Dashboard.css"
export default function Dashboard({state, account}) {

    const [_account] = account
    const [games, setGames] = useState([]);
    const [pendingGames, setPendingGames] = useState([]);
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const [deuces, setDeuces] = useState(0);


    const getPlayerGames = async () => {
        const _games = await state.contract.getGames();
        let playerGames = [];
        let _wins = [];
        let _loses = [];
        let _deuces = [];
        for(let i = 0; i < _games.length; i++) {
            if(parseInt(_games[i].opponent1) === parseInt(_account) || parseInt(_games[i].opponent2) === parseInt(_account)) {
                playerGames.push(_games[i]);
                if (parseInt(_games[i].winner) === 0) {
                    _deuces.push(_games[i]);
                } else if(parseInt(_games[i].winner) === parseInt(_account)) {
                    _wins.push(_games[i]);
                } else if (parseInt(_games[i].winner) !== parseInt(_account)) {
                    _loses.push(_games[i]);
                }
            }
        }

        setGames(playerGames);
        setWins(_wins.length);
        setLosses(_loses.length);
        setDeuces(_deuces.length);
    }

    const getPendingGames = async () => {
        const _pendingGames = await state.contract.getPendingGames();
        setPendingGames(_pendingGames.filter((g) => parseInt(g.gameCreator) === parseInt(_account) && g.active === true));
    }


    const hanedleCancelGame = async (e) => {
        const game = await state.contract.cancelGame(e.target.id);
        game.wait();
    }

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
        getPendingGames();
    });

    return (
        <>
        <div className="dashboard-container">
            <div className="summary">
                <div className="summary-info">
                    <p>Total games:</p>
                    <p>{games.length}</p>
                </div>

                <div className="vertical-line">

                </div>

                <div className="summary-info">
                    <p>Wins:</p>
                    <p>{wins}</p>
                </div>
                
                <div className="vertical-line">

                </div>

                <div className="summary-info">
                <p>Losses:</p>
                    <p>{losses}</p>
                </div>

                <div className="vertical-line">

                </div>

                <div className="summary-info">
                <p>Deuces:</p>
                    <p>{deuces}</p>
                </div>
                
                
                
                
            </div>

            <div className="game-history">

                <div className="total-games">
                <h2>Game History</h2>
                    <div className="total-games-legend">
                        <div>
                                Your move
                        </div>
                                
                        <div>
                                Opponent
                        </div>

                        <div>
                                Date
                        </div>
                    </div>
                    <div className="games" id="total-games">
                    {games.map((g) => {
                        return (
                            <div className={`game ${parseInt(g.winner) ===  0 ? "deuce" : parseInt(g.winner) === parseInt(_account) ? "win" : "loss"}`}>
                                <div className="game-child move" >
                                    {g.opponent1 === _account ? moveConverter(parseInt(g.move1)) : moveConverter(parseInt(g.move2))}
                                </div>

                                <div className="game-child opponent" >
                                    {g.opponent1 === _account ? `${g.opponent1.slice(0,6)}...${g.opponent1.slice(38,42)}` : `${g.opponent2.slice(0,5)}...${g.opponent2.slice(39,42)}`}
                                </div>
                                <div className="game-child date">
                                    {new Date(g.timestamp * 1000).getDay() < 10 ? `0${new Date(g.timestamp * 1000).getDay()}` : new Date(g.timestamp * 1000).getDay()}/{new Date(g.timestamp * 1000).getMonth() < 10 ? `0${new Date(g.timestamp * 1000).getMonth()}` : new Date(g.timestamp * 1000).getMonth()}/{new Date(g.timestamp * 1000).getFullYear()} {new Date(g.timestamp * 1000).getHours() < 10 ? `0${new Date(g.timestamp * 1000).getHours()}` : new Date(g.timestamp * 1000).getHours()}:{new Date(g.timestamp * 1000).getMinutes() < 10 ? `0${new Date(g.timestamp * 1000).getMinutes()}` : new Date(g.timestamp * 1000).getMinutes()}
                                </div>
                            </div>

                            
                        );
                    })}
                    </div>
                </div>

                
                <div className="pending-games">
                    <h2>Pending Games</h2>
                    <div className="pending-games-legend">
                        <div>
                                Date
                        </div>

                        <div>
                                Cancel
                        </div>    
                    </div>

                    <div className="games" id="pending-games">
                    {pendingGames.map((p) => {
                        return (
                            <div className="pending-game" >


                                <div className="">
                                    {new Date(p.timestamp * 1000).getDay() < 10 ? `0${new Date(p.timestamp * 1000).getDay()}` : new Date(p.timestamp * 1000).getDay()}/{new Date(p.timestamp * 1000).getMonth() < 10 ? `0${new Date(p.timestamp * 1000).getMonth()}` : new Date(p.timestamp * 1000).getMonth()}/{new Date(p.timestamp * 1000).getFullYear()} {new Date(p.timestamp * 1000).getHours() < 10 ? `0${new Date(p.timestamp * 1000).getHours()}` : new Date(p.timestamp * 1000).getHours()}:{new Date(p.timestamp * 1000).getMinutes() < 10 ? `0${new Date(p.timestamp * 1000).getMinutes()}` : new Date(p.timestamp * 1000).getMinutes()}
                                </div>
                                

                                <div className="cancel-game" id={parseInt(p.id)} onClick={hanedleCancelGame}>X</div>
                            </div>
                        );
                    })}
                    </div> 
                </div>

            </div>

        </div>
            
        </>
    );
}