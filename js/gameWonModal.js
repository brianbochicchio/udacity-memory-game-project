/*
 * Adapted from:  W3Schools HowTo Modal Boxes
 * https://www.w3schools.com/howto/howto_css_modals.asp
 */

/*
 *  Get the elements
 */

let modal = document.querySelector('#gameWonModal');
let span = document.getElementsByClassName("close")[0];

/*
    * actions
 */

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', function () {
    modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function (e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});
