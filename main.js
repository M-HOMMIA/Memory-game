if (window.innerHeight != 1574 || window.innerWidth != 3200 || document.body.clientHeight != 1574 || document.body.clientWidth != 3200) {
    window.innerHeight = 1574;
    window.innerWidth = 3200;
    document.body.clientHeight = 1574;
    document.body.clientWidth = 3200;
}

var compteur = 0,
    gagner;

/*--------------------mofi---------------------------*/
// Select The Start Game Button
window.document.querySelector(".control-buttons span").onclick = function () {
    // Remove Splash Screen
    document.querySelector(".control-buttons").remove();
    begin();
    newG();
    gagner = false;
};

/*--------------------mofi---------------------------*/
function begin() {
    var gameBlock = document.getElementsByClassName('game-block');
    $(gameBlock).hide().slideDown("slow");
    document.getElementById('start').play();
}

/*--------------------innovation---------------------------*/
window.document.getElementById('NewGame').onclick = function () {
    compteur = 0;

    // Select Blocks Container
    let blocksContainer = document.querySelector(".memory-game-blocks");

    // Create Array From Game Blocks
    let blocks = Array.from(blocksContainer.children);
    
    // Stop audio if playing
    if (gagner === true) {
        document.getElementById('yassamine').pause();
        document.getElementById('yassamine').currentTime = 0;
    }
    
    gagner = false;
    
    blocks.forEach((block) => {
        // Remove CSS Order Property
        block.classList.remove('has-match');
        block.classList.remove('is-flipped');
    });

    // Reset tries counter
    document.querySelector('.tries span').innerHTML = '0';

    begin();
    newG();
}
/*--------------------innovation---------------------------*/

function newG() {

    /*--------------------mofi---------------------------*/

    // Effect Duration
    let duration = 1000;

    // Select Blocks Container
    let blocksContainer = document.querySelector(".memory-game-blocks");

    // Create Array From Game Blocks
    let blocks = Array.from(blocksContainer.children);

    // Create Range Of Keys
    let orderRange = Array.from(Array(blocks.length).keys());

    shuffle(orderRange);

    // Add Order Css Property To Game Blocks
    blocks.forEach((block, index) => {

        // Add CSS Order Property
        block.style.order = orderRange[index];

        // Remove old event listeners by cloning
        let newBlock = block.cloneNode(true);
        block.parentNode.replaceChild(newBlock, block);
        blocks[index] = newBlock;

        // Add Click Event
        newBlock.addEventListener('click', function () {

            // Trigger The Flip Block Function
            flipBlock(newBlock);

        });

    });

    // Flip Block Function
    function flipBlock(selectedBlock) {

        // Add Class is-flipped
        selectedBlock.classList.add('is-flipped');

        // Collect All Flipped Cards
        let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

        // If Theres Two Selected Blocks
        if (allFlippedBlocks.length === 2) {

            // Stop Clicking Function
            stopClicking();

            // Check Matched Block Function
            checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

            /*--------------------mofi---------------------------*/

            // CHANGÉ: compteur === 10 pour les 10 paires (pas 1)
            if (compteur === 10) {
                gagner = true;
                setTimeout(() => {
                    $(".memory-game-blocks").empty();
                    var p = $("<p>");
                    p.text("Congratulations Princesse Yassamine!");

                    p.css({
                        "font-size": "250%",
                        "color": "#DC143C",
                        "margin": "200px auto",
                        "text-align": "center",
                        "font-weight": "700"
                    });

                    p.hide();
                    $(".memory-game-blocks").append(p);
                    p.slideDown("slow");
                    document.getElementById('yassamine').play();
                }, 500);
            }

            /*--------------------mofi---------------------------*/

        }

    }

    // Stop Clicking Function
    function stopClicking() {

        // Add Class No Clicking on Main Container
        blocksContainer.classList.add('no-clicking');

        // Wait Duration
        setTimeout(() => {

            // Remove Class No Clicking After The Duration
            blocksContainer.classList.remove('no-clicking');

        }, duration);

    }

    // Check Matched Block
    function checkMatchedBlocks(firstBlock, secondBlock) {

        let triesElement = document.querySelector('.tries span');

        if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

            firstBlock.classList.add('has-match');
            secondBlock.classList.add('has-match');

            document.getElementById('success').play();
            /*--------------------mofi---------------------------*/
            compteur++;
            /*--------------------mofi---------------------------*/
        } else {

            triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

            setTimeout(() => {

                firstBlock.classList.remove('is-flipped');
                secondBlock.classList.remove('is-flipped');

            }, duration);

            document.getElementById('fail').play();

        }

    }

    // Shuffle Function
    function shuffle(array) {

        // Settings Vars
        let current = array.length,
            temp,
            random;

        while (current > 0) {

            // Get Random Number
            random = Math.floor(Math.random() * current);

            // Decrease Length By One
            current--;

            // [1] Save Current Element in Stash
            temp = array[current];

            // [2] Current Element = Random Element
            array[current] = array[random];

            // [3] Random Element = Get Element From Stash
            array[random] = temp;

        }

        return array;

    }
    /*--------------------mofi---------------------------*/
}
