const cube = document.querySelector(".advice__btn"),
  adviceNumber = document.querySelector(".advice__number"),
  advicePost = document.querySelector(".advice__post");

let isAnimating = false;

cube.addEventListener("click", function (ev) {
  if (isAnimating) {
    return;
  }

  cube.classList.add("rotator");
  isAnimating = true;

  setTimeout(function () {
    cube.classList.remove("rotator");
  }, 500);

  getAdvice();
});

const adviceBaseUrl = "https://api.adviceslip.com/advice";

async function getAdvice() {
  adviceNumber.classList.remove("opaque");
  try {
    const timestamp = Date.now();
    const adviceUrl = `${adviceBaseUrl}?timestamp=${timestamp}`;
    let data = await fetch(adviceUrl);
    let res = await data.json();
    let { id, advice } = res.slip;
    adviceNumber.classList.add("opaque");
    adviceNumber.innerHTML = "advice #" + id;

    animateText(advice);
  } catch (err) {
    console.log(err);
  }
}

function animateText(text) {
  advicePost.innerHTML = "";
  isAnimating = true;
  const delay = 15;
  let index = 0;
  (function displayNextLetter() {
    if (index < text.length) {
      advicePost.innerHTML += text[index];
      index++;
      setTimeout(displayNextLetter, delay);
    } else {
      isAnimating = false; // Set animation flag to false
    }
  })();
}
