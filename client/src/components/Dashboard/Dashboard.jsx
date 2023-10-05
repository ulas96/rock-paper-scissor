import "./Dashboard.css"
import { useEffect, useState } from "react";
import "./Dashboard.css"
export default function Dashboard({state, account}) {

    const [_account] = account

    const [wins, setWins] = useState([]);
    const [loses,setLoses] = useState([]);
    const [deuces, setDeuces] = useState([]);
    const [games, setGames] = useState([]);


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
        setGames(games);
    }


    useEffect(() => {
        getPlayerWins();
        getPlayerLoses();
        getPlayerDeuces();
        getPlayerGames();
    });

    return (
        <>
        <div className="dashboard-container">
            <p>{`Total Games: ${games.length}`}</p>
            <p>{`Wins: ${wins.length}`}</p>
            <p>{`Loses: ${loses.length}`}</p>
            <p>{`Deuces: ${deuces.length}`}</p>
        </div>
            
        </>
    );
}