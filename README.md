# Memory Game Project

## Table of Contents

* [Summary](#summary)
* [Requirments](#requirements)

## Credits 
This project is based on the starter project provided to Udacity Front-End Developer Nanodegree Students on [GitHub](https://github.com/udacity/fend-project-memory-game)

## Summary
This is a 16-card memory matching game for block 3,  JavaScript and the DOM. 

## Requirements
Based on the provided rubric the project meets the following mandatory and optional requirements

* Game board elements:
    * Game Title 
    * Deck of 16 Cards
    * Star Rating
    * Moves Counter
    * Game Timer
    * Game Reset Button
    
* Other elements
    * Modal "Win" Pop-up with the following elements
        * Congratulations Message
        * Play again query
        * Game Time
        * Star Rating
         
* Functionality
    * Must randomly shuffle cards on game start and reset
    * Must reset the board, star rating, move count and timer when reset is pressed
    * Must show "Win" modal when all cards are matched (Not Implemented)
    * Must countdown start rating from 3 to 1
    * Must show and increment move counter
    * Must show game time in MM:SS 
        * Starts with first card being "flipped"
        * Stops when player wins or game is reset
        
* Code Quality
    * Code is consistent, logical and follow style guides
    * Concerns are separated
        * Function calls take or call an appropriate supporting function 
            * flipCard shouldn't change the clock state
            * flipCard can call the function to check for a match when a card is flipped







