// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract RPS {
    uint256 public amount;
    address public owner;
    uint256 public totalGameCount;
    uint256 public totalPendingGameCount;

    struct Game {
        uint256 id;
        address opponent1;
        uint256 move1;
        address opponent2;
        uint256 move2;
        uint256 value;
        address winner;
    }

    struct PendingGame {
        uint256 id;
        address gameCreator;
        uint256 value;
        bool active;
    }

    mapping(uint256 => uint256) private firstMoves;

    mapping(uint256 => PendingGame) public pendingGames;

    mapping(uint256 => Game) public games;

    mapping(address => uint256) public claimableRewards;

    mapping(address => uint256) public claimedRewards;

    function getBallance() public view returns (uint256) {
        return address(this).balance;
    }

    function getTotoalGameCount() public view returns (uint256) {
        return totalGameCount;
    }

    function getTotalPendingGameCount() public view returns (uint256) {
        return totalPendingGameCount;
    }

    function addGame(
        address opt1,
        uint256 move1,
        address opt2,
        uint256 move2,
        uint256 _amount,
        address winner
    ) private {
        totalGameCount++;
        Game memory game = Game(
            totalGameCount,
            opt1,
            move1,
            opt2,
            move2,
            _amount,
            winner
        );
        games[totalGameCount] = game;
    }

    function addPendingGame(uint256 _move, address sender) private {
        totalPendingGameCount++;
        PendingGame memory pendingGame = PendingGame(
            totalPendingGameCount,
            sender,
            amount,
            true
        );
        pendingGames[totalPendingGameCount] = pendingGame;
        firstMoves[totalPendingGameCount] = _move;
    }

    function getGame(uint256 id) public view returns (Game memory game) {
        game = games[id];
    }

    function getPendingGame(uint256 id)
        public
        view
        returns (PendingGame memory pendingGame)
    {
        pendingGame = pendingGames[id];
    }

    function getActivePendingGames()
        public
        view
        returns (PendingGame[] memory activePendingGames)
    {
        uint256 activePendingGameCount = 0;

        for (uint256 i = 0; i <= totalPendingGameCount; i++) {
            if (pendingGames[i].active == true) {
                activePendingGameCount++;
            }
        }

        activePendingGames = new PendingGame[](activePendingGameCount);
        activePendingGameCount = 0;

        for (uint256 i = 0; i <= totalPendingGameCount; i++) {
            if (pendingGames[i].active == true) {
                activePendingGames[activePendingGameCount] = pendingGames[i];
                activePendingGameCount++;
            }
        }
    }

    function getPlayerGames(address adr)
        public
        view
        returns (Game[] memory Games)
    {
        uint256 gameCount = 0;

        for (uint256 i = 0; i <= totalGameCount; i++) {
            if (games[i].opponent1 == adr || games[i].opponent2 == adr) {
                gameCount++;
            }
        }

        Games = new Game[](gameCount);
        gameCount = 0;

        for (uint256 i = 0; i <= totalGameCount; i++) {
            if (games[i].opponent1 == adr || games[i].opponent2 == adr) {
                Games[gameCount] = games[i];
                gameCount++;
            }
        }
    }

    function getPlayerPendingGames(address adr)
        public
        view
        returns (PendingGame[] memory PendingGames)
    {
        uint256 pendingGameCount = 0;

        for (uint256 i = 0; i <= totalPendingGameCount; i++) {
            if (pendingGames[i].gameCreator == adr) {
                pendingGameCount++;
            }
        }

        PendingGames = new PendingGame[](pendingGameCount);
        pendingGameCount = 0;

        for (uint256 i = 0; i <= totalPendingGameCount; i++) {
            if (pendingGames[i].gameCreator == msg.sender) {
                PendingGames[pendingGameCount] = pendingGames[i];
                pendingGameCount++;
            }
        }
    }

    function getClaimableRewards(address adr)
        public
        view
        returns (uint256 reward)
    {
        reward = claimableRewards[adr];
    }

    function getClaimedRewards(address adr)
        public
        view
        returns (uint256 claimedReward)
    {
        claimedReward = claimedRewards[adr];
    }

    function getPlayerWins(address adr)
        public
        view
        returns (Game[] memory wins)
    {
        Game[] memory Games = getPlayerGames(adr);
        uint256 winCount = 0;

        for (uint256 i = 0; i < Games.length; i++) {
            if (Games[i].winner == adr) {
                winCount++;
            }
        }

        wins = new Game[](winCount);
        winCount = 0;

        for (uint256 i = 0; i < Games.length; i++) {
            if (Games[i].winner == msg.sender) {
                wins[winCount] = Games[i];
                winCount++;
            }
        }
    }

    function getPlayerDeuces(address adr)
        public
        view
        returns (Game[] memory deuces)
    {
        Game[] memory Games = getPlayerGames(adr);
        uint256 deuceCount = 0;

        for (uint256 i = 0; i < Games.length; i++) {
            if (Games[i].winner == address(0)) {
                deuceCount++;
            }
        }

        deuces = new Game[](deuceCount);
        deuceCount = 0;

        for (uint256 i = 0; i < Games.length; i++) {
            if (Games[i].winner == address(0)) {
                deuces[deuceCount] = Games[i];
                deuceCount++;
            }
        }
    }

    function getPlayerLooses(address adr)
        public
        view
        returns (Game[] memory looses)
    {
        Game[] memory Games = getPlayerGames(adr);
        uint256 looseCount = 0;

        for (uint256 i = 0; i < Games.length; i++) {
            if (Games[i].winner != address(0) && Games[i].winner != adr) {
                looseCount++;
            }
        }

        looses = new Game[](looseCount);
        looseCount = 0;

        for (uint256 i = 0; i < Games.length; i++) {
            if (Games[i].winner != address(0) && Games[i].winner == adr) {
                looses[looseCount] = Games[i];
                looseCount++;
            }
        }
    }

    //0: rock, 1: paper, 2: scissor
    function gameResult(uint256 move1, uint256 move2)
        private
        pure
        returns (uint256 winner)
    {
        if (move1 == 0 && move2 == 0) {
            winner = 0;
        } else if (move1 == 0 && move2 == 2) {
            winner = 1;
        } else if (move1 == 0 && move2 == 1) {
            winner = 2;
        } else if (move1 == 2 && move2 == 2) {
            winner = 0;
        } else if (move1 == 2 && move2 == 0) {
            winner = 2;
        } else if (move1 == 2 && move2 == 1) {
            winner = 1;
        } else if (move1 == 1 && move2 == 1) {
            winner = 0;
        } else if (move1 == 1 && move2 == 0) {
            winner = 1;
        } else if (move1 == 1 && move2 == 2) {
            winner = 2;
        }
    }

    function createGame(uint256 _firstMove) external payable {
        require(msg.value <= address(msg.sender).balance);
        require(msg.value >= amount);
        require(_firstMove == 0 || _firstMove == 2 || _firstMove == 1);
        addPendingGame(_firstMove, msg.sender);
    }

    function joinGame(uint256 id, uint256 _secondMove) external payable {
        require(msg.value >= amount);
        require(_secondMove == 0 || _secondMove == 2 || _secondMove == 1);
        require(pendingGames[id].active == true);
        uint256 result = gameResult(
            firstMoves[pendingGames[id].id],
            _secondMove
        );
        pendingGames[id].active = false;
        address winner;
        if (result == 0) {
            claimableRewards[pendingGames[id].gameCreator] += amount;
            claimableRewards[msg.sender] += amount;
            winner = address(0x0000000000000000000000000000000000000000);
        } else if (result == 1) {
            claimableRewards[pendingGames[id].gameCreator] +=
                (amount * 19) /
                10;
            winner = pendingGames[id].gameCreator;
        } else if (result == 2) {
            claimableRewards[msg.sender] += (amount * 19) / 10;
            winner = msg.sender;
        }
        addGame(
            pendingGames[id].gameCreator,
            firstMoves[id],
            msg.sender,
            _secondMove,
            amount,
            winner
        );
    }

    function claimRewards(uint256 _amount) public {
        require(claimableRewards[msg.sender] > 0);
        require(_amount <= claimableRewards[msg.sender]);
        claimableRewards[msg.sender] -= _amount;
        claimedRewards[msg.sender] += _amount;
        payable(msg.sender).transfer(_amount);
    }

    function cancelGame(uint256 id) external {
        require(msg.sender == pendingGames[id].gameCreator);
        require(pendingGames[id].active == true);
        pendingGames[id].active = false;
        claimableRewards[msg.sender] += amount;
    }

    function withdraw(uint256 _amount) external {
        require(msg.sender == owner);
        payable(msg.sender).transfer(_amount);
    }

    constructor(uint256 _amount) payable {
        amount = _amount;
        owner = msg.sender;
        totalGameCount = 0;
        totalPendingGameCount = 0;
    }
}
