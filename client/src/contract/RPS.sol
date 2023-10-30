// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract RPS {
    uint256 public amount;
    address public owner;


    struct Game {
        uint256 id;
        address opponent1;
        uint256 move1;
        address opponent2;
        uint256 move2;
        uint256 value;
        address winner;
        uint timestamp;
    }

    struct PendingGame {
        uint256 id;
        address gameCreator;
        uint256 value;
        bool active;
        uint timestamp;
    }

    PendingGame[] public pendingGames;

    Game[] public games;

    mapping(uint256 => uint256) private firstMoves;

    mapping(address => uint256) public claimableRewards;

    mapping(address => uint256) public claimedRewards;

    function getGames() public view returns (Game[] memory _games) {
        _games = games;
    }

    function getPendingGames() public view returns (PendingGame[] memory _pendingGames) {
        _pendingGames = pendingGames;
    }

    function addGame(
        address opt1,
        uint256 move1,
        address opt2,
        uint256 move2,
        uint256 _amount,
        address winner,
        uint _timestamp
    ) private {
        uint id = games.length + 1;
        games.push(Game(
            id,
            opt1,
            move1,
            opt2,
            move2,
            _amount,
            winner,
            _timestamp
        ));

    }



    function addPendingGame(
        uint256 _firstMove,
        address _gameCreator,
        uint _timestamp
    ) private {
        uint id = pendingGames.length + 1;
        pendingGames.push(PendingGame(
            id,
            _gameCreator,
            amount,
            true,
            _timestamp
        ));
        firstMoves[id] = _firstMove;
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


    //0: rock, 1: paper, 2: scissor
    function gameResult(uint move1, uint move2)
    private
    pure
    returns (uint winner)
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
        addPendingGame(_firstMove, msg.sender, block.timestamp);
    }

    function joinGame(uint256 id, uint256 _secondMove) external payable {
        uint256 arrayPosition = id - 1;
        require(msg.value >= amount);
        require(_secondMove == 0 || _secondMove == 2 || _secondMove == 1);
        require(pendingGames[arrayPosition].active == true);
        uint256 result = gameResult(
            firstMoves[pendingGames[arrayPosition].id],
            _secondMove
        );
        pendingGames[arrayPosition].active = false;
        address winner;

        if (result == 0) {
            claimableRewards[pendingGames[arrayPosition].gameCreator] += amount;
            claimableRewards[msg.sender] += amount;
            winner = address(0);
        } else if (result == 1) {
            claimableRewards[pendingGames[arrayPosition].gameCreator] +=
                (amount * 19) /
                10;
            winner = pendingGames[arrayPosition].gameCreator;
        } else if (result == 2) {
            claimableRewards[msg.sender] += (amount * 19) / 10;
            winner = msg.sender;
        }
        addGame(
            pendingGames[arrayPosition].gameCreator,
            firstMoves[id],
            msg.sender,
            _secondMove,
            amount,
            winner,
            block.timestamp
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

    }
}
