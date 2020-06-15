"use strict";

(function() {
  const form = document.querySelector(".comment__form");
  const arrFormElements = Array.from(form.elements);
  const modalInvalid = document.querySelector(".modal--invalid");
  const modalSucces = document.querySelector(".modal--success");

  // подкорректируем сообщение об ошибке
  form.addEventListener("click", function(evt) {
    const elem = evt.target;
    if (elem.closest(".comment__btn")) {
      arrFormElements.forEach(function(elem) {
        if (!elem.validity.valid) {
          addInvalidStyle(elem);
          showModalInvalid();
          elem.addEventListener("blur", onElemFormBlur);
        }
      });
    }
  });

  // event "submit" срабатывает, когда форма отправляется
  form.addEventListener("submit", showModalSucces);

  function showModalSucces() {
    modalSucces.classList.add("modal--show");
    document.addEventListener("keydown", onBtnEscPress);
  }

  function showModalInvalid() {
    modalInvalid.classList.add("modal--show");
    document.addEventListener("keydown", onBtnEscPress);
  }

  function addInvalidStyle(elem) {
    elem.style.border = "1px solid red";
  }

  function removeInvalidStyle(elem) {
    elem.style.border = "";
  }

  function onElemFormBlur() {
    if (this.validity.valid) {
      removeInvalidStyle(this);
    }
  }

  document.addEventListener("click", function(evt) {
    const elem = evt.target;
    if (elem.closest(".postamble__btn")) {
      const modalOpen = elem.closest(".modal");
      closePostamble(modalOpen);
    }
  });

  function closePostamble(elem) {
    elem.classList.remove("modal--show");

    document.removeEventListener("keydown", onBtnEscPress);
  }

  function onBtnEscPress(evt) {
    if (evt.keyCode === window.util.KEY_CODE_ESC) {
      const modalOpen = document.querySelector(".modal--show");
      closePostamble(modalOpen);
      document.removeEventListener("keydown", onBtnEscPress);
    }
  }
})();

