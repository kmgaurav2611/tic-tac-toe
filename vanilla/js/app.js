import View from "./view.js";
import Store from "./store.js";

const players = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

function init() {
  const view = new View();
  const store = new Store("live-t3-storage-key", players);

  // Current tab state changes
  store.addEventListener("statechange", () => {
    view.render(store.game, store.stats);
  });

  // function initView() {
  //   view.closeAll();
  //   view.clearMoves();
  //   view.setTurnIndicator(store.game.currentPlayer);

  //   view.updateScoreBoard(
  //     store.stats.playerWithStats[0].wins,
  //     store.stats.playerWithStats[1].wins,
  //     store.stats.ties
  //   );
  //   view.initializeMoves(store.game.moves);
  // }

  // A different tab state changes
  window.addEventListener("storage", () => {
    // initView();
    view.render(store.game, store.stats);
  });

  // initView();
  view.render(store.game, store.stats);

  view.bindGameResetEvent((event) => {
    store.reset();
  });

  view.bindNewRoundEvent((event) => {
    store.newRound();
  });

  view.bindPlayerMoveEvent((square) => {
    const existingMove = store.game.moves.find(
      (move) => move.squareId === +square.id
    );

    if (existingMove) {
      return;
    }

    // Place an icon of the current player in a square
    // view.handlePlayerMove(square, store.game.currentPlayer);

    // Advance to the next state by pushing a move to the moves array
    store.playerMove(+square.id);

    // if (store.game.status.isComplete) {
    //   view.openModal(
    //     store.game.status.winner
    //       ? `${store.game.status.winner.name} wins!`
    //       : "Tie!"
    //   );

    //   return;
    // }

    // // Set the next player's turn indicator
    // view.setTurnIndicator(store.game.currentPlayer);
  });

  console.log(view.$.turn);
}

window.addEventListener("load", init);
