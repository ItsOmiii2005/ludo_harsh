let socket = io(
  window.location.href.substring(0, window.location.href.length - 7)
);

//modal
document.body.onload = function() {
    topic = window.prompt("Please Provide the Topic Name to provide question on that topic");
    topic ? cat = topic : console.log("Please provide the Topic Name to provide question on that topic");  
}

// user
let user = {
  player_1: "hello world programmer",
  player_2: "Omanand",
  player_3: "Akshay",
  player_4: "Prathmesh",
};

const room_code = window.location.href.substring(
  window.location.href.length - 6
);
const USERNAMES = [user.player_1, user.player_2, user.player_3, user.player_4];
const PIECES = [];
const colors = ["green", "red", "blue", "yellow"];
let MYROOM = [];
let myid = -1;
let chance = Number(-1);
var PLAYERS = {};

// if user creaets the mcq app then it loss 10 tokens
const assignedTokens = 70;
console.log(assignedTokens);

var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");
canvas.height = 750;
canvas.width = 750;

let allPiecesePos = {
  0: [
    { x: 50, y: 125 },
    { x: 125, y: 50 },
    { x: 200, y: 125 },
    { x: 125, y: 200 },
  ],
  1: [
    { x: 500, y: 125 },
    { x: 575, y: 50 },
    { x: 650, y: 125 },
    { x: 575, y: 200 },
  ],
  2: [
    { x: 500, y: 575 },
    { x: 575, y: 500 },
    { x: 650, y: 575 },
    { x: 575, y: 650 },
  ],
  3: [
    { x: 50, y: 575 },
    { x: 125, y: 500 },
    { x: 200, y: 575 },
    { x: 125, y: 650 },
  ],
};

let homeTilePos = {
  0: { 0: { x: 50, y: 300 }, 1: { x: 300, y: 100 } },
  1: { 0: { x: 400, y: 50 }, 1: { x: 600, y: 300 } },
  2: { 0: { x: 650, y: 400 }, 1: { x: 400, y: 600 } },
  3: { 0: { x: 300, y: 650 }, 1: { x: 100, y: 400 } },
};

class Player {
  constructor(id) {
    this.id = String(id);
    this.myPieces = new Object();
    for (let i = 0; i < 4; i++) {
      this.myPieces[i] = new Piece(String(i), String(id));
    }
    this.won = parseInt(0);
  }
  draw() {
    for (let i = 0; i < 4; i++) {
      this.myPieces[i].draw();
    }
  }

  didIwin() {
    if (this.won == 4) {
      return 1;
    } else {
      return 0;
    }
  }
}

