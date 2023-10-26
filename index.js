const bg = document.querySelector(".bg-img");

window.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX,
    mouseY = e.clientY;
  const decX = mouseX / window.innerWidth,
    decY = mouseY / window.innerHeight;
  const maxX = bg.offsetWidth - window.innerWidth,
    maxY = bg.offsetHeight - window.innerHeight;

  const pX = decX * maxX,
    pY = decY * maxY;

  bg.style.translate = `${-pX}px ${-pY}px`;
});

const field = document.querySelector(".field");
const icon = document.querySelector(".field box-icon");
const progress = document.querySelector(".progress");

const left = ~~(field.offsetLeft + icon.offsetWidth / 2);

progress.style.left = left + "px";

const formFields = document.querySelectorAll("form .field");
let inputs = document.querySelectorAll("form .field input");
const progressBar = document.querySelector(".progress .progress-bar");
const btn = document.querySelector("button");

inputs.forEach((curInput, curIndex) => {
  let prevInput = inputs[curIndex - 1],
    curFormField = formFields[curIndex],
    nextInput = inputs[curIndex + 1],
    nextFormField = formFields[curIndex + 1];

  curInput.addEventListener("input", () => {
    if (curIndex > 0) {
      if (curInput.checkValidity() && prevInput.checkValidity()) {
        curFormField.classList.add("valid");
        updateProgress(curIndex + 1);

        if (nextInput?.checkValidity()) {
          nextFormField.classList.add("valid");
          updateProgress(curIndex + 2);
        }
      } else if (prevInput.checkValidity()) {
        curFormField.classList.remove("valid");
        updateProgress(curIndex);
      }
    } else {
      if (curInput.checkValidity()) {
        curFormField.classList.add("valid");
        updateProgress(curIndex + 1);
      } else {
        curFormField.classList.remove("valid");
        updateProgress(0);
      }
    }

    inputs = Array.from(inputs);

    let allValid = inputs.every((input) => {
      return input.checkValidity();
    });

    if (allValid) {
      updateProgress();
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
});

function updateProgress(index = 5) {
  progressBar.style.height = 20 * index + "%";
}
