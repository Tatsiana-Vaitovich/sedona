"use strict";

(function() {
  const form = document.querySelector(".comment__form");
  const arrFormElements = Array.from(form.elements);
  const modalInvalid = document.querySelector(".modal--invalid");
  const modalSucces = document.querySelector(".modal--success");
  const noValidElems = [];

  // подкорректируем сообщение об ошибке
  form.addEventListener("click", function(evt) {
    // evt.preventDefault();
    console.log(evt);
    const elem = evt.target;
    if (elem.closest(".comment__btn")) {
      arrFormElements.forEach(function(elem) {
        if (!elem.validity.valid) {
          addInvalidStyle(elem);
          showModalInvalid();
          elem.addEventListener("blur", onElemFormBlur);
          noValidElems.push(elem);
        }
      });
    }
    // if (!noValidElems.length) {
    //   form.addEventListener("submit", showModalSucces);
    // задержу отправку формы
    // setTimeout(func, 5000);
    // }
  });

  // event "submit" срабатывает, когда форма отправляется
  form.addEventListener("submit", showModalSucces);

  function showModal(modalName) {
    modalName.classList.add("modal--show");
    document.addEventListener("keydown", onBtnEscPress);
    const modalBtn = modalName.querySelector(".btn");
    modalBtn.focus();
  }

  function showModalSucces() {
    showModal(modalSucces);
  }

  function showModalInvalid() {
    // form.addEventListener("click", function(clickEvt) {
    //   clickEvt.preventDefault();
    // });
    showModal(modalInvalid);
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
    noValidElems.shift().focus();

    document.removeEventListener("keydown", onBtnEscPress);
  }

  function onBtnEscPress(evt) {
    if (evt.keyCode === window.util.KEY_CODE_ESC) {
      const modalOpen = document.querySelector(".modal--show");
      closePostamble(modalOpen);
      document.removeEventListener("keydown", onBtnEscPress);
    }
  }

  // отменю браузерные события на postamble--modal чтобы текст внутри popUp не выделялся при щелчке
  modalInvalid.addEventListener("mousedown", function(mouseDownevt) {
    mouseDownevt.preventDefault();
  });

  modalSucces.addEventListener("mousedown", function(mouseDownevt) {
    mouseDownevt.preventDefault();
  });

})();

