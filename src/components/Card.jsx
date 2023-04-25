export default function Card(props) {
    
    function handleCardClick() {
        props.onCardClick(props.card);
      }
    return (
        <div className="element">
            <button className="element__image-button">
            <img className="element__image" 
            src={(`${props.card.link}`)} alt={`${props.card.name}`} 
            onClick={handleCardClick}/>
            </button>
            <div className="element__group-title">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__group-title-like-container">
                    <button className="element__group-title-like" type="button"></button>
                    <p className="element__group-title-like-number">{props.card.likes.length}</p>
                </div>
                <button className="element__group-title-delete"></button>
            </div>
        </div>
    )
}