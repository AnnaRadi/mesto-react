import avatar from '../images/Avatar.svg';
import pen from '../images/Vector.svg';
import plus from '../images/Vector_(1).svg';
import api from '../utils/Api.js';
import { useState, useEffect } from 'react';
import Card from './Card'


export default function Main(props) {
    const [{name, about, avatar }, setUser] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getAllCards()])
            .then(([userData, card]) => {
                setUser(userData)
                setCards(card)
            }).catch(err => {
                console.log(err);
            });
    }, [])
    return (
        <main className="main">
            <section className="profile">
                <div className="profile__items">
                    <div className="profile__avatar">
                        <img className="profile__avatar-images" style={{ backgroundImage: `url(${avatar})` }} alt={name} />
                        <button type="button" className="profile__avatar-button" onClick={props.onEditAvatar}></button>
                    </div>
                    <div className="profile-info">
                        <div className="profile-info__title-group">
                            <h1 className="profile-info__title" >{name}</h1>
                            <button className="profile-info__edit-button" type="button">
                                <img src={pen} className="profile-info__images" alt="Редактировать" onClick={props. onEditProfile}/>
                            </button>
                        </div>
                        <p className="profile-info__subtitle" >{about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}>
                    <img src={plus} className="profile__add-button-images" alt="Добавить" />
                </button>
            </section>
            <section className="elements">
            { cards.map( (card) => (
            <Card
              card={card}
              key={card._id}               
              onCardClick={props.onCardClick}
            />
          ) )          
        }    
            </section>
        </main>
    )
}