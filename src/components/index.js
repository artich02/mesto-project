import avatarImage from '../images/avatar.jpg';
import logoImage from '../images/logo.svg';
import '../pages/index.css';
import { toggleButtonState } from './validation.js';
import { openModal, closeModal, handleOverlayClick } from './modal.js';
import { createCard } from './cards.js';
import {
  getUserProfile,
  getInitialCards,
  updateUserProfile,
  addNewCard,
  deleteCard,
  likeCard,
  unlikeCard,
  updateAvatar,
} from './api.js';

const avatarElement = document.querySelector('.profile__image');
avatarElement.style.backgroundImage = `url(${avatarImage})`;

const logoElement = document.querySelector('.header__logo');
logoElement.src = logoImage;

const profileNameElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');
const profileAvatarElement = document.querySelector('.profile__image');
const cardList = document.querySelector('.places__list');
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const avatarPopup = document.querySelector('.popup_type_update-avatar');

// Adding event listeners to all close buttons to close popups
const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    closeModal(popup);
  });
});

const profileEditButton = document.querySelector('.profile__edit-button');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');

const addCardButton = document.querySelector('.profile__add-button');
const cardFormElement = cardPopup.querySelector('.popup__form');
const placeNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardPopup.querySelector('.popup__input_type_url');

const avatarFormElement = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarFormElement.querySelector('.popup__input_type_avatar-url');

let currentUserId = null;

// Fetching and rendering the user profile data
getUserProfile()
  .then((userData) => {
    profileNameElement.textContent = userData.name;
    profileDescriptionElement.textContent = userData.about;
    profileAvatarElement.style.backgroundImage = `url(${userData.avatar})`;
    currentUserId = userData._id;
  })
  .catch((err) => {
    console.error(`Ошибка загрузки профиля: ${err}`);
  });

// Function to render a list of cards
function renderCards(cards) {
  cards.forEach((cardData) => {
    const cardElement = createCard(cardData, currentUserId);
    cardList.append(cardElement);
  });
}

// Fetching and displaying the initial set of cards
getInitialCards()
  .then((cards) => {
    renderCards(cards);
  })
  .catch((err) => {
    console.error(`Ошибка загрузки карточек: ${err}`);
  });

// Handling the profile edit button click to open the edit modal
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileDescriptionElement.textContent;
  openModal(profilePopup);
});

// Handling profile form submission to update user data
profileFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';

  const updatedUserData = { name: nameInput.value, about: jobInput.value };
  updateUserProfile(updatedUserData)
    .then((userData) => {
      profileNameElement.textContent = userData.name;
      profileDescriptionElement.textContent = userData.about;
      closeModal(profilePopup);
    })
    .catch((err) => {
      console.error(`Ошибка обновления профиля: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
});

// Handling the new card button click to open the card creation modal
addCardButton.addEventListener('click', () => {
  placeNameInput.value = '';
  cardLinkInput.value = '';
  openModal(cardPopup);
});

// Handling new card form submission to create a new card
cardFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = 'Создание...';

  const newCardData = { name: placeNameInput.value, link: cardLinkInput.value };
  addNewCard(newCardData)
    .then((cardData) => {
      const newCard = createCard(cardData, currentUserId);
      cardList.prepend(newCard);
      closeModal(cardPopup);
    })
    .catch((err) => {
      console.error(`Ошибка добавления карточки: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = 'Создать';
    });
});

// Handling avatar image click to open the avatar update modal
profileAvatarElement.addEventListener('click', () => {
  avatarInput.value = '';
  openModal(avatarPopup);
});

// Handling avatar form submission to update the user's avatar
avatarFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';

  const avatarUrl = avatarInput.value;
  updateAvatar(avatarUrl)
    .then((userData) => {
      profileAvatarElement.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(avatarPopup);
      avatarFormElement.reset();
    })
    .catch((err) => {
      console.error(`Ошибка обновления аватара: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
});

// Enabling or disabling the avatar form submit button based on input validation
avatarInput.addEventListener('input', () => {
  const inputs = [avatarInput];
  const submitButton = avatarFormElement.querySelector('.popup__button');
  toggleButtonState(inputs, submitButton);
});