// Ghostbusters game

//1. make a 'ghost' class - this will have HP and take damage
//2. make 'Queen' class to extend ghost - has 80HP and takes 7 damage. Also if hitpoints = 0, you win
//3. make 'Worker' class to extend ghost - has 68HP and takes 10 damage.
//4. make 'drone' class to extend ghost - has 60HP and takes 12 damage.
//5. make instances of each character in the game
//6. make text for each object on the html page
//7. allow the text to show the hitpoints for each character
//8. update the hitpoints on the page every time button is pressed too
//9. create a button
//10. when button is pressed, invoke takeDamage() on a random object in the array
//11. every time button is pressed, a new random ghost is targeted.
//12. when all dead, produce an alert
//13. start a new game when over

//create all the classes
class Ghost {
  fullHealth;
  hitpoints;
  damage;

  takeDamage() {
    if (this.hitpoints >= this.damage) {
      return (this.hitpoints = this.hitpoints - this.damage);
    } else return (this.hitpoints = 0);
  }
}

class Queen extends Ghost {
  fullHealth = 80;
  hitpoints = 80;
  damage = 7;

  killAllGhosts(ghostArray) {
    for (ghost in ghostArray) {
      ghost.hitpoints = 0;
      updateHTML(ghostArray);
    }
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("game-over").style.display = "unset";
  }
}

class Worker extends Ghost {
  fullHealth = 68;
  hitpoints = 68;
  damage = 10;
}

class Drone extends Ghost {
  fullHealth = 60;
  hitpoints = 60;
  damage = 12;
}

//create game class

class Game {
  _aliveghosts = [];
  elements = [...document.getElementsByClassName("character")];

  createGhosts = () => {

    const numQueens = 1;
    const numWorkers = 5;
    const numDrones = 8;

    for (let i = 0; i < numQueens; i++) {
        const queen = new Queen();
        ghostArray.push(queen);
    }

    for (let i = 0; i < numWorkers; i++) {
    const worker = new Worker();
    ghostArray.push(worker);
    }

    for (let i = 0; i < numDrones; i++) {
        const drone = new Drone();
        ghostArray.push(drone);
    }
}

  updateAliveGhosts(ghostArray) {
    this._aliveghosts = ghostArray.filter(ghost => {
      return ghost.hitpoints !== 0;
    });
  }

  resetGame() {
    for (let i = 0; i < ghostArray.length; i++) {
      ghostArray[i].hitpoints = ghostArray[i].fullHealth;
      this.elements[i].classList.remove("dead");
    }
    console.log("new game started");
    this.updateHTML();
    document.getElementById("game-screen").style.display = "unset";
    document.getElementById("game-over").style.display = "none";
  }

  updateHTML() {
    for (let i = 0; i < ghostArray.length; i++) {
      if (i < 1) {
        this.elements[i].innerHTML = `<img src="./images/staypuft.jpg" alt="">Staypuft monster: ${ghostArray[i].hitpoints}`;
      } else if (i < 6) {
        this.elements[i].innerHTML = `<img src="./images/slimer.jpg" alt="">Slimer: ${ghostArray[i].hitpoints}`;
      } else {
        this.elements[i].innerHTML = `<img src="./images/ghost.jpg" alt="">Ghost: ${ghostArray[i].hitpoints}`;
      }
      if (ghostArray[i].hitpoints === 0) {
        this.elements[i].innerHTML = `<img src="./images/ghostbusters.gif" alt="">`
        this.elements[i].classList.add("dead");
      }
    }
  }

  damageGhost() {
    this.updateAliveGhosts(ghostArray);
    let x = Math.floor(Math.random() * this._aliveghosts.length);
    console.log(this._aliveghosts[x]);
    this._aliveghosts[x].takeDamage();
    console.log(this._aliveghosts[x]);
    this.updateHTML(ghostArray);
    if (this._aliveghosts[0].hitpoints === 0) {
      ghostArray[0].killAllGhosts();
      this.updateHTML();
    }
  }
}

//creating the ghost objects in an array
const ghostArray = [];

//create a game object

const newGame = new Game();
newGame.createGhosts();
newGame.updateHTML();

//button onclick event to run damage random ghost
mainButton = document.getElementById("mainButton");
mainButton.onclick = () => {
  newGame.damageGhost();
};

restartButton = document.getElementById("restartButton");
restartButton.onclick = () => {
    newGame.resetGame();
    newGame.updateAliveGhosts();
    newGame.updateHTML();
  };