// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.9;

contract RPS {

    uint public amount;
    address public owner;
    uint public totalGames;
    uint public totalPendingGames;

    struct Game {
        uint id;
        address opononet1;
        uint move1;
        address opononet2;
        uint move2;
        uint value;
        address winner;
    }

    struct PendingGame {
        uint id;
        address gameCreator;
        uint value;
        bool active;
    }
    
    mapping (uint => uint) private firstMoves;

    mapping (uint => PendingGame) public pendingGames;

    mapping (uint => Game) public games;

    mapping (address => uint) public claimableRewards;

    mapping (address => uint) public claimedRewards;

    function getBallance() public view returns(uint) {
        return address(this).balance;
    }

    function addGame(address opt1, uint move1, address opt2, uint move2, uint _amount, address winner) private {
        totalGames++;
        Game memory game = Game(totalGames,opt1, move1, opt2, move2, _amount, winner);
        games[totalGames] = game;
    }

    function addPendingGame(uint _move,address sender) private{
        totalPendingGames++;
        PendingGame memory pendingGame = PendingGame(totalPendingGames,sender,amount,true);
        pendingGames[totalPendingGames] = pendingGame; 
        firstMoves[totalPendingGames] = _move;
        claimableRewards[sender] += amount;
    }

    function getGame(uint id) public view returns(Game memory game) {
        game = games[id];
    }

    function getPendingGame(uint id) public view returns(PendingGame memory pendingGame){
        pendingGame = pendingGames[id]; 
    }

    function getPlayerGames(address adr) public view returns(Game[] memory Games){
        uint gameCount = 0;
    
        for (uint i = 0; i <= totalGames; i++) {
            if (games[i].opononet1 == adr || games[i].opononet2 == adr) {
                gameCount++;
            }
        }
    
        Games = new Game[](gameCount);
        gameCount = 0;
        
        for (uint i = 0; i <= totalGames; i++) {
            if (games[i].opononet1 == adr || games[i].opononet2 == adr) {
                Games[gameCount] = games[i];
                gameCount++;
            }
        }
    }

    function getPlayerPendingGames(address adr) public view returns(PendingGame[] memory PendingGames) {
        uint pendingGameCount = 0;
        
        for (uint i = 0; i <= totalPendingGames; i++) {
            if (pendingGames[i].gameCreator == adr ) {
                pendingGameCount++;
            }
        }
        
        PendingGames = new PendingGame[](pendingGameCount);
        pendingGameCount = 0;
        
        for (uint i = 0; i <= totalPendingGames; i++) {
            if (pendingGames[i].gameCreator == msg.sender) {
                PendingGames[pendingGameCount] = pendingGames[i];
                pendingGameCount++;
            }
        }
    }

    //function getGameCount() public view returns(uint) {
    //    return playerGames[msg.sender].length;
    //}



    function getClaimableRewards(address adr) public view returns(uint reward){
        reward = claimableRewards[adr]; 
    }


    function getClaimedRewards(address adr) public view returns(uint claimedReward){
        claimedReward = claimedRewards[adr]; 
    }

function getPlayerWins(address adr) public view returns (Game[] memory wins) {
    Game[] memory Games = getPlayerGames(adr);
    uint winCount = 0;
    
    for (uint i = 0; i < Games.length; i++) {
        if (Games[i].winner == adr) {
            winCount++;
        }
    }
    
    wins = new Game[](winCount);
    winCount = 0;
    
    for (uint i = 0; i < Games.length; i++) {
        if (Games[i].winner == msg.sender) {
            wins[winCount] = Games[i];
            winCount++;
        }
    }
}

    function getPlayerDeuces(address adr) public view returns (Game[] memory deuces) {
        Game[] memory Games = getPlayerGames(adr);
        uint deuceCount = 0;
        
        for (uint i = 0; i < Games.length; i++) {
            if (Games[i].winner == address(0)) {
                deuceCount++;
            }
        }
        
        deuces = new Game[](deuceCount);
        deuceCount = 0;
        
        for (uint i = 0; i < Games.length; i++) {
            if (Games[i].winner == address(0)) {
                deuces[deuceCount] = Games[i];
                deuceCount++;
            }
        }
    }

    function getPlayerLooses(address adr) public view returns (Game[] memory looses) {
        Game[] memory Games = getPlayerGames(adr);
        uint looseCount = 0;
        
        for (uint i = 0; i < Games.length; i++) {
            if (Games[i].winner != address(0) && Games[i].winner == adr) {
                looseCount++;
            }
        }
        
        looses = new Game[](looseCount);
        looseCount = 0;
        
        for (uint i = 0; i < Games.length; i++) {
            if (Games[i].winner != address(0) && Games[i].winner == adr) {
                looses[looseCount] = Games[i];
                looseCount++;
            }
        }
    }
        //0: rock, 1: paper, 2: scissor
        function gameResult(uint move1, uint move2) private pure returns(uint winner){
        if ( move1 == 0 && move2 == 0 ) {
            winner = 0;
        } else if ( move1 == 0 && move2 == 2 ) {
            winner = 1;
        } else if ( move1 == 0 && move2 == 1 ) {
            winner = 2;
        } else if ( move1 == 2 && move2 == 2 ) {
            winner = 0;
        } else if ( move1 == 2 && move2 == 0 ) {
            winner = 2;
        } else if ( move1 == 2 && move2 == 1 ) {
            winner = 1;
        } else if ( move1 == 1 && move2 == 1 ) {
            winner = 0;
        }  else if ( move1 == 1 && move2 == 0 ) {
            winner = 1;
        } else if ( move1 == 1 && move2 == 2 ) {
            winner = 2;
        }

    }

    function createGame(uint _firstMove) external payable {
        require(msg.value <= address(msg.sender).balance);
        require(msg.value >= amount);
        require(_firstMove == 0 || _firstMove == 2 || _firstMove == 1);
        addPendingGame(_firstMove, msg.sender);
    }

       function joinGame(uint id, uint _secondMove) external payable {
        require(msg.value >= amount);
        require(_secondMove == 0 || _secondMove == 2 || _secondMove == 1);
        require(pendingGames[id].active == true);
        uint result = gameResult(firstMoves[pendingGames[id].id], _secondMove);
        pendingGames[id].active = false;
        address winner;
        if (result == 0) {
            claimableRewards[pendingGames[id].gameCreator] += amount;
            claimableRewards[msg.sender] += amount;
            winner = address(0x0000000000000000000000000000000000000000);
        }  else if ( result == 1) {
            claimableRewards[pendingGames[id].gameCreator] += amount * 19 / 10;
            winner = pendingGames[id].gameCreator;
        }  else if ( result == 2) {
            claimableRewards[msg.sender] += amount * 19 / 10;
            winner = msg.sender;
        }
        addGame(pendingGames[id].gameCreator, firstMoves[id], msg.sender, _secondMove, amount, winner);
        
       }

           function claimRewards(uint _amount) public {
        require(claimableRewards[msg.sender] > 0);
        require(_amount <= claimableRewards[msg.sender]);
        claimableRewards[msg.sender] -= _amount;
        claimedRewards[msg.sender] += _amount;
        payable(msg.sender).transfer(_amount);
    }

    function cancelGame(uint id) external {
        require(msg.sender == pendingGames[id].gameCreator);
        require(pendingGames[id].active == true);
        pendingGames[id].active = false;
        claimableRewards[msg.sender] += amount;
        }


    function withdraw(uint _amount) external{
        require(msg.sender == owner);
        payable(msg.sender).transfer(_amount);
    }
    constructor(uint _amount) payable {
            amount = _amount;
            owner = msg.sender;
            totalGames = 0;
            totalPendingGames =0;
            
    }

}