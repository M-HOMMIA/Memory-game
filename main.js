if  (window.innerHeight != 1574 || window.innerWidth != 3200 ||document.body.clientHeight != 1574 || document.body.clientWidth !=3200  )
{
	window.innerHeight = 1574;
	window.innerWidth = 3200;
	document.body.clientHeight = 1574;
	document.body.clientWidth =3200;
}
var compteur = 0,
	 gagner;
/*--------------------mofi---------------------------*/
// Select The Start Game Button
window.document.querySelector(".control-buttons span").onclick = function (){
	  // Remove Splash Screen
  document.querySelector(".control-buttons").remove();
	begin();
	 newG();
	gagner = false;
};	

	/*--------------------mofi---------------------------*/
function begin(){
	var  gameBlock = document.getElementsByClassName('game-block');
        $(gameBlock).hide().slideDown("slow");
	document.getElementById('start').play();
};

/*--------------------innovation---------------------------*/	
	window.document.getElementById('NewGame').onclick =function(){
 compteur = 0; 

			 //Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);
blocks.forEach((block) => {

  // remove CSS Order Property
  block.classList.remove('has-match');
  block.classList.remove('is-flipped');
	console.log('blocks avant empty= '+block);
	});
		if (gagner = true){
			gagner = false;
			document.getElementById('yassamine').pause();
			$(".memory-game-blocks").empty();
			console.log('blocks aprés empty= '+blocks);
			blocks.forEach((block) => {
				console.log('before bolck dans forEach= '+block);
				  block.classList.add('game-block');
//                  block.classList.add('is-flipped');
				console.log('after bolck dans forEach= '+block);	
			});
			/*--------------------mofi---------------------------*/
	
//           $(".memory-game-blocks").text();

         /*--------------------mofi---------------------------*/	 
		}
	 begin();
   newG();
	}
/*--------------------innovation---------------------------*/
		
		
	
		
	

 

function newG(){
	
	 /*--------------------mofi---------------------------*/

// Effect Duration
let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

// Create Range Of Keys
// let orderRange = [...Array(blocks.length).keys()];

let orderRange = Array.from(Array(blocks.length).keys());

// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {

  // Add CSS Order Property
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener('click', function () {

    // Trigger The Flip Block Function
    flipBlock(block);

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

    // console.log('Two Flipped Blocks Selected');

    // Stop Clicking Function
    stopClicking();

    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
	  
	  /*--------------------mofi---------------------------*/
	 
 if (compteur === 1){
	 gagner = true;
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
    random = Math.floor(Math.random() * current);//8     8

    // Decrease Length By One
    current--;               //19                       18

    // [1] Save Current Element in Stash
    temp = array[current]; //temp=array[19]          temp=array[18] 

    // [2] Current Element = Random Element
    array[current] = array[random];//array[19]=array[8]    array[18]=array[8]

    // [3] Random Element = Get Element From Stash
    array[random] = temp;//array[8]=temp=array[19]           array[8]=temp=array[18]

  }

  return array;

}
/*--------------------mofi---------------------------*/
};
/*--------------------mofi---------------------------*/
// Current Array [9, 2, 10, 4, 5, 6, 7, 3, 1, 8]
/*
  [1] Save Current Element in Stash
  [2] Current Element = Random Element
  [3] Random Element = Get Element From Stash
*/
