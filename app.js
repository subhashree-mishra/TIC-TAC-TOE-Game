document.addEventListener('DOMContentLoaded', () => {
    let boxes = document.querySelectorAll(".box");
    let resetBtn = document.querySelector("#reset-btn");
    let newGameBtn = document.querySelector("#new-btn");
    let msgContainer = document.querySelector(".msg-container");
    let msg = document.querySelector("#msg");
    let gameContainer = document.querySelector(".Game");

    let turnO = true;
    let count = 0;
    let gameActive = true;

    const winPatterns = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];

    const resetGame = () => {
        console.log("Reset game function called");
        turnO = true;
        count = 0;
        gameActive = true;
        enableBoxes();
        msgContainer.classList.add("hide");
        gameContainer.classList.remove("hidden");
        resetBtn.style.display = "none";
        newGameBtn.style.display = "none";
    };

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (box.innerText !== "" || !gameActive) return;

            count++;

            if (turnO) {
                box.innerText = "O";
                box.classList.add("o");
                turnO = false;
            } else {
                box.innerText = "X";
                box.classList.add("x");
                turnO = true;
            }


            box.disabled = true;
            resetBtn.style.display = "inline-block";
            console.log("Reset button displayed");
            checkWinner();
            
            // Show the reset button when any box is clicked
           
        });
    });

    const disableBoxes = () => {
        boxes.forEach(box => box.disabled = true);
        
    };

    const enableBoxes = () => {
        boxes.forEach(box => {
            box.disabled = false;
            box.innerText = "";
            box.classList.remove("x", "o");
        });
    };

    const showWinner = (winner) => {
        if (winner === null) {
            msg.innerText = `It's a draw!`;
        } else {
            msg.innerText = `Congratulations, ${winner} wins!`;
        }
        msgContainer.classList.remove("hide");
        gameContainer.classList.add("hidden");
       
        newGameBtn.style.display = "inline-block";
        disableBoxes();
        resetBtn.style.display = "none";
        console.log("rerset btn is removed");
    };

    const checkWinner = () => {
        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;
            let boxA = boxes[a].innerText;
            let boxB = boxes[b].innerText;
            let boxC = boxes[c].innerText;

            if (boxA && boxA === boxB && boxA === boxC) {
                gameActive = false;
                showWinner(boxA);

                return;
            }
        }

        if (count === 9 && gameActive) {
            showWinner(null);
        }
        
    };

    newGameBtn.addEventListener("click", () => {
        msgContainer.classList.add("hide");
        gameContainer.classList.remove("hidden");
        resetBtn.style.display = "none";
        newGameBtn.style.display = "none";
        resetGame();
        // Add the pulse effect on click
        newGameBtn.classList.add("pulse");
        setTimeout(() => {
            newGameBtn.classList.remove("pulse");
        }, 500); // Remove class after 0.5 seconds (adjust timing as needed)
    });

   resetBtn.addEventListener("click", resetGame);

    // Initially hide reset button
    resetBtn.style.display = "none";
    newGameBtn.style.display = "none";
    
    console.log("Initial styles set: reset button hidden, new game button hidden");
});
