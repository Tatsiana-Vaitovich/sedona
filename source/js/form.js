"use strict";

(function() {
  const form = document.querySelector(".comment__form");
  const arrFormElements = Array.from(form.elements);
  const modalInvalid = document.querySelector(".modal--invalid");
  const modalSucces = document.querySelector(".modal--success");
  const noValidElems = [];

  // подкорректируем сообщение об ошибке
  form.addEventListener("click", function(clickEvt) {
    const number = noValidElems.length;
    noValidElems.splice(0, number);
    console.log(noValidElems);
    const elem = clickEvt.target;
    if (elem.closest(".comment__btn")) {
      arrFormElements.forEach(function(elem) {
        if (!elem.validity.valid) {
          addInvalidStyle(elem);
          elem.addEventListener("blur", onElemFormBlur);
          noValidElems.push(elem);
        }
      });
      console.log(noValidElems);
      if (noValidElems.length > 0) {
        showModalInvalid();
      } else {
        setTimeout(submitForm, 5000);
        showModalSucces();
        // window.util.disableForm(form);
      }
    }
  });

  // event "submit" срабатывает, когда форма отправляется
  form.addEventListener("submit", submitEvt => submitEvt.preventDefault());
  // form.addEventListener("submit", showModalSucces);

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
    window.util.disableForm(form);
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

  document.addEventListener("click", function(clickEvt) {
    const elem = clickEvt.target;
    if (elem.closest(".postamble__btn--narrow")) {
      closeModalInvalid();
    } else if (elem.closest(".postamble__btn--modal-success")) {
      closeModalSuccess();
    }
  });

  function closeModalInvalid() {
    modalInvalid.classList.remove("modal--show");
    window.util.enableForm(form);
    noValidElems.shift().focus();

    document.removeEventListener("keydown", onBtnEscPress);
  }

  function closeModalSuccess() {
    modalSucces.classList.remove("modal--show");
    // тут нужно очистить форму
    window.location.reload();

    document.removeEventListener("keydown", onBtnEscPress);
  }

  function onBtnEscPress(keydownEvt) {
    if (keydownEvt.keyCode === window.util.KEY_CODE_ESC) {
      const modalOpen = document.querySelector(".modal--show");
      if (modalOpen.closest(".modal--invalid")) {
        closeModalInvalid();
      } else {
        closeModalSuccess();
      }

      document.removeEventListener("keydown", onBtnEscPress);
    }
  }

  function submitForm() {
    form.setAttribute("action", "http://echo.htmlacademy.ru");
    form.setAttribute("metod", "POST");
    form.submit();
  }

  // отменю браузерные события на postamble--modal чтобы текст внутри popUp не выделялся при щелчке
  modalInvalid.addEventListener("mousedown", function(mouseDownevt) {
    mouseDownevt.preventDefault();
  });

  modalSucces.addEventListener("mousedown", function(mouseDownevt) {
    mouseDownevt.preventDefault();
  });

})();

