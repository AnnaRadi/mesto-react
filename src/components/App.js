import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import { useState, useEffect } from 'react';
import ImagePopup from './ImagePopup'
import PopupWithForm from './PopupWithForm';

function App() {

  const [selectedCard, setSelectedCard] = useState(null)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)

  function closeAllPopups() {
    setSelectedCard(null);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  return (
    <div className="body">
      <div className="page">
        <Header />
        <Main
          onCardClick={handleCardClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
        />
        <Footer />
        <PopupWithForm
          isOpen={isEditProfilePopupOpen}
          name={'profile'}
          container={'__container'}
          title={'Редактировать профиль'}
          form={'-profile'}
          button={'Сохранить'}
          onClose={closeAllPopups}>
          <input
            type="text"
            name="name"
            className="popup__container-input popup__container-input_name_first"
            id="name"
            required
            placeholder='Имя'
            minLength="2"
            maxLength="40"
          />
          <span className="error input-error-name"></span>
          <input
            type="text"
            name="about"
            className="popup__container-input popup__container-input_about_you"
            id="about"
            required
            placeholder='О себе'
            minLength="2"
            maxLength="200"
          />
          <span className="error input-error-about"></span>
        </PopupWithForm>
        <PopupWithForm
          isOpen={isEditAvatarPopupOpen}
          name={'avatar'}
          container={'__container'}
          title={'Обновить аватар'}
          form={'-avatar'}
          button={'Сохранить'}
          onClose={closeAllPopups}>
          <input
            type="url"
            name="avatar"
            className="popup__container-input popup__container-input_type_avatar"
            id="avatar"
            required
            placeholder='Ссылка на аватар'
          />
          <span className="error input-error-avatar"></span>
        </PopupWithForm>
        <PopupWithForm
          isOpen={isAddPlacePopupOpen}
          name={'mesto'}
          container={'-mesto__container-card'}
          title={'Новое место'}
          form={'-mesto'}
          button={'Создать'}
          onClose={closeAllPopups}>
          <input
            type="text"
            name="nameMesto"
            className="popup__container-input popup__container-input_name_mesto"
            id="nameMesto"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="error input-error-nameMesto"></span>
          <input
            type="url"
            name="linkPicture"
            className="popup__container-input popup__container-input_link_picture"
            id="linkPicture"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="error input-error-linkPicture"></span>
        </PopupWithForm>
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </div>
  );
}

export default App;