class Piece {
  constructor(i, id) {
    this.path = [];
    this.color_id = String(id);
    console.log(this.color_id, typeof this.color_id);
    this.Pid = String(i);
    this.pos = -1;
    this.x = parseInt(allPiecesePos[this.color_id][this.Pid].x);
    this.y = parseInt(allPiecesePos[this.color_id][this.Pid].y);
    this.image = PIECES[this.color_id];
    switch (id) {
      case "0":
        console.log("switch is working");
        for (let i = 0; i < 4; i++) {
          this.path.push(this.oneStepToRight);
        }
        this.path.push(this.oneStepTowards45);
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToTop);
        }
        for (let i = 0; i < 2; i++) {
          this.path.push(this.oneStepToRight);
        }
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToBottom);
        }
        this.path.push(this.oneStepTowards315);
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToRight);
        }
        for (let i = 0; i < 2; i++) {
          this.path.push(this.oneStepToBottom);
        }
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToLeft);
        }
        this.path.push(this.oneStepTowards225);
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToBottom);
        }
        for (let i = 0; i < 2; i++) {
          this.path.push(this.oneStepToLeft);
        }
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToTop);
        }
        this.path.push(this.oneStepTowards135);
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToLeft);
        }
        this.path.push(this.oneStepToTop);
        for (let i = 0; i < 6; i++) {
          this.path.push(this.oneStepToRight);
        }
        break;
      case "1":
        for (let i = 0; i < 4; i++) {
          this.path.push(this.oneStepToBottom);
        }
        this.path.push(this.oneStepTowards315);
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToRight);
        }
        for (let i = 0; i < 2; i++) {
          this.path.push(this.oneStepToBottom);
        }
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToLeft);
        }
        this.path.push(this.oneStepTowards225);
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToBottom);
        }
        for (let i = 0; i < 2; i++) {
          this.path.push(this.oneStepToLeft);
        }
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToTop);
        }
        this.path.push(this.oneStepTowards135);
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToLeft);
        }
        for (let i = 0; i < 2; i++) {
          this.path.push(this.oneStepToTop);
        }
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToRight);
        }
        this.path.push(this.oneStepTowards45);
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToTop);
        }
        this.path.push(this.oneStepToRight);
        for (let i = 0; i < 6; i++) {
          this.path.push(this.oneStepToBottom);
        }
        break;
      case "2":
        for (let i = 0; i < 4; i++) {
          this.path.push(this.oneStepToLeft);
        }
        this.path.push(this.oneStepTowards225);
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToBottom);
        }
        for (let i = 0; i < 2; i++) {
          this.path.push(this.oneStepToLeft);
        }
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToTop);
        }
        this.path.push(this.oneStepTowards135);
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToLeft);
        }
        for (let i = 0; i < 2; i++) {
          this.path.push(this.oneStepToTop);
        }
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToRight);
        }
        this.path.push(this.oneStepTowards45);
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToTop);
        }
        for (let i = 0; i < 2; i++) {
          this.path.push(this.oneStepToRight);
        }
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToBottom);
        }
        this.path.push(this.oneStepTowards315);
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToRight);
        }
        this.path.push(this.oneStepToBottom);
        for (let i = 0; i < 6; i++) {
          this.path.push(this.oneStepToLeft);
        }
        break;
      case "3":
        for (let i = 0; i < 4; i++) {
          this.path.push(this.oneStepToTop);
        }
        this.path.push(this.oneStepTowards135);
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToLeft);
        }
        for (let i = 0; i < 2; i++) {
          this.path.push(this.oneStepToTop);
        }
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToRight);
        }
        this.path.push(this.oneStepTowards45);
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToTop);
        }
        for (let i = 0; i < 2; i++) {
          this.path.push(this.oneStepToRight);
        }
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToBottom);
        }
        this.path.push(this.oneStepTowards315);
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToRight);
        }
        for (let i = 0; i < 2; i++) this.path.push(this.oneStepToBottom);
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToLeft);
        }
        this.path.push(this.oneStepTowards225);
        for (let i = 0; i < 5; i++) {
          this.path.push(this.oneStepToBottom);
        }
        this.path.push(this.oneStepToLeft);
        for (let i = 0; i < 6; i++) {
          this.path.push(this.oneStepToTop);
        }
        break;
    }
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, 50, 50);
  }

  update(num) {
    if (this.pos != -1 && this.pos + num <= 56) {
      for (let i = this.pos; i < this.pos + num; i++) {
        this.path[i](this.color_id, this.Pid);
        console.log("Harsh Kale");
      }
      this.pos += num;
      if (this.pos == 56) {
        window.PLAYERS[this.color_id].won += 1;
      }
    } else if (num == 6 && this.pos == -1) {
      this.x = homeTilePos[this.color_id][0].x;
      this.y = homeTilePos[this.color_id][0].y;
      this.pos = 0;
    }
  }

  oneStepToRight(id, pid) {
    window.PLAYERS[id].myPieces[pid].x += 50;
    console.log("to r", this.x, this.y, typeof this.x, typeof this.y);
  }

  oneStepToLeft(id, pid) {
    window.PLAYERS[id].myPieces[pid].x -= 50;
    console.log("to l", this.x, this.y, typeof this.x, typeof this.y);
  }

  oneStepToTop(id, pid) {
    window.PLAYERS[id].myPieces[pid].y -= 50;
    console.log("to t", this.x, this.y, typeof this.x, typeof this.y);
  }

  oneStepToBottom(id, pid) {
    window.PLAYERS[id].myPieces[pid].y += 50;
    console.log("to b", this.x, this.y, typeof this.x, typeof this.y);
  }

  oneStepTowards45(id, pid) {
    window.PLAYERS[id].myPieces[pid].x += 50;
    window.PLAYERS[id].myPieces[pid].y -= 50;
    console.log("to 45", this.x, this.y, typeof this.x, typeof this.y);
  }

  oneStepTowards135(id, pid) {
    window.PLAYERS[id].myPieces[pid].x -= 50;
    window.PLAYERS[id].myPieces[pid].y -= 50;
    console.log("to 135", this.x, this.y, typeof this.x, typeof this.y);
  }

  oneStepTowards225(id, pid) {
    window.PLAYERS[id].myPieces[pid].x -= 50;
    window.PLAYERS[id].myPieces[pid].y += 50;
    console.log("to 225", this.x, this.y, typeof this.x, typeof this.y);
  }

  oneStepTowards315(id, pid) {
    window.PLAYERS[id].myPieces[pid].x += 50;
    window.PLAYERS[id].myPieces[pid].y += 50;
    console.log("to 315", this.x, this.y, typeof this.x, typeof this.y);
  }

  kill() {
    this.x = allPiecesePos[this.color_id][this.Pid].x;
    this.y = allPiecesePos[this.color_id][this.Pid].y;
    this.pos = -1;
  }
}

socket.on("connect", function () {
  console.log("You are connected to the server!!");

  socket.emit("fetch", room_code, function (data, id) {
    MYROOM = data.sort(function (a, b) {
      return a - b;
    });
    for (let i = 0; i < MYROOM.length; i++) {
      MYROOM[i] = +MYROOM[i];
    }
    myid = id;
    console.log("*/*/2024 fetched:", MYROOM, myid, chance);
    StartTheGame();
  });

  //To simulate dice
  if (chance === myid) {
    document
      .querySelector("#randomButt")
      .addEventListener("click", function (event) {
        event.preventDefault();
        console.log("*/*/2024 randomButt clicked");
        styleButton(0);
        diceAction();
      });
  }

  socket.on("imposter", () => {
    window.location.replace("/error-imposter");
  });

  socket.on("is-it-your-chance", function (data) {
    if (data === myid) {
      styleButton(1);
      outputMessage({ Name: "your", id: data }, 4);
    } else {
      outputMessage({ Name: USERNAMES[data] + "'s", id: data }, 4);
    }
    chance = Number(data);
    window.localStorage.setItem("chance", chance.toString());
  });

  socket.on("new-user-joined", function (data) {
    MYROOM.push(data.id);
    MYROOM = [...new Set(MYROOM)];
    MYROOM.sort(function (a, b) {
      return a - b;
    });
    for (let i = 0; i < MYROOM.length; i++) {
      MYROOM[i] = +MYROOM[i];
    }
    loadNewPiece(data.id);
    outputMessage({ Name: USERNAMES[data.id], id: data.id }, 0);
    //stop timer,and hide modal.
    document.getElementById("myModal-2").style.display = "none";
    let butt = document.getElementById("WAIT");
    butt.disabled = false;
    butt.style.opacity = 1;
    butt.style.cursor = "pointer";
    clearInterval(window.timer);
  });

  socket.on("user-disconnected", function (data) {
    outputMessage({ Name: USERNAMES[data], id: data }, 6);
    resumeHandler(data);
  });

  socket.on("resume", function (data) {
    resume(data.id);
    data.id == data.click
      ? outputMessage(
          { id: data.id, msg: `Resumed the game without ${USERNAMES[id]}` },
          5
        )
      : outputMessage(
          {
            id: data.click,
            msg: `${USERNAMES[data.click]} has resumed the game without ${
              USERNAMES[data.id]
            }`,
          },
          5
        );
  });

  socket.on("wait", function (data) {
    wait();
    outputMessage(
      { id: data.click, msg: `${USERNAMES[data.click]} has decided to wait` },
      5
    );
  });

  socket.on("rolled-dice", function (data) {
    Number(data.id) != myid
      ? outputMessage(
          { Name: USERNAMES[data.id], Num: data.num, id: data.id },
          1
        )
      : outputMessage({ Name: "you", Num: data.num, id: data.id }, 1);
  });

  socket.on("Thrown-dice", async function (data) {
    console.log(data);
    await PLAYERS[data.id].myPieces[data.pid].update(data.num);
    if (iKill(data.id, data.pid)) {
      outputMessage({ msg: "Oops got killed", id: data.id }, 5);
      allPlayerHandler();
    } else {
      allPlayerHandler();
    }
    if (PLAYERS[data.id].didIwin()) {
      socket.emit("WON", {
        room: data.room,
        id: data.id,
        player: myid,
      });
    }
  });

  socket.on("winner", function (data) {
    showModal(data);
  });
});

