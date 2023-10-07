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