window.addEventListener("keypress", event => {
    /* Adds listener that stops the application of the loss, 
    draw and win classes to the computer's and player's options of choice */
    if (event.Key === "Enter") {
        cleanResult();
    }
}