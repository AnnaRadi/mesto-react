import '../index.css';
import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import { useState, useEffect } from 'react';
import ImagePopup from './ImagePopup'
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup';
import EditProfileAvatar from './EditProfileAvatar';
import AddPlacePopup from "./AddPlacePopup";

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState(null)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getAllCards()])
        .then(([userData, card]) => {
            setCurrentUser(userData)
            setCards(card)
        }).catch(err => {
            console.log(err);
        });
}, [])


  function closeAllPopups() {
    setSelectedCard(null);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        console.log(card._id)
       return setCards((state) => state.filter((item) => item._id !== card._id))
      })
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      console.log(card._id)
      console.log(newCard)
        setCards((state) => {
          return state.map((c) => c._id === card._id ? newCard : c)});
    });
}
  function handleUpdateUser(newUserInfo) {
    api.editProfile(newUserInfo)
      .then((data) => {
        console.log(newUserInfo)
        setCurrentUser(data)
        closeAllPopups()
      })
  }

  function handleUpdateAvatar(newAvatar) {
    api.editProfileAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
  }

  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
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
    <CurrentUserContext.Provider value={currentUser}>
    <div className="body">
      <div className="page">
        <Header />
        <Main
          cards={cards} 
          onCardClick={handleCardClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup 
              isOpen={isEditProfilePopupOpen} 
              onClose={closeAllPopups} 
              onUpdateUser={handleUpdateUser}/> 
        
        <EditProfileAvatar 
              isOpen={isEditAvatarPopupOpen} 
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup
              isOpen={isAddPlacePopupOpen} 
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
