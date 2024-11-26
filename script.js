let isWindowOpen = false;
let currentStep = 0; // Tracks the current step in the sequence
const message = document.getElementById('message');

function openWindow() {
    const windowElement = document.querySelector('.window');

    // Open the window
    windowElement.classList.add('open');   
    isWindowOpen = true;
    currentStep++;
    message.textContent = 'Please take your Order.';
    
}

function closeWindow() {
    const windowElement = document.querySelector('.window');

    // Close the window
    windowElement.classList.remove('open');
    isWindowOpen = false;
    setTimeout(() => { 
        checkAndMoveShelves(); 
    }, 3000); // Delay of 3 seconds

    if (currentStep == 2 && isFourthLevelEmpty()) {
        currentStep = 0; // Reset the step for the next sequence
        message.textContent = 'Thanks for your order.';
        setTimeout(() => { 
            message.textContent = 'Hello, please open the window.'; 
        }, 4000);
    }
    
    else {
        message.textContent = 'An error occurred. Please try again later or call for assistance.';
    }
    
}

document.getElementById("window").addEventListener("click", function () {
    if (!isWindowOpen && !isFourthLevelEmpty() && currentStep == 0) {
openWindow();
    }
    else {
        closeWindow(); // Call the second function

    }
});

function isBoxAtFourthLevel(box) {
  // Get the parent element of the box (which is the shelf)
  const shelf = box.parentElement;

  // Get the ID of the shelf
  const shelfId = shelf.id;

  // Check if the shelf ID is "level-4"
  return shelfId === "level-4";
}

function removeBox(box) {
    if (!isWindowOpen) return; 
    if (!isBoxAtFourthLevel(box)) return;
    box.classList.add('hidden'); // Animate the box moving out
    setTimeout(() => {
        box.parentElement.removeChild(box); // Remove the box from DOM
        checkAndMoveShelves(); // Check if shelves need to move down
    }, 500);
    currentStep ++;
    message.textContent = 'Please close the window.';
}

function isFourthLevelEmpty() {
  const fourthLevel = document.getElementById('level-4');
  return fourthLevel.children.length === 0;
}

function checkAndMoveShelves() {
    // Ensure boxes move only if the window is closed and 4th level is empty
    if (currentStep !== 0) return;
    if (!isWindowOpen && isFourthLevelEmpty()) {
        const shelves = document.querySelectorAll('.shelf');
        for (let i = shelves.length - 1; i > 0; i--) {
            const currentShelf = shelves[i];
            const aboveShelf = shelves[i - 1];
            if (!currentShelf.querySelector('.box') && aboveShelf.querySelector('.box')) {
                const box = aboveShelf.querySelector('.box');
                aboveShelf.removeChild(box);
                currentShelf.appendChild(box);
            }
        }
    }
}


function changeBackgroundIfEmpty() {
    const level4 = document.getElementById("level-4");

    // Check if the div has no child elements
    if (level4 && level4.children.length === 0) {
        level4.style.background = `
            linear-gradient(
                to top, 
                transparent 10%, 
                green 10%, 
                green 20%, 
                transparent 20%
            )
        `;
    } else {
        level4.style.background = `
            linear-gradient(
                to top, 
                transparent 10%, 
                red 10%, 
                red 20%, 
                transparent 20%
            )
        `;
    }
}

function addCircle() {
    const body = document.querySelector('body');
    const level4 = document.getElementById("level-4");
    const circle = document.getElementById("circle");
    if (level4 && circle && isWindowOpen && !level4.contains(circle)) {
        level4.appendChild(circle)
    }

    else {
        body.appendChild(circle)
    }
        
}

// Call the function to check and move shelves every second
setInterval(changeBackgroundIfEmpty, 100);
