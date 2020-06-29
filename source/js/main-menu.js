"use strict";

// код для работы с меню. раскрываем-закрываем меню в мобильной версии

(function() {
  // включу в работу кнопки открытия и закрытия меню в мобильной версии
  const mainNavigation = document.querySelector(".main-header__navigation");
  const mainMenu = document.querySelector(".main-menu");
  const btnMenuOpen = mainNavigation.querySelector(".main-header__btn--open");
  const btnMenuClose = mainNavigation.querySelector(".main-header__btn--close");

  document.addEventListener("keydown", onBtnEscPress);

  // исключу вариант сценария, когда меню будет закрыто
  // при увеличении ширины окна от mobile до tablet:
  window.addEventListener("resize", () => {
    const screenWidth = document.documentElement.scrollWidth;
    if (screenWidth >= window.util.SCREEN_TABLET) {
      showElem(mainMenu);
      changeDisplay(btnMenuOpen, "none");
      changeDisplay(btnMenuClose, "none");
    } else if (screenWidth <= window.util.SCREEN_TABLET) {
      changeDisplay(btnMenuClose, "block");
    }
  });

  mainNavigation.addEventListener("click", function(clickEvt) {
    const elem = clickEvt.target;
    if (elem.closest(".main-header__btn--open")) {
      openMenu();

      document.addEventListener("keydown", onBtnEscPress);
    } else if (elem.closest(".main-header__btn--close")) {
      closeMenu();

      document.removeEventListener("keydown", onBtnEscPress);
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

  function openMenu() {
    // showElem(btnMenuClose);
    changeDisplay(btnMenuClose, "block");
    showElem(mainMenu);
    // btnMenuOpen.style.visibility = "hidden";
    changeDisplay(btnMenuOpen, "none");
    btnMenuClose.focus();
  }

  function closeMenu() {
    // hiddenElem(btnMenuClose);
    changeDisplay(btnMenuClose, "none");
    hiddenElem(mainMenu);
    // btnMenuOpen.style.visibility = "visible";
    changeDisplay(btnMenuOpen, "block");
    btnMenuOpen.focus();
  }

  function onBtnEscPress(keydownEvt) {
    if (keydownEvt.keyCode === window.util.KEY_CODE_ESC) {
      closeMenu();

      document.removeEventListener("keydown", onBtnEscPress);
    }
  }

})();
