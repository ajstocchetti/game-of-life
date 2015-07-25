var gameOfLife = {
  width: 24,
  height: 24,
  stepInterval: null,
  isPlaying: false,

  createAndShowBoard: function () {
    // create <table> element
    var goltable = document.createElement("tbody");

    // build Table HTML
    var tablehtml = '';
    for (var h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w=0; w<this.width; w++) {
        tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;

    // add table to the #board element
    var board = document.getElementById('board');
    board.appendChild(goltable);

    // once html elements are added to the page, attach events to them
    this.setupBoardEvents();
  },

  forEachCell: function (iteratorFunc) {
    /*
      Write forEachCell here. You will have to visit
      each cell on the board, call the "iteratorFunc" function,
      and pass into func, the cell and the cell's x & y
      coordinates. For example: iteratorFunc(cell, x, y)
    */
      for(var x=0; x<this.width; x++) {
        for (var y=0; y<this.height; y++) {
           var id = x + "-" + y;
           var cell = document.getElementById(id);
           iteratorFunc(cell,x,y);
     }
   }

  },

  setupBoardEvents: function() {
    var onCellClick = function (e) {
      // QUESTION TO ASK YOURSELF: What is "this" equal to here?

      // how to set the style of the cell when it's clicked
      if (this.getAttribute('data-status') == 'dead') {
        this.className = "alive";
        this.setAttribute('data-status', 'alive');
      } else {
        this.className = "dead";
        this.setAttribute('data-status', 'dead');
      }
    };

   this.forEachCell(function(cell) {
      cell.onclick = onCellClick;
   });

   document.getElementById("step_btn").onclick = gameOfLife.step;
   document.getElementById("play_btn").onclick = gameOfLife.enableAutoPlay;
   document.getElementById("reset_btn").onclick = gameOfLife.resetRandom;
   document.getElementById("clear_btn").onclick = gameOfLife.clearBoard;
  },

  step: function () {
    // Here is where you want to loop through all the cells
    // on the board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the next
    // evolution of the game.
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells based on their alive neighbors
    function countLiveNeighbors(x,y) {
      var aliveCount = 0;
      var xMin = Math.max(0, x-1);
      var xMax = Math.min(x+2, gameOfLife.width);
      var yMin = Math.max(0, y-1);
      var yMax = Math.min(y+2, gameOfLife.height);

      var mainID = x+"-"+y;
      for(var i = xMin; i < xMax; i++) {
         for (var j = yMin; j < yMax; j++) {
            var neighborID = i+"-"+j;
            if(mainID !== neighborID) {
               var cell = document.getElementById(neighborID);
               if(cell.getAttribute('data-status') == 'alive') {
                  aliveCount++;
               }
            }
         }
      }
      return aliveCount;
   }

   function getNextState (cell, x, y) {
      var liveNeighbors = countLiveNeighbors(x,y);
      var nextState = 'dead'; // start as dead
      if (cell.getAttribute('data-status') == 'dead' ) {
         if (liveNeighbors == 3) {
            nextState = 'alive';
         }
      } else { // cell is alive
         if (liveNeighbors == 2 || liveNeighbors == 3) {
            nextState = 'alive';
         }
      }
      cell.setAttribute('data-next-status', nextState);
   }
   function setNextState(cell, x, y) {
      if (cell.getAttribute('data-next-status') != cell.getAttribute('data-status')) {
         cell.onclick();
      }
   }


   gameOfLife.forEachCell(getNextState);
   gameOfLife.forEachCell(setNextState);
  },

  enableAutoPlay: function () {
    // Start Auto-Play by running the 'step' function
    // automatically repeatedly every fixed time interval

    if( !gameOfLife.isPlaying) {
      var interval = 250;
      gameOfLife.playingInterval = setInterval(gameOfLife.step, interval);
      gameOfLife.isPlaying = true;
      document.getElementById('play_btn').innerHTML = "Pause";
   } else { // clear playing
      gameOfLife.disablePlaying();
   }
   },

   disablePlaying: function () {
      clearTimeout(gameOfLife.playingInterval);
      gameOfLife.isPlaying = false;
      document.getElementById('play_btn').innerHTML = "Play";
   },



  resetRandom: function () {
     gameOfLife.disablePlaying();
     gameOfLife.forEachCell(assignRand);
     function assignRand(cell, x, y) {
        var probability = 30;
        var rand = Math.floor(Math.random()*100);  // 0-99
        if(rand < probability) {
           // cell is alive
           cell.className = "alive";
           cell.setAttribute('data-status', 'alive');
        }
        else {
           // cell is dead
           cell.className = "dead";
           cell.setAttribute('data-status', 'dead');
        }
     }
 },

 clearBoard: function() {
    gameOfLife.disablePlaying();
    gameOfLife.forEachCell(function(cell) {
      if(cell.getAttribute('data-status') == 'alive') {
         cell.onclick();
      }
   });
}

};


gameOfLife.createAndShowBoard();
