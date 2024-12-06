// Universal function to display an error
function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible');
  }
  
  // Universal function to hide an error
  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
    errorElement.classList.remove('popup__error_visible');
  }
  
  // Validating a field
  function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }
  
  // Toggle the button state
  function toggleButtonState(inputs, submitButton) {
    const isValid = inputs.every((input) => input.validity.valid);
    if (isValid) {
      submitButton.classList.remove('popup__button_disabled');
      submitButton.disabled = false;
    } else {
      submitButton.classList.add('popup__button_disabled');
      submitButton.disabled = true;
    }
  }
  
  // Set event listeners for validation
  function setEventListeners(formElement) {
    const inputs = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
  
    // Initial check of the button state
    toggleButtonState(inputs, buttonElement);
  
    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputs, buttonElement);
      });
    });
  }
  
  // Function to initialize validation for all forms
  function enableValidation() {
    const forms = Array.from(document.querySelectorAll('.popup__form'));
    forms.forEach((formElement) => {
      setEventListeners(formElement);
    });
  }
  
  // Call the initialization function after the page loads
  enableValidation();
  export { toggleButtonState };
  