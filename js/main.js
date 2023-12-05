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

const dataFilter = "[data-filter]";
const portfolioData = "[data-item]";

// targeting the html element of the document page (document object)
const root = document.documentElement;

/* Theme */
const toggleTheme = document.querySelector(themeTab);
// will go over the document, find everything with the class ".switcher-btn" and saves it in an array that can be iterated
const switcher = document.querySelectorAll(switcherBtn);
// access the local storage
const currentTheme = localStorage.getItem(theme);

/* Portfolio */
// creating a node list of every data-filter attributes in the html
const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);
const searchBox = document.querySelector("#search");

/* Modal */
// same as writing "[data-open]" inside que query selector
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

/*
 ** elm --> each individual elements in the node list
 ** grabbing all the selectors which are the ".switcher-btn" and look for the class active
 ** if !== null, it will remove the class active
 ** else, it will add the class active
 */

const setActive = (elm, selector) => {
  if (document.querySelector(`${selector}.${active}`) !== null) {
    //  the active class is first removed from any other element that might have it (within the scope of the given selector)
    document.querySelector(`${selector}.${active}`).classList.remove(active);
  }
  // is added to the specific element (elm) that needs to become active
  elm.classList.add(active);
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

/*
 ** checking on page load for currentTheme to see if there is anything in local storage
 ** if there is, we are setting the current theme
 ** remove the active class of both buttons
 */
if (currentTheme) {
  root.setAttribute(dataTheme, currentTheme);
  switcher.forEach((btn) => {
    btn.classList.remove(active);
  });
}

/*
 ** check for the current theme to see if it's the dark theme or not
 ** if it is, set dark button to active
 ** else set the light button to active
 */
if (currentTheme === dark) {
  switcher[1].classList.add(active);
} else {
  switcher[0].classList.add(active);
}

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
// e = event object
searchBox.addEventListener("keyup", (e) => {
  //capturing the value
  const searchInput = e.target.value.toLowerCase().trim();

  portfolioItems.forEach((card) => {
    // item could be web or ui for example
    if (card.dataset.item.includes(searchInput)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

for (const link of filterLink) {
  link.addEventListener("click", function () {
    setActive(link, ".filter-link");
    const filter = this.dataset.filter;
    portfolioItems.forEach((card) => {
      if (filter === "all") {
        card.style.display = "block";
      } else if (card.dataset.item === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
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

// Modal/Full Site Modal "open buttons"
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
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}

// Modal
document.addEventListener("click", (e) => {
  console.log(e.target, document.querySelector(".modal.is-visible"));
  if (e.target === document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

document.addEventListener("keyup", (e) => {
  console.log(e.key);
  if (e.key === "Escape") {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

/* const portfolioCards = [
  {
    item: "web",
    imgSource: "./assets/images/portfolio-1.jpg",
    category: "Web Development",
    title: "Food Website",
  },
  {
    item: "web",
    imgSource: "./assets/images/portfolio-2.jpg",
    category: "Web Development",
    title: "Skate Website",
  },
  {
    item: "web",
    imgSource: "./assets/images/portfolio-3.jpg",
    category: "Web Development",
    title: "Food Website",
  },
  {
    item: "ui",
    imgSource: "./assets/images/portfolio-4.jpg",
    category: "UI Design",
    title: "Cool Design",
  },
  {
    item: "app",
    imgSource: "./assets/images/portfolio-5.jpg",
    category: "App Development",
    title: "Game App",
  },
  {
    item: "app",
    imgSource: "./assets/images/portfolio-6.jpg",
    category: "App Development",
    title: "Gambling App",
  },
  {
    item: "app",
    imgSource: "./assets/images/portfolio-7.jpg",
    category: "App Development",
    title: "Money App",
  },
  {
    item: "ui",
    imgSource: "./assets/images/portfolio-8.jpg",
    category: "UI Design",
    title: "Fantastic Design",
  },
];

const portfolioCardContainer = document.getElementById(
  "portfolio-card-container"
);

portfolioCards.forEach((portfolioCard) => {
  const card = document.createElement("div");
  card.className = "portfolio-card";
  card.setAttribute("data-item", portfolioCard.item);

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const image = document.createElement("img");
  image.src = portfolioCard.imgSource;
  image.alt = "portfolio icon";

  const link = document.createElement("a");
  link.href = "#";
  link.className = "card-popup-box";

  const categoryDiv = document.createElement("div");
  categoryDiv.textContent = portfolioCard.category;

  const h3Title = document.createElement("h3");
  h3Title.textContent = portfolioCard.title;

  link.appendChild(categoryDiv);
  link.appendChild(h3Title);

  cardBody.appendChild(image);
  cardBody.appendChild(link);

  card.appendChild(cardBody);
  portfolioCardContainer.appendChild(card);
});
 */
