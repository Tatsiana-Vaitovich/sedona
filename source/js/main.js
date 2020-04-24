"use strict";
// включу в работу кнопки открытия и закрытия меню в мобильной версии
const mainNavigation = document.querySelector(".main-header__navigation");
const mainMenu = document.querySelector(".main-menu");
const btnMenuOpen = mainNavigation.querySelector(".main-header__btn--open");
const btnMenuClose = mainNavigation.querySelector(".main-header__btn--close")

mainNavigation.addEventListener("click", function(evt) {
  const elem = evt.target;
  if (elem.closest(".main-header__btn--open")) {
    showElem(btnMenuClose);
    showElem(mainMenu);
    btnMenuOpen.style.visibility = "hidden";
  } 
  else if (elem.closest(".main-header__btn--close")) {
    hiddenElem(btnMenuClose);
    hiddenElem(mainMenu);
    btnMenuOpen.style.visibility = "visible";
  }
});

function hiddenElem(elem) {
  elem.classList.add("visually-hidden");
}

function showElem(elem) {
  elem.classList.remove("visually-hidden");
}