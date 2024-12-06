// Function to open a popup
function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

// Function to close a popup
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

// Function to create a card
function createCard(cardData) {
    const template = document.querySelector('#card-template').content;
    const cardElement = template.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    // Add like functionality
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    // Add delete functionality
    deleteButton.addEventListener('click', () => {
        cardElement.remove();
    });

    // Add functionality to open image in popup
    cardImage.addEventListener('click', () => {
        const popupImage = imagePopup.querySelector('.popup__image');
        const popupCaption = imagePopup.querySelector('.popup__caption');

        popupImage.src = cardData.link;
        popupImage.alt = cardData.name;
        popupCaption.textContent = cardData.name;

        openModal(imagePopup);
    });

    return cardElement;
}

// Container for cards
const cardList = document.querySelector('.places__list');

// Add cards from the initial array
initialCards.forEach((cardData) => {
    const card = createCard(cardData);
    cardList.append(card);
});

// Popup elements
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// Close buttons for popups
const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const popup = event.target.closest('.popup');
        closeModal(popup);
    });
});

// Profile edit form
const profileEditButton = document.querySelector('.profile__edit-button');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');

// Open profile edit form
profileEditButton.addEventListener('click', () => {
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
    openModal(profilePopup);
});

// Function to handle profile form submission
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// Form to add a new card
const addCardButton = document.querySelector('.profile__add-button');
const cardFormElement = cardPopup.querySelector('.popup__form');
const placeNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardPopup.querySelector('.popup__input_type_url');

// Open form to add a new card
addCardButton.addEventListener('click', () => {
    placeNameInput.value = '';
    cardLinkInput.value = '';
    openModal(cardPopup);
});

// Function to handle card form submission
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newCardData = {
        name: placeNameInput.value,
        link: cardLinkInput.value
    };
    const newCard = createCard(newCardData);
    cardList.prepend(newCard);
    closeModal(cardPopup);
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);

// Add modifier for smooth opening of popups
document.querySelectorAll('.popup').forEach((popup) => {
    popup.classList.add('popup_is-animated');
});
