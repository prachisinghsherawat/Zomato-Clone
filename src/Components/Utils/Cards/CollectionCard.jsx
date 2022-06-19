import   "./CollectionCard.css"
import rightArrow from '../../Icons/right-arrow.png'

let CollectionCard = ({ imgSrc, title, places }) => {

    
    return <div className="card">
        <img className="cardImg" src={imgSrc} alt="collection card" />
        <div className="details">
            <div className="title">{title}</div>
            <div className="placesTxt"> <span className="count"> {places} </span><span className="places">Places</span>  <span className="rightArrowBox" >
                <img className="rightArrow" src={rightArrow} alt="right arrow" />
            </span></div>
        </div>
    </div >
}

export default CollectionCard;