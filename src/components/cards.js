import { openModal} from './modal.js';
import { unlikeCard, likeCard, deleteCard } from './api.js';

export function createCard(cardData, currentUserId) {
  const imageViewPopup = document.querySelector('.popup_type_image');

  const template = document.querySelector('#card-template').content;
  const cardElement = template.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  // Set card image, title, and like count
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;

  if (cardData.likes.some((user) => user._id === currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Add event listener to handle like button clicks
  likeButton.addEventListener('click', () => {
    if (likeButton.classList.contains('card__like-button_is-active')) {
      unlikeCard(cardData._id)
        .then((updatedCard) => {
          likeButton.classList.remove('card__like-button_is-active');
          likeCount.textContent = updatedCard.likes.length;
        })
        .catch((err) => {
          console.error('Ошибка при снятии лайка:', err);
        });
    } else {
      likeCard(cardData._id)
        .then((updatedCard) => {
          likeButton.classList.add('card__like-button_is-active');
          likeCount.textContent = updatedCard.likes.length;
        })
        .catch((err) => {
          console.error('Ошибка при постановке лайка:', err);
        });
    }
  });

  if (cardData.owner._id !== currentUserId) {
    deleteButton.style.display = 'none';
  }

  // Add event listener to handle card deletion
  deleteButton.addEventListener('click', () => {
    deleteCard(cardData._id)
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => {
        console.error('Ошибка при удалении карточки:', err);
      });
  });

  // Add event listener to open the image view popup when the card image is clicked
  cardImage.addEventListener('click', () => {
    const popupImage = imageViewPopup.querySelector('.popup__image');
    const popupCaption = imageViewPopup.querySelector('.popup__caption');
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openModal(imageViewPopup);
  });

  return cardElement;
}