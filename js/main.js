//will save the theme selected by the user on the local storage
const theme = "theme";
// the data theme attribute that is added to the html tag dynamically
const dataTheme = "data-theme";
// theme-tab is a class present in html. To select it, we need to use the proper CSS attribute. Here a dot since it's a class
const themeTab = ".theme-tab";
const switcherBtn = ".switcher-btn";
const dark = "dark";
const light = "light";
const open = "open";
const active = "active";

const modalOpen = "[data-open]";
const modalClose = "[data-close]";
const isVisible = "is-visible";

// targeting the html element of the document page (document object)
const root = document.documentElement;

/* Theme */
const toggleTheme = document.querySelector(themeTab);
// will go over the document, find everything with the class ".switcher-btn" and saves it in an array that can be iterated
const switcher = document.querySelectorAll(switcherBtn);
// access the local storage
const currentTheme = localStorage.getItem(theme);

/* Modal */
// same as writing "[data-open]" inside que query selector
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

/*
 ** grabbing all the selectors which are the ".switcher-btn" and look for the class active
 ** if !== null, it will remove the class active
 ** else, it will add the class active
 */

const setActive = (elm, selector) => {
  if (document.querySelector(`${selector}.${active}`) !== null) {
    document.querySelector(`${selector}.${active}`).classList.remove(active);
  } else {
    elm.classList.add(active);
  }
};

const setTheme = (val) => {
  // passing the value of the toggle from for (const elm of switcher). Either light or dark
  if (val === dark) {
    // setting up the theme
    // setting a custom attribute to the root element of the HTML document (<html>)
    root.setAttribute(dataTheme, dark);
    // saving it to the local storage
    localStorage.setItem(theme, dark);
  } else {
    root.setAttribute(dataTheme, light);
    localStorage.setItem(theme, light);
  }
};

// sets the open class to the light/dark panel
toggleTheme.addEventListener("click", function () {
  // from the "theme-tab, we need to go up two parent elements to reach "theme-panel" where an .open class needs to be added
  const tab = this.parentElement.parentElement;
  if (!tab.className.includes(open)) {
    tab.classList.add(open);
  } else {
    tab.classList.remove(open);
  }
});

for (const elm of switcher) {
  elm.addEventListener("click", function () {
    const toggle = this.dataset.toggle;
    // set active state
    setActive(elm, switcherBtn);
    setTheme(toggle);
  });
}

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
  elm.addEventListener("click", function () {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}

/*
** Now we are clicking the button i in html. If we use the .this keyword, it is going to apply 
to the i element. But this element is not the element that has the is-visible element. We need to 
climb the three elements up to the parent wrapper div. .parentElement takes us from the icon to the header
The second .parentElement takes us from the header to the div parent element (outer container)

*/

for (const elm of closeModal) {
  elm.addEventListener("click", function () {
    this.parentElement.parentElement.classList.remove(isVisible);
  });
}
