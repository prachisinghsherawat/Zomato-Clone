import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../Data/api"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import { Footer } from "../Footer/Footer"
import { CartPage } from "../CartPage/CartPage"
import "./A.Details.css"

// Shared detail view used by every "…Details" page. Keeps the individual
// detail pages tiny and the layout consistent (separate location/area,
// cuisine, cost and rating tiles, plus a "related places" strip).
export const FoodDetail = ({
    data = {},
    cart = false,
    relatedEndpoint,
    relatedBasePath = "",
    relatedTitle = "More places to explore",
}) => {

    const [isCheck, setIsCheck] = useState(false)
    const [related, setRelated] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (relatedEndpoint) {
            axios.get(relatedEndpoint).then((res) =>
                setRelated((res.data || []).filter((el) => el.id !== data.id).slice(0, 4))
            )
        }
    }, [relatedEndpoint, data.id])

    return (
        <>
            <ZomatoNav />

            {cart && isCheck &&
                <CartPage foodData={data} />
            }

            {!(cart && isCheck) &&
            <div className="FoodDetails">

                <div className="detailImg"><img src={data.imgUrl} alt={data.name} /></div>

                <div id="FlexBoxis">
                    <h1>{data.name}</h1>
                    {data.rating && <span className="detailRating">★ {data.rating}</span>}
                </div>

                {data.variety && <p className="detailCuisine">{data.variety}</p>}

                <div className="detailMeta">
                    <div className="metaTile">
                        <span className="metaLabel">Location / Area</span>
                        <span className="metaValue">{data.place || "—"}</span>
                    </div>
                    <div className="metaTile">
                        <span className="metaLabel">Cuisine</span>
                        <span className="metaValue">{data.variety || "—"}</span>
                    </div>
                    <div className="metaTile">
                        <span className="metaLabel">Cost</span>
                        <span className="metaValue">Rs. {data.price} for one</span>
                    </div>
                    <div className="metaTile">
                        <span className="metaLabel">Rating</span>
                        <span className="metaValue">{data.rating || "—"} / 5</span>
                    </div>
                </div>

                {cart &&
                    <button onClick={() => setIsCheck(true)} id="cartBtn">ADD TO CART</button>
                }

                {related.length > 0 &&
                    <div className="relatedSection">
                        <h2>{relatedTitle}</h2>
                        <div className="relatedGrid">
                            {related.map((el) => (
                                <div
                                    className="relatedCard"
                                    key={el.id}
                                    onClick={() => navigate(`${relatedBasePath}/${el.id}`)}
                                >
                                    <img src={el.imgUrl} alt={el.name} />
                                    <div className="relatedInfo">
                                        <h3>{el.name}</h3>
                                        <div className="relatedRow">
                                            <span className="relatedPlace">{el.place}</span>
                                            <span className="relatedRating">★ {el.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }

            </div>
            }

            <div className="footerDiv">
                <Footer />
            </div>

        </>
    )
}
