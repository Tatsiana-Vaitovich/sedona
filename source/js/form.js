"use strict";

const form = document.querySelector(".comment__form");

form.addEventListener("submit", function(evt) {
  console.log("work")
  const elements = form.elements;
  for (let i =0; i < elements.length; i++) {
    if(!elements[i].validity.valid) {
      elements[i].style.backgroundColor = "red";
    }
  }
})