//To know if the client has disconnected with the server
socket.on("disconnect", function () {
  console.log("You are disconnected to the server");
});

//Output the message through DOM manipulation
function outputMessage(anObject, k) {
  let msgBoard = document.querySelector(".msgBoard");

  if (
    k === 1 &&
    !(
      anObject.Name.includes("<") ||
      anObject.Name.includes(">") ||
      anObject.Name.includes("/")
    )
  ) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p><strong>&#9733;  <span id="color-message-span1"style="text-shadow: 0 0 4px ${
      colors[anObject.id]
    };">${anObject.Name}</span></strong><span id="color-message-span2"> got a ${
      anObject.Num
    }</span></p>`;
    msgBoard.appendChild(div);
  } else if (
    k === 0 &&
    !(
      anObject.Name.includes("<") ||
      anObject.Name.includes(">") ||
      anObject.Name.includes("/")
    )
  ) {
    const div = document.createElement("div");
    div.classList.add("messageFromServer");
    div.innerHTML = `<p>&#8605;  <span id="color-message-span1"style="text-shadow: 0 0 4px ${
      colors[anObject.id]
    };">${
      anObject.Name
    }</span><span id="color-message-span2"> entered the game</span></p>`;
    msgBoard.appendChild(div);
  } else if (k === 3) {
    const div = document.createElement("div");
    div.classList.add("messageFromServer");
    div.innerHTML = `<span id="color-message-span2" style="text-shadow: 0 0 4px ${colors[myid]};">${anObject}!!</span>`;
    msgBoard.appendChild(div);
  } else if (k === 4) {
    const div = document.createElement("div");
    div.classList.add("messageFromServer");
    div.innerHTML = `<p><span id="color-message-span2">Its </span><span id="color-message-span1"style="text-shadow: 0 0 4px ${
      colors[anObject.id]
    };">${
      anObject.Name
    }</span><span id="color-message-span2"> chance!!</span></p>`;
    msgBoard.appendChild(div);
  } else if (k === 5) {
    const div = document.createElement("div");
    div.classList.add("messageFromServer");
    div.innerHTML = `<span id="color-message-span2" style="text-shadow: 0 0 4px ${
      colors[anObject.id]
    };">${anObject.msg}!!</span>`;
    msgBoard.appendChild(div);
  } else if (k === 6) {
    const div = document.createElement("div");
    div.classList.add("messageFromServer");
    div.innerHTML = `<p>&#8605;  <span id="color-message-span1"style="text-shadow: 0 0 4px ${
      colors[anObject.id]
    };">${
      anObject.Name
    }</span><span id="color-message-span2"> just left the game</span></p>`;
    msgBoard.appendChild(div);
  }
  msgBoard.scrollTop = msgBoard.scrollHeight - msgBoard.clientHeight;
}

//button disabling-enabling
function styleButton(k) {
  let butt = document.getElementById("randomButt");
  if (k === 0) {
    butt.disabled = true;
    butt.style.opacity = 0.6;
    butt.style.cursor = "not-allowed";
    butt.style.backgroundImage =
      "linear-gradient(to bottom right, red, yellow)";
  } else if (k === 1) {
    butt.disabled = false;
    butt.style.opacity = 1;
    butt.style.cursor = "pointer";
    butt.style.backgroundImage =
      "linear-gradient(to bottom right, red, yellow)";
  }
}

