var gameOfLife = {
  width: 3,
  height: 3,
  stepInterval: null,

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
    // each board cell has an CSS id in the format of: "x-y"
    // where x is the x-coordinate and y the y-coordinate
    // use this fact to loop through all the ids and assign
    // them "on-click" events that allow a user to click on
    // cells to setup the initial state of the game
    // before clicking "Step" or "Auto-Play"

    // clicking on a cell should toggle the cell between "alive" & "dead"
    // for ex: an "alive" cell be colored "blue", a dead cell could stay white

    // EXAMPLE FOR ONE CELL
    // Here is how we would catch a click event on just the 0-0 cell
    // You need to add the click event on EVERY cell on the board

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

   //  var cell00 = document.getElementById('0-0');
   //  cell00.onclick = onCellClick;

   // for(var x=0; x<this.width; x++) {
   //    for (var y=0; y<this.height; y++) {
   //       var id = x + "-" + y;
   //       document.getElementById(id).onclick = onCellClick;
   //    }
   // }
   this.forEachCell(function(cell) {
      cell.onclick = onCellClick;
   });


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
      var xMax = Math.min(x+1, gameOfLife.width-1);
      var yMin = Math.max(0, y-1);
      var yMax = Math.min(y+1, gameOfLife.width-1);
      for(var i = xMin; i <= xMax; i++) {
         for (var j = yMin; j <= yMax; j++) {
            if( (i != x) && (y != j) ) {
               var cell = document.getElementById( i+"-"+j);
               if(cell.getAttribute('data-status') == 'alive') {
                  aliveCount += 1;
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
      cell.setAttribute('next-status', nextState);
   }
   function setNextState(cell, x, y) {
      if (cell.getAttribute('next-status') != cell.getAttribute('data-status')) {
         cell.onCellClick;
      }
   }


   gameOfLife.forEachCell(getNextState);
   gameOfLife.forEachCell(setNextState);


  },

  enableAutoPlay: function () {
    // Start Auto-Play by running the 'step' function
    // automatically repeatedly every fixed time interval

  }
};


gameOfLife.createAndShowBoard();
document.getElementById("step_btn").onclick = gameOfLife.step;
