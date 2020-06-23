"use strict";

// универсальные константы и функции

(function() {
  const KEY_CODE_ESC = 27;
  const SCREEN_TABLET = 768;

  function addDisabled(elem) {
    elem.setAttribute("disabled", "");
  }

  function removeDisabled(elem) {
    elem.removeAttribute("disabled");
  }

  function disableForm(formName) {
    const formElements = Array.from(formName.elements);
    formElements.forEach(function(elem) {
      window.util.addDisabled(elem);
    });
  }

  function enableForm(formName) {
    const formElements = Array.from(formName.elements);
    formElements.forEach(function(elem) {
      window.util.removeDisabled(elem);
    });
  }


  window.util = {
    KEY_CODE_ESC: KEY_CODE_ESC,
    SCREEN_TABLET: SCREEN_TABLET,
    addDisabled: addDisabled,
    removeDisabled: removeDisabled,
    disableForm: disableForm,
    enableForm: enableForm,
  };
})();
