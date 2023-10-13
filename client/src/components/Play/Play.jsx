import { useEffect, useState } from "react";
import "./Play.css";
import rock from "/Users/ulas/Documents/GitHub/rock-paper-scissor/client/src/assets/paper.png"
import paper from "/Users/ulas/Documents/GitHub/rock-paper-scissor/client/src/assets/rock.png"
import scissor from "/Users/ulas/Documents/GitHub/rock-paper-scissor/client/src/assets/scissor.png"

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
        <div className="move-selection">
          <p className="move-text">
            You can make your move for creating and joining game both by
            clicking to desired hands below.
          </p>
          <div className="move-image-div">
            <img
              src={rock}
              className="move-img"
              id="rock"
              onClick={handleMoveChange}
            />
            <img 
              src={paper}
              className="move-img"
              id="paper"
              onClick={handleMoveChange}
            />
            <img
              src={scissor}
              className="move-img"
              id="scissor"
              onClick={handleMoveChange}
            />
          </div>
        </div>

        <div className="create-button">
          <button className="button" onClick={handleCreateGame}>Create Game</button>
        </div>

        <div className="pending-games-container">
          <div>
            <p>PendingGames:</p>
          </div>
          <div className="pending-games" height="100px">
            {pendingGames.map((g) => {
              return (
                <div className="pending-game-element">
                  <div className="game-creator" >Game Creator: {g.gameCreator.slice(0,4)}...{g.gameCreator.slice(39,42)}</div>
                  <button className="button" id="join-button" value={parseInt(g.id)} onClick={handleJoinGame}>
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
