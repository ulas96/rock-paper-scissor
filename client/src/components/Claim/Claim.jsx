import React, {useEffect, useState} from "react";
import "./Claim.css";

export default function Claim({state, account}) {
    const [_account] = account;
    const [claimAmount, setClaimAmount] = useState(0);
    const [claimedRewards, setClaimedRewards] = useState(0)

    useEffect(() => {
        getClaimedRewards();
        console.log(claimedRewards);
    })

    const handleChange = (e) => {
        setClaimAmount(e.target.value);
    }

    const getAllowClaim = async () => {
        const value = await state.contract.getClaimableRewards(_account);

        setClaimAmount(value)
    }

    const claimRewards = async () => {
       await state.contract.claimRewards(claimAmount);
    }

    const getClaimedRewards = async () => {
        const value = await state.contract.getClaimedRewards(_account);
        console.log(value);
        setClaimedRewards(parseInt(value._hex));
    }


    return (
        <div className="claim-container">
            <div className="claim">
                
                <p className="claim-text">Enter amount:</p>

                <div className="claim-value">
                    <input value={claimAmount} onChange={handleChange}/>
                    <p  className="currency">gETH</p>
                    <p className="max" onClick={getAllowClaim}>MAX</p>
                </div>
                <p className="claimed-rewards">{`Previously claimed rewards: ${claimedRewards ? claimedRewards : 0}`}</p>
                <button className="claim-button" onClick={claimRewards}>Claim</button>
            </div>
        </div>
    );
}