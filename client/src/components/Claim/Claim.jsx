import React, {useState} from "react";
import "./Claim.css";

export default function Claim({state, account}) {
    const [_account] = account;

    const [allowClaim, setAllowClaim] = useState(0);
    const [claimAmount, setClaimAmount] = useState(0);

    const handleChange = (e) => {
        setClaimAmount(e.target.value);
    }

    const getAllowClaim = async () => {
        const value = await state.contract.getClaimableRewards(_account);
        console.log(account);
        setAllowClaim(value);

        setClaimAmount(allowClaim)
    }

    const claimRewards = async () => {
       await state.contract.claimRewards(claimAmount);
    }


    return (
        <div id="claim-container">
            <div id="claim">
                
                <p id="claim-text"></p>

                <div id="claim-value">
                    <input id="" value={claimAmount} onChange={handleChange}/>
                    <p>MAX</p>
                </div>

                <button onClick={claimRewards}>Claim</button>
            </div>
        </div>
    );
}