//simulates the action of dice and also chance rotation.
function diceAction() {
  socket.emit("roll-dice", { room: room_code, id: myid }, function (num) {
    console.log("19/6/21 dice rolled, got", num);
    let spirit = [];
    for (let i = 0; i < 4; i++) {
      if (
        PLAYERS[myid].myPieces[i].pos > -1 &&
        PLAYERS[myid].myPieces[i].pos + num <= 56
      ) {
        spirit.push(i);
      }
    }
    if (spirit.length != 0 || num == 6) {
      let isPieceOut = spirit.length > 0;

      if (isPieceOut && num > 2) {
        outputMessage("Click on a piece", 3);
        canvas.addEventListener("click", function clickHandler(e) {
          console.log("19/6/21 click event listener added to canvas element");
          let Xp = e.clientX - e.target.getBoundingClientRect().left;
          let Yp = e.clientY - e.target.getBoundingClientRect().top;

          let playerObj = {
            room: room_code,
            id: myid,
            num: num,
          };
          let alert1 = true;

          for (let i = 0; i < 4; i++) {
            if (
              Xp - PLAYERS[myid].myPieces[i].x < 45 &&
              Xp - PLAYERS[myid].myPieces[i].x > 0 &&
              Yp - PLAYERS[myid].myPieces[i].y < 45 &&
              Yp - PLAYERS[myid].myPieces[i].y > 0
            ) {
              console.log(i, "okokokok");

              if (
                (spirit.includes(i) || num == 6) &&
                PLAYERS[myid].myPieces[i].pos + num <= 56
              ) {
                playerObj["pid"] = i;

                // Display the question prompt before moving the piece
                displayQuestion(function (isCorrect) {
                  if (isCorrect) {
                    // Replace with the correct answer
                    socket.emit("random", playerObj, function (data) {
                      styleButton(0);
                      console.log("random acknowledged");
                      socket.emit("chance", {
                        room: room_code,
                        nxt_id: chanceRotation(myid, data),
                      });
                    });
                  } else {
                    // return 0;
                    alert("Wrong Answer! You Will Go Ahed By Only 1 Step :(");

                    socket.emit("randomelse", playerObj, function (data) {
                      styleButton(0);
                      console.log("random acknowledged");
                      socket.emit("chance", {
                        room: room_code,
                        nxt_id: chanceRotation(myid, data),
                      });
                    });
                  }

                  canvas.removeEventListener("click", clickHandler);
                });
                return 0;
              } else {
                alert("Please click on a valid Piece.");
                alert1 = false;
                break;
              }
            }
          }
          if (alert1) {
            alert("You need to click on a piece of your color");
          }
        });
      } else {
        outputMessage("Click on a piece", 3);
        canvas.addEventListener("click", function clickHandler(e) {
          console.log("19/6/21 click event litener added to canvas element");
          let Xp = e.clientX - e.target.getBoundingClientRect().left;
          let Yp = e.clientY - e.target.getBoundingClientRect().top;
          let playerObj = {
            room: room_code,
            id: myid,
            num: num,
          };
          let alert1 = true;

          for (let i = 0; i < 4; i++) {
            if (
              Xp - PLAYERS[myid].myPieces[i].x < 45 &&
              Xp - PLAYERS[myid].myPieces[i].x > 0 &&
              Yp - PLAYERS[myid].myPieces[i].y < 45 &&
              Yp - PLAYERS[myid].myPieces[i].y > 0
            ) {
              console.log(i, "okokokok");
              if (
                (spirit.includes(i) || num == 6) &&
                PLAYERS[myid].myPieces[i].pos + num <= 56
              ) {
                playerObj["pid"] = i;
                console.log(playerObj);
                socket.emit("random", playerObj, function (data) {
                  styleButton(0);
                  console.log("random acknowledged");
                  socket.emit("chance", {
                    room: room_code,
                    nxt_id: chanceRotation(myid, data),
                  });
                });
                canvas.removeEventListener("click", clickHandler);
                return 0;
              } else {
                alert("Please click on a valid Piece.");
                alert1 = false;
                break;
              }
            }
          }
          if (alert1) {
            alert("You need to click on a piece of your color");
          }
        });
      }
    } else {
      socket.emit("chance", {
        room: room_code,
        nxt_id: chanceRotation(myid, num),
      });
      console.log("19/6/21 next chance");
    }
  });
}

