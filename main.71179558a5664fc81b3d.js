/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/

;// ./src/images/avatar.jpg
const avatar_namespaceObject = __webpack_require__.p + "6666407ac3aa5af1d5de.jpg";
;// ./src/images/logo.svg
const logo_namespaceObject = __webpack_require__.p + "fc3e6875d825f899a98d.svg";
;// ./src/components/validation.js
// Universal function to display an error
function showInputError(formElement, inputElement, errorMessage) {
  var errorElement = formElement.querySelector("#".concat(inputElement.id, "-error"));
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
}

// Universal function to hide an error
function hideInputError(formElement, inputElement) {
  var errorElement = formElement.querySelector("#".concat(inputElement.id, "-error"));
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
  var isValid = inputs.every(function (input) {
    return input.validity.valid;
  });
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
  var inputs = Array.from(formElement.querySelectorAll('.popup__input'));
  var buttonElement = formElement.querySelector('.popup__button');

  // Initial check of the button state
  toggleButtonState(inputs, buttonElement);
  inputs.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputs, buttonElement);
    });
  });
}

// Function to initialize validation for all forms
function enableValidation() {
  var forms = Array.from(document.querySelectorAll('.popup__form'));
  forms.forEach(function (formElement) {
    setEventListeners(formElement);
  });
}

// Call the initialization function after the page loads
enableValidation();

;// ./src/components/modal.js

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    var openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

// Function to open a popup
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  console.log("Popup opened");
  var errorMessages = popup.querySelectorAll('.popup__error');
  errorMessages.forEach(function (errorElement) {
    errorElement.textContent = '';
  });
  var inputs = Array.from(popup.querySelectorAll('.popup__input'));
  inputs.forEach(function (input) {
    input.classList.remove('popup__input_type_error');
  });
  var submitButton = popup.querySelector('.popup__button');
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

;// ./src/components/api.js
var config = {
  baseUrl: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
  headers: {
    authorization: 'eed9ec50-4671-425e-9dea-71912e170084',
    'Content-Type': 'application/json'
  }
};

// Fetching cards from the server
var getInitialCards = function getInitialCards() {
  return fetch("".concat(config.baseUrl, "/cards"), {
    headers: config.headers
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Error: ".concat(res.status));
  });
};

// Fetching user data
var getUserProfile = function getUserProfile() {
  return fetch("".concat(config.baseUrl, "/users/me"), {
    headers: config.headers
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Error: ".concat(res.status));
  });
};

// Updating user data
var updateUserProfile = function updateUserProfile(userData) {
  return fetch("".concat(config.baseUrl, "/users/me"), {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(userData)
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Error: ".concat(res.status));
  });
};

// Adding a new card
var addNewCard = function addNewCard(cardData) {
  return fetch("".concat(config.baseUrl, "/cards"), {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(cardData)
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Error: ".concat(res.status));
  });
};

// Deleting a card
var deleteCard = function deleteCard(cardId) {
  return fetch("".concat(config.baseUrl, "/cards/").concat(cardId), {
    method: 'DELETE',
    headers: config.headers
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Error: ".concat(res.status));
  });
};

// Liking a card
var likeCard = function likeCard(cardId) {
  return fetch("".concat(config.baseUrl, "/cards/likes/").concat(cardId), {
    method: 'PUT',
    headers: config.headers
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Error: ".concat(res.status));
  });
};

// Unliking a card
var unlikeCard = function unlikeCard(cardId) {
  return fetch("".concat(config.baseUrl, "/cards/likes/").concat(cardId), {
    method: 'DELETE',
    headers: config.headers
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Error: ".concat(res.status));
  });
};

// Updating user avatar
var updateAvatar = function updateAvatar(avatarUrl) {
  return fetch("".concat(config.baseUrl, "/users/me/avatar"), {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Error: ".concat(res.status));
  });
};
;// ./src/components/cards.js
function createCard(cardData, currentUserId) {
  var imageViewPopup = document.querySelector('.popup_type_image');
  var template = document.querySelector('#card-template').content;
  var cardElement = template.querySelector('.card').cloneNode(true);
  var cardImage = cardElement.querySelector('.card__image');
  var cardTitle = cardElement.querySelector('.card__title');
  var likeButton = cardElement.querySelector('.card__like-button');
  var likeCount = cardElement.querySelector('.card__like-count');
  var deleteButton = cardElement.querySelector('.card__delete-button');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;
  if (cardData.likes.some(function (user) {
    return user._id === currentUserId;
  })) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeButton.addEventListener('click', function () {
    if (likeButton.classList.contains('card__like-button_is-active')) {
      unlikeCard(cardData._id).then(function (updatedCard) {
        likeButton.classList.remove('card__like-button_is-active');
        likeCount.textContent = updatedCard.likes.length;
      }).catch(function (err) {
        console.error('Ошибка при снятии лайка:', err);
      });
    } else {
      likeCard(cardData._id).then(function (updatedCard) {
        likeButton.classList.add('card__like-button_is-active');
        likeCount.textContent = updatedCard.likes.length;
      }).catch(function (err) {
        console.error('Ошибка при постановке лайка:', err);
      });
    }
  });
  if (cardData.owner._id !== currentUserId) {
    deleteButton.style.display = 'none';
  }
  deleteButton.addEventListener('click', function () {
    deleteCard(cardData._id).then(function () {
      cardElement.remove();
    }).catch(function (err) {
      console.error('Ошибка при удалении карточки:', err);
    });
  });
  cardImage.addEventListener('click', function () {
    var popupImage = imageViewPopup.querySelector('.popup__image');
    var popupCaption = imageViewPopup.querySelector('.popup__caption');
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openModal(imageViewPopup);
  });
  return cardElement;
}


