import { toggleButtonState } from './validation.js';

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

// Function to open a popup
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  console.log("Popup opened");
  const errorMessages = popup.querySelectorAll('.popup__error');
  errorMessages.forEach((errorElement) => {
    errorElement.textContent = '';
  });

  const inputs = Array.from(popup.querySelectorAll('.popup__input'));
  inputs.forEach((input) => {
    input.classList.remove('popup__input_type_error');
  });

  const submitButton = popup.querySelector('.popup__button');
  if (submitButton) {
    toggleButtonState(inputs, submitButton);
  }

  document.addEventListener('keydown', closeByEsc);
  popup.addEventListener('mousedown', handleOverlayClick);
}

// Function to close a popup
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
}

// Function to close a popup by clicking on the overlay
function handleOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  }
}

export { openModal, closeModal };
