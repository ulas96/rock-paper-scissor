import "./Dashboard.css"
import { useEffect, useState } from "react";
export default function Dashboard({state,account}) {

    const [_account] = account

    const [wins, setWins] = useState([]);

    const getPlayerWins = async () => {
        const _wins = await state.contract.getPlayerWins(_account);
        setWins(_wins);
    }

    useEffect(() => {
        getPlayerWins();
    })

    return (
        <>
            {`Number of wins: ${wins.length}`}
        </>
    );
}