"use strict";

// "повешу" обработчик на кнопку likebtn
const photosList = document.querySelector(".photos__list");
const likebtns = photosList.querySelectorAll(".likebtn");

likebtns.forEach(elem => {
  const newSpan = createSpan(elem);
  newSpan.innerHTML = 0;
  newSpan.className = "likebtn__counter";
})

photosList.addEventListener("click", function(evt) {
  console.log(evt);
  const elem = evt.target;
  const likebtn = elem.closest(".likebtn");
  if (likebtn) {
    let newSpan = likebtn.lastElementChild;
    let counter = +(newSpan.innerHTML);
    counter++
    newSpan.innerHTML = counter;
  }
})

function showElem(elem) {
  elem.removeAttribute("visually-hidden")
}

function createSpan(where) {
  const newSpan = document.createElement("span");
  where.append(newSpan);
  return newSpan;
}