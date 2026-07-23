import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeartOutlined } from "@ant-design/icons";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import { RestaurantCard } from "../Utils/Cards/RestaurantCard";
import { useFavorites } from "../Utils/store";
import "../Search/Search.css";

export const Favorites = () => {

    const favs = useFavorites();
    const navigate = useNavigate();

    useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

    return (
        <>
            <Navbar />

            <div className="searchWrap" style={{ paddingTop: 96 }}>
                <h1 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: 6 }}>
                    Your Favourites
                </h1>
                <p style={{ color: "var(--muted)", marginBottom: 28 }}>
                    {favs.length
                        ? `${favs.length} saved place${favs.length !== 1 ? "s" : ""}`
                        : "Tap the heart on any restaurant to save it here."}
                </p>

                {favs.length === 0 ? (
                    <div className="noResults">
                        <HeartOutlined />
                        <h2>No favourites yet</h2>
                        <p>Discover great restaurants and save the ones you love.</p>
                        <button onClick={() => navigate("/delivery")}>Explore restaurants</button>
                    </div>
                ) : (
                    <div className="searchGrid">
                        {favs.map((el) => <RestaurantCard key={el.id} item={el} />)}
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
};