// Array of MCQ questions and options
const mcqQuestions = [
  {
    question:
      "Which of these schools was not among the early leaders in AI research?",
    options: [
      "\na. Dartmouth University",
      "\nb. Harvard University",
      "\nc. Massachusetts Institute of Technology",
      "\nd. Stanford University",
      "\ne. None of the above",
    ],
    correctAnswer: "b",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["\na. Earth", "\nb. Mars", "\nc. Jupiter", "\nd. Venus"],
    correctAnswer: "b",
  },
  {
    question:
      "DARPA, the agency that has funded a great deal of American AI research, is part of the Department of:",
    options: [
      "\na. Defense",
      "\nb. Energy",
      "\nc. Education",
      "\nd. Justice",
      "\ne. None of the above",
    ],
    correctAnswer: "a",
  },
  {
    question:
      "The conference that launched the AI revolution in 1956 was held at:",
    options: [
      "\na. Dartmouth",
      "\nb. Harvard",
      "\nc. New York",
      "\nd. Stanford",
      "\ne. None of the above",
    ],
    correctAnswer: "a",
  },
  {
    question:
      "What is the term used for describing the judgmental or commonsense part of problem solving?",
    options: [
      "\na. Heuristic",
      "\nb. Critical",
      "\nc. Value based",
      "\nd. Analytical",
      "\ne. None of the above",
    ],
    correctAnswer: "a",
  },
  {
    question:
      "What of the following is considered to be a pivotal event in the history of AI.",
    options: [
      "\na. 1949, Donald O, The organization of Behavior.",
      "\nb. 1950, Computing Machinery and Intelligence.",
      "\nc. 1956, Dartmouth University Conference Organized by John McCarthy.",
      "\nd. 1961, Computer and Computer Sense.",
      "\ne. None of the above",
    ],
    correctAnswer: "c",
  },
  {
    question:
      "A certain Professor at the Stanford University coined the word 'artificial intelligence' in 1956 at a conference held at Dartmouth College. Can you name the Professor?",
    options: [
      "\na. David Levy",
      "\nb. John McCarthy",
      "\nc. Joseph Weizenbaum",
      "\nd. Hans Berliner",
      "\ne. None of the above",
    ],
    correctAnswer: "b",
  },
  {
    question:
      "The field that investigates the mechanics of human intelligence is:",
    options: [
      "\na. History",
      "\nb. Cognitive Science",
      "\nc. Psychology",
      "\nd. Sociology",
      "\ne. None of the above",
    ],
    correctAnswer: "b",
  },
  {
    question:
      "A.M. Turing developed a technique for determining whether a computer could or could not demonstrate artificial intelligence. Presently, this technique is called",
    options: [
      "\na. Turing Test",
      "\nb. Algorithm",
      "\nc. Boolean Algebra",
      "\nd. Logarithm",
      "\ne. None of the above",
    ],
    correctAnswer: "a",
  },
  {
    question: "The first AI programming language was called:",
    options: [
      "\na. BASIC",
      "\nb. FORTRAN",
      "\nc. IPL",
      "\nd. LISP",
      "\ne. None of the above",
    ],
    correctAnswer: "c",
  },
  {
    question: "What is Artificial Intelligence?",
    options: [
      "\na. Putting your intelligence into Computer",
      "\nb. Programming with your own intelligence",
      "\nc. Making a Machine intelligent",
      "\nd. Putting more memory into Computer",
    ],
    correctAnswer: "c",
  },
  {
    question: "Who is the father of AI?",
    options: [
      "\na. Alain Colmerauer",
      "\nb. John McCarthy",
      "\nc. Nicklaus Wirth",
      "\nd. Seymour Papert",
    ],
    correctAnswer: "b",
  },
  {
    question:
      "Artificial Intelligence has its expansion in the following applications.",
    options: [
      "\na. Planning and Scheduling",
      "\nb. Game Playing",
      "\nc. Robotics",
      "\nd. All of the above",
    ],
    correctAnswer: "d",
  },
  {
    question:
      "The characteristics of the computer system capable of thinking, reasoning, and learning are known as",
    options: [
      "\na. Machine Intelligence",
      "\nb. Human Intelligence",
      "\nc. Artificial Intelligence",
      "\nd. Virtual Intelligence",
    ],
    correctAnswer: "c",
  },
  {
    question: "The first AI programming language was called:",
    options: ["\na. BASIC", "\nb. FORTRAN", "\nc. IPL", "\nd. LISP"],
    correctAnswer: "c",
  },
  {
    question:
      "The first widely used commercial form of Artificial Intelligence (AI) is being used in many popular products like microwave ovens, automobiles, and plug-in circuit boards for desktop PCs. What is the name of AI?",
    options: [
      "\na. Boolean logic",
      "\nb. Human logic",
      "\nc. Fuzzy logic",
      "\nd. Functional logic",
    ],
    correctAnswer: "c",
  },
  {
    question:
      "What is the term used for describing the judgmental or commonsense part of problem-solving?",
    options: [
      "\na. Heuristic",
      "\nb. Critical",
      "\nc. Value-based",
      "\nd. Analytical",
    ],
    correctAnswer: "a",
  },
  {
    question:
      "______ is a branch of computer science that deals with helping machines find solutions to complex problems in a more human-like fashion.",
    options: [
      "\na. Artificial Intelligence",
      "\nb. Internet of Things",
      "\nc. Embedded System",
      "\nd. Cyber Security",
    ],
    correctAnswer: "a",
  },
  {
    question:
      "In ____ the goal is for the software to use what it has learned in one area to solve problems in other areas.",
    options: [
      "\na. Machine Learning",
      "\nb. Deep Learning",
      "\nc. Neural Networks",
      "\nd. None of these",
    ],
    correctAnswer: "b",
  },
  {
    question:
      "Computer programs that mimic the way the human brain processes information is called as",
    options: [
      "\na. Machine Learning",
      "\nb. Deep Learning",
      "\nc. Neural Networks",
      "\nd. None of these",
    ],
    correctAnswer: "c",
  },
  {
    question:
      "A ____ is a rule of thumb, strategy, trick, simplification, or any other kind of device which drastically limits search for solutions in large problem spaces.",
    options: [
      "\na. Heuristic",
      "\nb. Critical",
      "\nc. Value based",
      "\nd. Analytical",
    ],
    correctAnswer: "a",
  },
  {
    question: "______ do not guarantee optimal/any solutions",
    options: [
      "\na. Heuristic",
      "\nb. Critical",
      "\nc. Value based",
      "\nd. Analytical",
    ],
    correctAnswer: "a",
  },
  {
    question: "Cognitive science related with _____",
    options: [
      "\na. Act like human",
      "\nb. ELIZA",
      "\nc. Think like human",
      "\nd. None of above",
    ],
    correctAnswer: "c",
  },
  {
    question: "_____ Model should reflect how results were obtained.",
    options: [
      "\na. Design model",
      "\nb. Logic model",
      "\nc. Computational model",
      "\nd. None of above",
    ],
    correctAnswer: "c",
  },
  {
    question: "Communication between man and machine is related to ______",
    options: [
      "\na. LISP",
      "\nb. ELIZA",
      "\nc. All of above",
      "\nd. None of above",
    ],
    correctAnswer: "b",
  },
  {
    question: "ELIZA created by _____",
    options: [
      "\na. John McCarthy",
      "\nb. Steve Russell",
      "\nc. Alain Colmerauer",
      "\nd. Joseph Weizenbaum",
    ],
    correctAnswer: "d",
  },
  {
    question: "The core components are constituents of AI are derived from",
    options: [
      "\na. Concept of logic",
      "\nb. Cognition",
      "\nc. Computation",
      "\nd. All of above",
    ],
    correctAnswer: "d",
  },
  {
    question:
      "Aristotle’s theory of syllogism and Descartes and Kant’s critic of pure reasoning made knowledge on _____.",
    options: [
      "\na. Logic",
      "\nb. Computation logic",
      "\nc. Cognition logic",
      "\nd. All of above",
    ],
    correctAnswer: "a",
  },
  {
    question: "Charles Babbage and Boole who demonstrate the power of _______",
    options: [
      "\na. Logic",
      "\nb. Computation logic",
      "\nc. Cognition logic",
      "\nd. All of above",
    ],
    correctAnswer: "b",
  },
  {
    question:
      "In 1960s, _____ pushed the logical formalism to integrate reasoning with knowledge.",
    options: [
      "\na. Marvin Minsky",
      "\nb. Alain Colmerauer",
      "\nc. John McCarthy",
      "\nd. None of above",
    ],
    correctAnswer: "a",
  },
  {
    question:
      "Sensing organs as input, mechanical movement organs as output and central nervous system (CNS) in the brain as control and computing devices is known as _____ of human being",
    options: [
      "\na. Information Control Paradigm",
      "\nb. Information Processing Paradigm",
      "\nc. Information Processing Control",
      "\nd. None of above",
    ],
    correctAnswer: "b",
  },
  {
    question:
      "_____ model was developed and incorporated in machines which mimicked the functionalities of human origin.",
    options: [
      "\na. Functional model",
      "\nb. Neural model",
      "\nc. Computational model",
      "\nd. None of above",
    ],
    correctAnswer: "c",
  },
  {
    question:
      "Chomsky’s linguistic computational theory generated a model for syntactic analysis through ________",
    options: [
      "\na. Regular Grammar",
      "\nb. Regular Expression",
      "\nc. Regular Word",
      "\nd. None of these",
    ],
    correctAnswer: "a",
  },
  {
    question: "Human to Machine is _____ and Machine to Machine is ______.",
    options: [
      "\na. Process, Process",
      "\nb. Process, Program",
      "\nc. Program, Hardware",
      "\nd. Program, Program",
    ],
    correctAnswer: "c",
  },
  {
    question: "Weak AI is also known as ____",
    options: [
      "\na. Narrow AI",
      "\nb. General AI",
      "\nc. Neural AI",
      "\nd. None of above",
    ],
    correctAnswer: "a",
  },
  {
    question: "_____ AI is able to perform a dedicated task.",
    options: [
      "\na. Narrow AI",
      "\nb. General AI",
      "\nc. Neural AI",
      "\nd. None of above",
    ],
    correctAnswer: "a",
  },
  {
    question: "Narrow AI performs multiple tasks at a time.",
    options: ["\na. True", "\nb. False"],
    correctAnswer: "b",
  },
  {
    question: "Weak AI is____________",
    options: [
      "\na. The embodiment of human intellectual capabilities within a computer.",
      "\nb. A set of computer programs that produce output that would be considered to reflect intelligence if it were generated by humans.",
      "\nc. The study of mental faculties through the use of mental models implemented on a computer",
      "\nd. All of the above",
      "\ne. None of the above",
    ],
    correctAnswer: "c",
  },
  {
    question: "Strong AI is__________",
    options: [
      "\na. The embodiment of human intellectual capabilities within a computer.",
      "\nb. A set of computer programs that produce output that would be considered to reflect intelligence if it were generated by humans.",
      "\nc. The study of mental faculties through the use of mental models implemented on a computer",
      "\nd. All of the above",
      "\ne. None of the above",
    ],
    correctAnswer: "a",
  },
  {
    question: "Artificial intelligence is___________",
    options: [
      "\na. The embodiment of human intellectual capabilities within a computer.",
      "\nb. A set of computer programs that produce output that would be considered to reflect intelligence if it were generated by humans.",
      "\nc. The study of mental faculties through the use of mental models implemented on a computer",
      "\nd. All of the above",
      "\ne. None of the above",
    ],
    correctAnswer: "d",
  },
  {
    question: "Apple Siri is a good example of ______ AI.",
    options: [
      "\na. Narrow AI",
      "\nb. General AI",
      "\nc. Neural AI",
      "\nd. None of above",
    ],
    correctAnswer: "a",
  },
  {
    question: "IBM Watson supercomputer comes under ____ AI.",
    options: [
      "\na. Narrow AI",
      "\nb. General AI",
      "\nc. Neural AI",
      "\nd. None of above",
    ],
    correctAnswer: "a",
  },
  {
    question:
      "____ AI is a type of intelligence which could perform any intellectual task with efficiency like human.",
    options: [
      "\na. Narrow AI",
      "\nb. General AI",
      "\nc. Super AI",
      "\nd. None of above",
    ],
    correctAnswer: "b",
  },
  {
    question:
      "The idea behind _________AI is to make such a system which could be smarter and think like a human by its own.",
    options: [
      "\na. Narrow AI",
      "\nb. General AI",
      "\nc. Super AI",
      "\nd. None of above",
    ],
    correctAnswer: "b",
  },
  {
    question:
      "The worldwide researchers are now focusing on developing machines with ___ AI.",
    options: [
      "\na. Narrow AI",
      "\nb. General AI",
      "\nc. Super AI",
      "\nd. None of above",
    ],
    correctAnswer: "b",
  },
];