;// ./src/components/index.js







var avatarElement = document.querySelector('.profile__image');
avatarElement.style.backgroundImage = "url(".concat(avatar_namespaceObject, ")");
var logoElement = document.querySelector('.header__logo');
logoElement.src = logo_namespaceObject;
var profileNameElement = document.querySelector('.profile__title');
var profileDescriptionElement = document.querySelector('.profile__description');
var profileAvatarElement = document.querySelector('.profile__image');
var cardList = document.querySelector('.places__list');
var profilePopup = document.querySelector('.popup_type_edit');
var cardPopup = document.querySelector('.popup_type_new-card');
var imagePopup = document.querySelector('.popup_type_image');
var avatarPopup = document.querySelector('.popup_type_update-avatar');
var closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach(function (button) {
  button.addEventListener('click', function (event) {
    var popup = event.target.closest('.popup');
    closeModal(popup);
  });
});
var profileEditButton = document.querySelector('.profile__edit-button');
var profileFormElement = profilePopup.querySelector('.popup__form');
var nameInput = profilePopup.querySelector('.popup__input_type_name');
var jobInput = profilePopup.querySelector('.popup__input_type_description');
var addCardButton = document.querySelector('.profile__add-button');
var cardFormElement = cardPopup.querySelector('.popup__form');
var placeNameInput = cardPopup.querySelector('.popup__input_type_card-name');
var cardLinkInput = cardPopup.querySelector('.popup__input_type_url');
var avatarFormElement = avatarPopup.querySelector('.popup__form');
var avatarInput = avatarFormElement.querySelector('.popup__input_type_avatar-url');
var currentUserId = null;
getUserProfile().then(function (userData) {
  profileNameElement.textContent = userData.name;
  profileDescriptionElement.textContent = userData.about;
  profileAvatarElement.style.backgroundImage = "url(".concat(userData.avatar, ")");
  currentUserId = userData._id;
}).catch(function (err) {
  console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043F\u0440\u043E\u0444\u0438\u043B\u044F: ".concat(err));
});
function renderCards(cards) {
  cards.forEach(function (cardData) {
    var cardElement = createCard(cardData, currentUserId);
    cardList.append(cardElement);
  });
}
getInitialCards().then(function (cards) {
  renderCards(cards);
}).catch(function (err) {
  console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A: ".concat(err));
});
profileEditButton.addEventListener('click', function () {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileDescriptionElement.textContent;
  openModal(profilePopup);
});
profileFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  var submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';
  var updatedUserData = {
    name: nameInput.value,
    about: jobInput.value
  };
  updateUserProfile(updatedUserData).then(function (userData) {
    profileNameElement.textContent = userData.name;
    profileDescriptionElement.textContent = userData.about;
    closeModal(profilePopup);
  }).catch(function (err) {
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0444\u0438\u043B\u044F: ".concat(err));
  }).finally(function () {
    submitButton.textContent = 'Сохранить';
  });
});
addCardButton.addEventListener('click', function () {
  placeNameInput.value = '';
  cardLinkInput.value = '';
  openModal(cardPopup);
});
cardFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  var submitButton = evt.submitter;
  submitButton.textContent = 'Создание...';
  var newCardData = {
    name: placeNameInput.value,
    link: cardLinkInput.value
  };
  addNewCard(newCardData).then(function (cardData) {
    var newCard = createCard(cardData, currentUserId);
    cardList.prepend(newCard);
    closeModal(cardPopup);
  }).catch(function (err) {
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438: ".concat(err));
  }).finally(function () {
    submitButton.textContent = 'Создать';
  });
});
profileAvatarElement.addEventListener('click', function () {
  avatarInput.value = '';
  openModal(avatarPopup);
});
avatarFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  var submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';
  var avatarUrl = avatarInput.value;
  updateAvatar(avatarUrl).then(function (userData) {
    profileAvatarElement.style.backgroundImage = "url(".concat(userData.avatar, ")");
    closeModal(avatarPopup);
    avatarFormElement.reset();
  }).catch(function (err) {
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0430\u0432\u0430\u0442\u0430\u0440\u0430: ".concat(err));
  }).finally(function () {
    submitButton.textContent = 'Сохранить';
  });
});
avatarInput.addEventListener('input', function () {
  var inputs = [avatarInput];
  var submitButton = avatarFormElement.querySelector('.popup__button');
  toggleButtonState(inputs, submitButton);
});
/******/ })()
;