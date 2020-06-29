"use strict";

// "повешу" обработчик на кнопку likebtn
const photosList = document.querySelector(".photos__list");
const likebtns = Array.from(photosList.querySelectorAll(".likebtn"));
let objLikeBtnCounters;

function getCounter() {
  if (localStorage.likeBtnCounters) {
    objLikeBtnCounters = getObjFromLocalStorage("likeBtnCounters");
    console.log(objLikeBtnCounters);
  } else {
    objLikeBtnCounters = {};
    const JSONLikeBtnCounters = JSON.stringify(objLikeBtnCounters);
    window.localStorage.setItem("likeBtnCounters", JSONLikeBtnCounters);
    console.log(objLikeBtnCounters + "new");
  }
  likebtns.forEach((elem, item) => {
    const newSpan = createSpan(elem);
    newSpan.className = "likebtn__counter";
    const nameCounter = "sedonaCounter" + item;
    if (objLikeBtnCounters[nameCounter]) {
      getLikeBtnCounterInnerHTML(newSpan, objLikeBtnCounters[nameCounter]);
    } else {
      objLikeBtnCounters[nameCounter] = "0";
      sendObjToLocalStorage(objLikeBtnCounters);
      getLikeBtnCounterInnerHTML(newSpan, objLikeBtnCounters[nameCounter]);
    }
  });
}

function getObjFromLocalStorage(name) {
  const JSONname = localStorage.getItem(name);
  const objname = JSON.parse(JSONname);
  return objname;
}

function sendObjToLocalStorage(name) {
  const JSONname = JSON.stringify(name);
  window.localStorage.setItem("likeBtnCounters", JSONname);
}

function getLikeBtnCounterInnerHTML(elem, item) {
  const likeBtnCounterInnerHTML = item;
  elem.innerHTML = likeBtnCounterInnerHTML;
}

function createSpan(where) {
  const newSpan = document.createElement("span");
  where.append(newSpan);
  return newSpan;
}

getCounter();

photosList.addEventListener("click", function(clickEvt) {
  const elem = clickEvt.target;
  const likebtn = elem.closest(".likebtn");
  if (likebtn) {
    const index = likebtns.findIndex(item => item === likebtn);
    const newSpan = likebtn.lastElementChild;
    const nameCounter = "sedonaCounter" + index;
    let counter = objLikeBtnCounters[nameCounter];
    counter++;
    newSpan.innerHTML = counter;
    objLikeBtnCounters[nameCounter] = counter;
    sendObjToLocalStorage(objLikeBtnCounters);
  }
});
