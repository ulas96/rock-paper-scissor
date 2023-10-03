import { useEffect, useState } from "react";
import "./Play.css";

export default function Play({ state }) {

  const [move,setMove] = useState("");
  const [pendingGames, setPendingGames] = useState([]);

  useEffect(() =>{
    getPendingGames();
  })
  const handleCreateGame = async () => {
    let _move;
    if (move === "rock") {
      _move = 0;
    } else if (move === "paper") {
      _move = 1;
    } else if (move === "scissor") {
      _move = 2;
    }
    const pendingGame = await state.contract.createGame(_move, { value: 10 });
    pendingGame.wait();
    //console.log(pendingGame);
  };

  const handleMoveChange = (event) => {
    const selectedImages = document.querySelectorAll(".selected");

    if (selectedImages.length === 1) {
      selectedImages[0].classList.remove("selected");
    }

    event.target.classList.add("selected");
    setMove(event.target.id);
  };

  const getPendingGames = async () => {
    const _pendingGames = await state.contract.getActivePendingGames();
    setPendingGames(_pendingGames);
  };

  const handleJoinGame = async (e) => {
    let _move;
    if (move === "rock") {
      _move = 0;
    } else if (move === "paper") {
      _move = 1;
    } else if (move == "scissor") {
      _move = 2;
    }
    const game = await state.contract.joinGame(e.target.value, _move, {
      value: 10,
    });
    await game.wait();
  };

  return (
    <div>

      <div className="play-container">
        <div id="move-selection">
          <p id="move-text">
            You can make your move for creating and joining game both by
            clicking to desired hands below.
          </p>
          <div className="move-image-div">
            <img
              src="../src/assets/rock.png"
              className="move-img"
              id="rock"
              onClick={handleMoveChange}
            />
            <img 
              src="../src/assets/paper.png"
              className="move-img"
              id="paper"
              onClick={handleMoveChange}
            />
            <img
              src="../src/assets/scissor.png"
              className="move-img"
              id="scissor"
              onClick={handleMoveChange}
            />
          </div>
        </div>

        <div id="create-button">
          <button className="button" onClick={handleCreateGame}>Create Game</button>
        </div>

        <div id="pending-games">
          <div>
            <p>PendingGames:</p>
          </div>
          <div className="pending-games" height="100px">
            {pendingGames.map((g) => {
              return (
                <div className="pending-game-element">
                  <div className="game-creator" >{g.gameCreator}</div>
                  <button className="button" id="join-button"value={parseInt(g.id._hex)} onClick={handleJoinGame}>
                    join game
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
