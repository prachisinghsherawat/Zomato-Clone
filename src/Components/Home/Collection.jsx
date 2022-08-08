import "./Home.css"
import rightArrow from '../Icons/right-arrow.png'
import CathTheMatachImg from '../Images/cathcthematch.jpg'
import NewInTownImg from '../Images/newintown.jpg'
import TrendingThisWeekImg from '../Images/trendingthisweek.jpg'
import CallingBarHoppersImg from '../Images/callingallbarhoppers.jpg'
import CollectionCard from '../Utils/Cards/CollectionCard'

export const Collections = () => {  
    return(
        <>

        <div className="outerDiv">
        <h1>Collections</h1>
        <div className="tagLine">
            <span id="desc">Explore curated lists of top restaurants, cafes, pubs, and bars in Delhi NCR, based on trends</span>
            <span className="collectionPlacesTag"> <span className="rightArrowBox"><img className="rightArrow" src={rightArrow} alt="right arrow" /></span></span>
        </div>
        <div className="cards">
            <CollectionCard imgSrc={CathTheMatachImg} title="Catch the Match" places="30" />
            <CollectionCard imgSrc={NewInTownImg} title="New In Town" places="19" />
            <CollectionCard imgSrc={TrendingThisWeekImg} title="Trending This Week" places="30" />
            <CollectionCard imgSrc={CallingBarHoppersImg} title="Calling all Bar Hoppers" places="30" />
        </div>
        </div>
        </>
    )
}