async function displayQuestion(callback) {
    try {
      const resp = await fetch(
        `https://the-trivia-api.com/v2/questions?limit=1&difficulties=easy&categories=${cat}`
      );
      const q = await resp.json();
      const question = q[0].question["text"];
      const answerOptions = [...q[0].incorrectAnswers, q[0].correctAnswer];
  
      // Create HTML for the question and options with radio buttons
      let html = `<div>
        <p style='font-size: 27px;'>${question}</p>`;
  
      // Add radio buttons for each option
      answerOptions.forEach((option, index) => {
        html += `<input type="radio" style='font-size: 27px;' id="option${index}" name="options" value="${option}">
      <label style='font-size: 27px;' for="option${index}">${option}</label><br>`;
      });
  
      html += `<button id="submit">Submit</button></div>`;
  
      // Create a modal or popup to display the HTML content
      let modal = document.createElement("div");
      modal.innerHTML = html;
      modal.style.position = "fixed";
      modal.style.top = "50%";
      modal.style.left = "50%";
      modal.style.transform = "translate(-50%, -50%)";
      modal.style.backgroundColor = "white";
      modal.style.padding = "20px";
      modal.style.border = "2px solid black";
      modal.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
      modal.style.zIndex = "9999";
      document.body.appendChild(modal);
  
      // Add event listener to handle form submission
      modal.addEventListener("click", function (event) {
        if (event.target.id === "submit") {
          let selectedOption = document.querySelector(
            'input[name="options"]:checked'
          );
          if (selectedOption) {
            let isCorrect = selectedOption.value === q[0].correctAnswer;
            callback(isCorrect);
            modal.remove(); // Remove the modal after user submission
          } else {
            alert("Please select an option before submitting.");
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  

// this is working perfectly do not remove this one ...
// function displayQuestion(callback) {
//     // Replace this with your actual question and options
//     // let question = "What is the capital of France?";
//     // let options = ["Paris", "London", "Berlin", "Madrid"];

//     const randomIndex = Math.floor(Math.random() * mcqQuestions.length);
//     const randomQuestion = mcqQuestions[randomIndex];

//     // Extract question and options
//     const question = randomQuestion.question;
//     const options = randomQuestion.options;

//       // Create HTML for the question and options with radio buttons
//       let html = `<div>
//       <p style='font-size: 27px;'>${question}</p>`;

//     // Add radio buttons for each option
//     options.forEach((option, index) => {
//     html += `<input type="radio" style='font-size: 27px;' id="option${index}" name="options" value="${option}">
//     <label style='font-size: 27px;' for="option${index}">${option}</label><br>`;
//     });

//     html += `<button id="submit">Submit</button></div>`;

//     // Create a modal or popup to display the HTML content
//     let modal = document.createElement('div');
//     modal.innerHTML = html;
//     modal.style.position = 'fixed';
//     modal.style.top = '50%';
//     modal.style.left = '50%';
//     modal.style.transform = 'translate(-50%, -50%)';
//     modal.style.backgroundColor = 'white';
//     modal.style.padding = '20px';
//     modal.style.border = '2px solid black';
//     modal.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
//     modal.style.zIndex = '9999';
//     document.body.appendChild(modal);

//     // Add event listener to handle form submission
//     modal.addEventListener('click', function(event) {
//     if (event.target.id === 'submit') {
//     let selectedOption = document.querySelector('input[name="options"]:checked');
//     if (selectedOption) {
//     let isCorrect = selectedOption.value === options[0];
//     callback(isCorrect);
//     modal.remove(); // Remove the modal after user submission
//     } else {
//     alert('Please select an option before submitting.');
//     }
//     }
//     });

//     // console.log(question1)
//     // Show a modal or alert with the question and options
//     // let answer = window.prompt(`${question}\nOptions: ${options.join(", ")}`);

//     // const isCorrect = answer.toLocaleLowerCase() === options[0].toLocaleLowerCase();

//     // Execute the callback with the user's answer
//     // callback(isCorrect);
// }

//Initialise the game with the one who created the room.
function StartTheGame() {
  MYROOM.forEach(function (numb) {
    numb == myid
      ? outputMessage({ Name: "You", id: numb }, 0)
      : outputMessage({ Name: USERNAMES[numb], id: numb }, 0);
  });
  document.getElementById("my-name").innerHTML += USERNAMES[myid];
  console.log(myid); //my-name
  let copyText = `\n\nMy room:\n${window.location.href} \nor join the room via\nMy room code:${room_code}`;
  document.getElementById("copy").innerHTML += copyText;
  if (MYROOM.length === 1) {
    styleButton(1);
    chance = Number(myid);
  } else {
    styleButton(0);
  }
  loadAllPieces();
}

//Load all the images of the pieces
function loadAllPieces() {
  let cnt = 0;
  for (let i = 0; i < colors.length; i++) {
    let img = new Image();
    img.src = "../images/pieces/" + colors[i] + ".png";
    img.onload = () => {
      ++cnt;
      if (cnt >= colors.length) {
        //all images are loaded
        for (let j = 0; j < MYROOM.length; j++) {
          PLAYERS[MYROOM[j]] = new Player(MYROOM[j]);
        }
        if (window.localStorage.getItem("room") == room_code) {
          console.log("19/6/21 yes my localStorage is for this room");
          if (window.localStorage.getItem("started") == "true") {
            console.log("19/6/21 yes i from this room");
            chance = Number(window.localStorage.getItem("chance"));
            let positions = JSON.parse(
              window.localStorage.getItem("positions")
            );
            let win = JSON.parse(window.localStorage.getItem("win"));
            for (let i = 0; i < MYROOM.length; i++) {
              PLAYERS[MYROOM[i]].win = Number(MYROOM[i]);
              for (let j = 0; j < 4; j++) {
                console.log(
                  "19/6/21 yes room==room_code && started==true:i,j:",
                  i,
                  j
                );
                PLAYERS[MYROOM[i]].myPieces[j].x = Number(
                  positions[MYROOM[i]][j].x
                );
                PLAYERS[MYROOM[i]].myPieces[j].y = Number(
                  positions[MYROOM[i]][j].y
                );
                PLAYERS[MYROOM[i]].myPieces[j].pos = Number(
                  positions[MYROOM[i]][j].pos
                );
              }
            }
            allPlayerHandler();
          } else {
            allPlayerHandler();
          }
        } else {
          window.localStorage.clear();
          window.localStorage.setItem("room", room_code);
          allPlayerHandler();
        }
      }
    };
    PIECES.push(img);
  }
}

//rotate chance, required for the game
function chanceRotation(id, num) {
  if (num == 6) {
    console.log("19/6/21 nxt 0 chance(num==6)", id);
    return id;
  } else {
    let c = MYROOM[chance + 1];
    if (c) {
      console.log(
        "19/6/21 nxt 1 chance(MYROOM[chance+1])",
        c,
        "\nMYROOM",
        MYROOM,
        "\nPrevious chance",
        chance
      );
      return c;
    } else {
      console.log(
        "19/6/21 nxt 2 chance(MYROOM[0])",
        MYROOM[0],
        "\nMYROOM",
        MYROOM,
        "\nPrevious chance",
        chance,
        "c:",
        c,
        "chance+1",
        chance + 1,
        "MYROOM[chance+1]",
        MYROOM[chance + 1]
      );
      return MYROOM[0];
    }
  }
}

//draws 4 x 4 = 16 pieces per call
function allPlayerHandler() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < Object.keys(PLAYERS).length; i++) {
    PLAYERS[MYROOM[i]].draw();
  }
  //Store chance, all 16 pos
  //a boolean, for if this function has been called atleast once
  let positions = {};
  let win = {};
  for (let i = 0; i < MYROOM.length; i++) {
    positions[MYROOM[i]] = {};
    win[MYROOM[i]] = PLAYERS[MYROOM[i]].win;
    for (let j = 0; j < 4; j++) {
      positions[MYROOM[i]][j] = {
        x: PLAYERS[MYROOM[i]].myPieces[j].x,
        y: PLAYERS[MYROOM[i]].myPieces[j].y,
        pos: PLAYERS[MYROOM[i]].myPieces[j].pos,
      };
    }
  }
  window.localStorage.setItem("started", "true");
  window.localStorage.setItem("chance", chance.toString());
  window.localStorage.setItem("positions", JSON.stringify(positions));
  window.localStorage.setItem("win", JSON.stringify(win));
}

//Load a new Player instance
function loadNewPiece(id) {
  PLAYERS[id] = new Player(id);
  if (window.localStorage.getItem("room") == room_code) {
    console.log("19/6/21 yes I'm from our room");
    if (window.localStorage.getItem("started")) {
      //chance = Number(window.localStorage.getItem('chance'));
      console.log("19/6/21 yes i have already started the game");
      let positions = JSON.parse(window.localStorage.getItem("positions"));
      let win = JSON.parse(window.localStorage.getItem("win"));
      if (positions[id]) {
        console.log(
          `yes I have some data for user of id: ${id} in my local storage\nIt is ${positions[id]}`
        );
        PLAYERS[id].win = Number(win[id]);
        for (let j = 0; j < 4; j++) {
          console.log(
            `19/6/21 for ${id},${j}\nx:${Number(
              positions[id][j].x
            )}\ny:${Number(positions[id][j].y)}\npos:${Number(
              positions[id][j].pos
            )}`
          );
          PLAYERS[id].myPieces[j].x = Number(positions[id][j].x);
          PLAYERS[id].myPieces[j].y = Number(positions[id][j].y);
          PLAYERS[id].myPieces[j].pos = Number(positions[id][j].pos);
        }
      }
    }
  }
  allPlayerHandler();
}

function iKill(id, pid) {
  let boss = PLAYERS[id].myPieces[pid];
  for (let i = 0; i < MYROOM.length; i++) {
    for (let j = 0; j < 4; j++) {
      if (
        MYROOM[i] != id &&
        boss.x == PLAYERS[MYROOM[i]].myPieces[j].x &&
        boss.y == PLAYERS[MYROOM[i]].myPieces[j].y
      ) {
        if (!inAhomeTile(id, pid)) {
          PLAYERS[MYROOM[i]].myPieces[j].kill();
          return 1;
        }
      }
    }
  }
  return 0;
}

function inAhomeTile(id, pid) {
  for (let i = 0; i < 4; i++) {
    if (
      (PLAYERS[id].myPieces[pid].x == homeTilePos[i][0].x &&
        PLAYERS[id].myPieces[pid].y == homeTilePos[i][0].y) ||
      (PLAYERS[id].myPieces[pid].x == homeTilePos[i][1].x &&
        PLAYERS[id].myPieces[pid].y == homeTilePos[i][1].y)
    ) {
      return true;
    }
  }

  return false;
}

function showModal(id) {
  window.localStorage.clear();
  document.getElementById("myModal-1").style.display = "block";
  document.getElementById(
    "win-win"
  ).innerHTML = `The winner is ${USERNAMES[id]}`;
}

async function copyhandler() {
  var copyText = document.getElementById("copy").innerHTML;
  await navigator.clipboard.writeText(copyText);

  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copied!!";
}

function outFunc() {
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";
}

async function copyhandlerLink() {
  var copyText = window.location.href;
  await navigator.clipboard.writeText(copyText);

  var tooltip = document.getElementById("myTooltipLink");
  tooltip.innerHTML = "Copied!!";
}

function outFuncLink() {
  var tooltip = document.getElementById("myTooltipLink");
  tooltip.innerHTML = "Copy room link to clipboard";
}

function resumeHandler(id) {
  document.getElementById("myModal-2").style.display = "block";
  //who left+timer!
  let theOneWhoLeft = document.getElementById("theOneWhoLeft");
  let seconds = document.getElementById("seconds");
  let i = 10;
  theOneWhoLeft.innerHTML = USERNAMES[id];
  theOneWhoLeft.style.textShadow = `0 0 4px ${colors[id]}`;
  document.getElementById("RESUME").onclick = function () {
    resume(id);
    socket.emit(
      "resume",
      {
        room: room_code,
        id: id,
        click: myid,
      },
      function () {
        outputMessage(
          {
            id: myid,
            msg: `You have resumed the game without ${USERNAMES[id]}`,
          },
          5
        );
        if (chance == id) {
          socket.emit("chance", {
            room: room_code,
            nxt_id: chanceRotation(id, 0),
          });
        }
      }
    );
  };
  document.getElementById("WAIT").onclick = function () {
    wait();
    socket.emit(
      "wait",
      {
        room: room_code,
        click: myid,
      },
      function () {
        outputMessage({ id: myid, msg: `You have decided to wait` }, 5);
      }
    );
  };
  window.timer = setInterval(function () {
    i -= 1;
    seconds.innerHTML = ` in ${i}`;
    if (i == 0) {
      resume(id);
      socket.emit(
        "resume",
        {
          room: room_code,
          id: id,
          click: id,
        },
        function () {
          outputMessage(
            { id: id, msg: `Resumed the game without ${USERNAMES[id]}` },
            5
          );
          if (chance == id) {
            socket.emit("chance", {
              room: room_code,
              nxt_id: chanceRotation(id, 0),
            });
          }
        }
      );
    }
  }, 1000);
}

function resume(id) {
  document.getElementById("myModal-2").style.display = "none";
  clearInterval(timer);
  MYROOM.splice(id, 1);
  delete PLAYERS[id];
  allPlayerHandler();
}

function wait() {
  clearInterval(timer);
  document.getElementById("seconds").innerHTML = "";
  let butt = document.getElementById("WAIT");
  butt.disabled = true;
  butt.style.opacity = 0.6;
  butt.style.cursor = "not-allowed";
}
