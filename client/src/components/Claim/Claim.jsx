import React, {useRef, useState} from "react";

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
       await state.contract.claimRewards(claimAmount)
    }


    return (
        <>
            <div id="claim">
                <div id="claim-value">
                    <input value={claimAmount} onChange={handleChange}></input>
                </div>

                <button onClick={getAllowClaim}>MAX</button>

                <button onClick={claimRewards}>Claim</button>
            </div>
        </>
    );
}