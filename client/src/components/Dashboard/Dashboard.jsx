import "./Dashboard.css"
import { useEffect, useState } from "react";
export default function Dashboard({state,account}) {

    const [_account] = account

    const [wins, setWins] = useState([]);
    const [loses,setLoses] = useState([]);
    const [deuces, setDeuces] = useState([]);

    const getPlayerWins = async () => {
        const _wins = await state.contract.getPlayerWins(_account);
        setWins(_wins);
    } 

    const getPlayerLoses = async () => {
        const _loses = await state.contract.getPlayerLooses(_account);
        setLoses(_loses);
    }

const getPlayerDeuces = async () => {
    const _deuces =  await state.contract.getPlayerDeuces(_account);
    setDeuces(_deuces);
}


    useEffect(() => {
        getPlayerWins();
        getPlayerLoses();
        getPlayerDeuces();
    });

    return (
        <>
            
            
            <p>{`Wins: ${wins.length}`}</p>
            <p>{`Loses: ${loses.length}`}</p>
            <p>{`Deuces: ${deuces.length}`}</p>
        </>
    );
}