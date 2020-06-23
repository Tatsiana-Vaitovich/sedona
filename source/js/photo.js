"use strict";

// "повешу" обработчик на кнопку likebtn
const photosList = document.querySelector(".photos__list");
const likebtns = Array.from(photosList.querySelectorAll(".likebtn"));

function getCounter() {
  likebtns.forEach((elem, item) => {
    const newSpan = createSpan(elem);
    newSpan.className = "likebtn__counter";
    const nameCounter = "sedonaCounter" + item;
    if (window.localStorage[nameCounter]) {
      newSpan.innerHTML = window.localStorage.getItem(nameCounter);
    } else {
      window.localStorage.setItem(nameCounter, "0");
      newSpan.innerHTML = window.localStorage.getItem(nameCounter);
    }
  });
}

getCounter();

photosList.addEventListener("click", function(clickEvt) {
  const elem = clickEvt.target;
  const likebtn = elem.closest(".likebtn");
  if (likebtn) {
    const index = likebtns.findIndex(item => item === likebtn);
    const newSpan = likebtn.lastElementChild;
    const nameCounter = "sedonaCounter" + index;
    let counter = Number(window.localStorage.getItem(nameCounter));
    counter++;
    newSpan.innerHTML = counter;
    window.localStorage.setItem(nameCounter, counter);
  }
});

function createSpan(where) {
  const newSpan = document.createElement("span");
  where.append(newSpan);
  return newSpan;
}
