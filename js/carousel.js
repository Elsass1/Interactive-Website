const slides = document.querySelectorAll(".review-item");
const buttons = document.querySelectorAll(".slide-ctrl-container button");

// initializing the current index
let current = Math.floor(Math.random() * slides.length);
let next = current < slides.length - 1 ? current + 1 : 0;
let prev = current > 0 ? current - 1 : slides.length - 1;

/* create eventListener for prev/next */
// gotToNext()
// gotToPrev()
// updateIndexes(param)
// updateCSS()

// -- decide how to call prev/next
// -- update variables
// --- [current] = newIndex
// --- [next] current + 1 : 0
// --- [prev] current - 1 : length - 1
// update the css

// number being passed here is the new current index
const goToNum = (number) => {
  current = number; // reassigning current
  next = current < slides.length - 1 ? current + 1 : 0; // reassigning next
  prev = current > 0 ? current - 1 : slides.length - 1; // reassigning prev
};

// decide what number is going to be passed in inside the function
const goToNext = () =>
  current < slides.length - 1 ? goToNum(current + 1) : goToNum(0);
const goToPrev = () =>
  current > 0 ? goToNum(current - 1) : goToNum(slides.length - 1);

for (let i = 0; i < buttons.length; i += 1) {
  buttons[i].addEventListener("click", () =>
    i === 0 ? goToPrev() : goToNext()
  );
}
