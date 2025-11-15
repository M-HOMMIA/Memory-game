var compteur = 0,
    gagner = false;

/*--------------------Start Game---------------------------*/
// Select The Start Game Button
window.document.querySelector(".control-buttons span").onclick = function (){
    // Remove Splash Screen
    document.querySelector(".control-buttons").remove();
    
    // IMPORTANT: D'abord afficher les cartes, PUIS initialiser le jeu
    begin();
    
    // Attendre que l'animation soit terminée avant d'initialiser
    setTimeout(function() {
        newG();
    }, 1000);
    
    gagner = false;
};	

/*--------------------Begin Animation---------------------------*/
function begin(){
    var gameBlock = document.getElementsByClassName('game-block');
    $(gameBlock).show(); // Afficher directement sans animation pour debug
    // $(gameBlock).hide().slideDown("slow"); // Animation désactivée temporairement
    
    // Jouer le son seulement s'il existe
    var startAudio = document.getElementById('start');
    if (startAudio) {
        startAudio.play().catch(e => console.log('Audio play failed:', e));
    }
}

/*--------------------New Game Button---------------------------*/	
window.document.getElementById('NewGame').onclick = function(){
    compteur = 0; 
    
    // Select Blocks Container
    let blocksContainer = document.querySelector(".memory-game-blocks");
    
    // Stop audio if playing
    if (gagner === true){
        var yassamineAudio = document.getElementById('yassamine');
        if (yassamineAudio) {
            yassamineAudio.pause();
            yassamineAudio.currentTime = 0;
        }
    }
    
    gagner = false;
    
    // Create Array From Game Blocks
    let blocks = Array.from(blocksContainer.children);
    blocks.forEach((block) => {
        // Remove CSS classes
        block.classList.remove('has-match');
        block.classList.remove('is-flipped');
    });
    
    // Reset tries counter
    document.querySelector('.tries span').innerHTML = '0';
    
    // Restart game
    begin();
    setTimeout(function() {
        newG();
    }, 500);
}

/*--------------------Main Game Function---------------------------*/
function newG(){
    
    // Effect Duration
    let duration = 1000;
    
    // Select Blocks Container
    let blocksContainer = document.querySelector(".memory-game-blocks");
    
    // Create Array From Game Blocks
    let blocks = Array.from(blocksContainer.children);
    
    console.log('Nombre de cartes:', blocks.length); // Debug
    
    if (blocks.length === 0) {
        console.error('Aucune carte trouvée!');
        return;
    }
    
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
    
    console.log('Jeu initialisé avec', blocks.length, 'cartes'); // Debug
    
    // Flip Block Function
    function flipBlock(selectedBlock) {
        
        // Add Class is-flipped
        selectedBlock.classList.add('is-flipped');
        
        // Collect All Flipped Cards
        let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
        
        // If There are Two Selected Blocks
        if (allFlippedBlocks.length === 2) {
            
            // Stop Clicking Function
            stopClicking();
            
            // Check Matched Block Function
            checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
            
            /*--------------------Check Win Condition---------------------------*/
            if (compteur === 10){
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
                    
                    var yassamineAudio = document.getElementById('yassamine');
                    if (yassamineAudio) {
                        yassamineAudio.play().catch(e => console.log('Audio play failed:', e));
                    }
                }, 500);
            }
            /*--------------------End Win Condition---------------------------*/
            
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
            
            var successAudio = document.getElementById('success');
            if (successAudio) {
                successAudio.play().catch(e => console.log('Audio play failed:', e));
            }
            /*--------------------Increment Counter---------------------------*/
            compteur++;
            console.log('Paires trouvées:', compteur); // Debug
            /*--------------------End Increment---------------------------*/
        } else {
            
            triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
            
            setTimeout(() => {
                
                firstBlock.classList.remove('is-flipped');
                secondBlock.classList.remove('is-flipped');
                
            }, duration);
            
            var failAudio = document.getElementById('fail');
            if (failAudio) {
                failAudio.play().catch(e => console.log('Audio play failed:', e));
            }
            
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
}
