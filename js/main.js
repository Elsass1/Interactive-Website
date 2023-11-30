const modalOpen = "[data-open]";
const modalClose = "[data-close]";

// same as writing "[data-open]" inside que query selector
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);
const isVisible = "is-visible";

/*
** openModal has unique values --> about and contact
** elm is the individual element of each item of openModal
** By using a regular function (and not an =>), it gives access to .this
** .this refers to the parent element, which is the open button in the list item (elm)
** dataset is the data attribute (in html) from data-open
** .open is the open from data-open. The first one will have a value of about and the second a value of contact

**getElementById(modalId) which is in html ad="about"
** .classList is grabbing in html the "full-site-modal page-block" class list and we say add "isVisible"
*/

// Full Site Modal "open buttons"
for (const elm of openModal) {
    elm.addEventListener("click", function(){
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isVisible);
    })
}

/*
** Now we are clicking the button i in html. If we use the .this keyword, it is going to apply 
to the i element. But this element is not the element that has the is-visible element. We need to 
climb the three elements up to the parent wrapper div. .parentElement takes us from the icon to the header
The second .parentElement takes us from the header to the div parent element (outer container)

*/

for (const elm of closeModal){
    elm.addEventListener("click", function() {
      this.parentElement.parentElement.classList.remove(isVisible);  
    })
}


