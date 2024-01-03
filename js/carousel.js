const slides = document.querySelectorAll(".review-item");
const buttons = document.querySelectorAll(".slide-ctrl-container button");

// initializing the index
let current = Math.floor(Math.random() * slides.length);
let next = current < slides.length - 1 ? current + 1 : 0;
let prev = current > 0 ? current - 1 : slides.length - 1;

const update = () => {
  // remove the classes from the original indexes
  slides.forEach((slide) => {
    slide.classList.remove("active", "prev", "next");
  });
  // applying the classes to the new indexes
  slides[current].classList.add("active");
  slides[prev].classList.add("prev");
  slides[next].classList.add("next");
};
// number being passed here is the new current index (updating the indexes)
const goToNum = (number) => {
  current = number; // reassigning current
  next = current < slides.length - 1 ? current + 1 : 0; // reassigning next
  prev = current > 0 ? current - 1 : slides.length - 1; // reassigning prev
  update(); // update the slides
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

update();
