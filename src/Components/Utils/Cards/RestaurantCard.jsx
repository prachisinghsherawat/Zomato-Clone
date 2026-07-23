import { useNavigate } from "react-router-dom";
import { HeartFilled, HeartOutlined, StarFilled, ClockCircleOutlined } from "@ant-design/icons";
import { toggleFavorite, useFavorites } from "../store";
import "./RestaurantCard.css";

// Reusable restaurant card used across Search, Favorites and the Home
// "popular near you" strip. Handles its own favourite toggle + navigation.
export const RestaurantCard = ({ item, to }) => {

    const navigate = useNavigate();
    const favs = useFavorites();
    const faved = favs.some((el) => String(el.id) === String(item.id));

    const link = to || `/search-details/${item.id}`;
    const rating = Number(item.rating) || 0;
    const eta = 20 + ((Number(item.id) || 0) * 7) % 25; // deterministic pseudo-ETA

    return (
        <div className="rCard" onClick={() => navigate(link, { state: { item } })}>

            <div className="rCardImg">
                <img src={item.imgUrl || item.image} alt={item.name} loading="lazy" />

                <button
                    className={`rHeart ${faved ? "on" : ""}`}
                    aria-label="Save to favorites"
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(item); }}
                >
                    {faved ? <HeartFilled /> : <HeartOutlined />}
                </button>

                {rating >= 4.3 &&
                    <span className="rBadge">Promoted</span>}

                <div className="rCardFade">
                    <span className="rOff">{40 + (Number(item.id) || 0) % 3 * 10}% OFF up to ₹80</span>
                </div>
            </div>

            <div className="rCardBody">
                <div className="rCardTop">
                    <h3>{item.name}</h3>
                    <span className={`rRating ${rating < 3.5 ? "low" : ""}`}>
                        {rating.toFixed(1)} <StarFilled />
                    </span>
                </div>
                <p className="rCuisine">{item.variety}</p>
                <div className="rCardMeta">
                    <span><ClockCircleOutlined /> {eta} min</span>
                    <span className="dot">•</span>
                    <span>₹{item.price} for one</span>
                    <span className="dot">•</span>
                    <span>{item.place}</span>
                </div>
            </div>
        </div>
    );
};
