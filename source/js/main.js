"use strict";

// включу в работу кнопки открытия и закрытия меню в мобильной версии
const mainNavigation = document.querySelector(".main-header__navigation");
const mainMenu = document.querySelector(".main-menu");
const btnMenuOpen = mainNavigation.querySelector(".main-header__btn--open");
const btnMenuClose = mainNavigation.querySelector(".main-header__btn--close");

// исключу вариант сценария, когда меню будет закрыто
// при увеличении ширины окна от mobile до tablet:
window.addEventListener("resize", () => {
  const screenWidth = document.documentElement.scrollWidth;
  const screenTablet = 768;
  if (screenWidth >= screenTablet) {
    showElem(mainMenu);
    changeDisplay(btnMenuOpen, "none");
    changeDisplay(btnMenuClose, "none");
  } else if (screenWidth <= screenTablet) {
    changeDisplay(btnMenuClose, "block");
  }
});

mainNavigation.addEventListener("click", function(evt) {
  const elem = evt.target;
  if (elem.closest(".main-header__btn--open")) {
    // showElem(btnMenuClose);
    changeDisplay(btnMenuClose, "block");
    showElem(mainMenu);
    // btnMenuOpen.style.visibility = "hidden";
    changeDisplay(btnMenuOpen, "none");
  } else if (elem.closest(".main-header__btn--close")) {
    // hiddenElem(btnMenuClose);
    changeDisplay(btnMenuClose, "none");
    hiddenElem(mainMenu);
    // btnMenuOpen.style.visibility = "visible";
    changeDisplay(btnMenuOpen, "block");
  }
});

function hiddenElem(elem) {
  elem.classList.add("visually-hidden");
}

function showElem(elem) {
  elem.classList.remove("visually-hidden");
}

function changeDisplay(elem, param) {
  elem.style.display = param;
}
