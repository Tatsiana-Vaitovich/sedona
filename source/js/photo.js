"use strict";
// "повешу" обработчик на кнопку likebtn
const photosList = document.querySelector(".photos__list");
const likebtns = photosList.querySelectorAll(".likebtn");

function getCounter() {
  likebtns.forEach(elem => {
    const newSpan = createSpan(elem);
    newSpan.innerHTML = 0;
    newSpan.className = "likebtn__counter";
  });
}

getCounter();

photosList.addEventListener("click", function(evt) {
  console.log(evt);
  const elem = evt.target;
  const likebtn = elem.closest(".likebtn");
  if (likebtn) {
    const newSpan = likebtn.lastElementChild;
    let counter = Number(newSpan.innerHTML);
    counter++;
    newSpan.innerHTML = counter;
  }
});

function createSpan(where) {
  const newSpan = document.createElement("span");
  where.append(newSpan);
  return newSpan;
}

// имеет ли смысл в этом случае для счетчиков использовать замыкание???

// function countLikes() {
//   let numberLikes = 0;
//   return function() {
//     numberLikes++;
//   };
// }

// const counter = countLikes(); // объявила блок видимости

// // потом при каждом клике нужно вызывать ф-ю numberLikes():
// counter();
