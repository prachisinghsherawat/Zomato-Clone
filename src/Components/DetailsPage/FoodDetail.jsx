import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { message } from "antd"
import {
    StarFilled, HeartFilled, HeartOutlined, ShareAltOutlined,
    EnvironmentOutlined, ClockCircleOutlined, ThunderboltFilled,
    PlusOutlined, CheckCircleFilled,
} from "@ant-design/icons"
import axios from "../Data/api"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import { Footer } from "../Footer/Footer"
import { RestaurantCard } from "../Utils/Cards/RestaurantCard"
import { toggleFavorite, useFavorites, pingCart } from "../Utils/store"
import { buildMenu, FEATURES } from "./menuData"
import "./A.Details.css"

// Shared detail view used by every "…Details" page — a full-bleed hero plus a
// two-column body (menu + sticky order card) so the page feels like a real
// restaurant page instead of a narrow, half-empty column.
export const FoodDetail = ({
    data = {},
    cart = false,
    relatedEndpoint,
    relatedBasePath = "",
    relatedTitle = "More places to explore",
}) => {

    const [related, setRelated] = useState([])
    const navigate = useNavigate()
    const favs = useFavorites()
    const faved = favs.some((el) => String(el.id) === String(data.id))

    useEffect(() => {
        if (relatedEndpoint && data.id) {
            axios.get(relatedEndpoint).then((res) =>
                setRelated((res.data || []).filter((el) => el.id !== data.id).slice(0, 8))
            )
        }
    }, [relatedEndpoint, data.id])

    const menu = useMemo(() => buildMenu(data), [data])
    const eta = 20 + ((Number(data.id) || 0) * 7) % 25

    const addToCart = (item) => {
        axios.post("/cart", {
            name: item.name,
            imgUrl: item.imgUrl,
            price: Number(item.price) || 0,
            quantity: 1,
        }).then(() => {
            pingCart()
            message.success(`${item.name} added to cart`)
        })
    }

    if (!data.name) {
        return (
            <>
                <ZomatoNav />
                <div className="detailLoading">Loading restaurant…</div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <ZomatoNav />

            {/* ------------------------- Hero banner ------------------------- */}
            <div className="detailHero">
                <div className="detailHeroBg" style={{ backgroundImage: `url(${data.imgUrl})` }} />
                <div className="detailHeroShade" />
                <div className="detailHeroInner">
                    <div className="detailHeroThumb"><img src={data.imgUrl} alt={data.name} /></div>
                    <div className="detailHeroText">
                        <h1>{data.name}</h1>
                        <p className="detailHeroCuisine">{data.variety}</p>
                        <p className="detailHeroPlace">
                            <EnvironmentOutlined /> {data.place} &nbsp;•&nbsp; ₹{data.price} for one
                        </p>
                    </div>
                    <div className="detailHeroBadges">
                        <div className="ratingChip">
                            <span className="ratingNum">{data.rating} <StarFilled /></span>
                            <span className="ratingLabel">Delivery</span>
                        </div>
                        <div className="ratingChip alt">
                            <span className="ratingNum">{(Number(data.rating) - 0.2).toFixed(1)} <StarFilled /></span>
                            <span className="ratingLabel">Dining</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ------------------------- Action bar ------------------------- */}
            <div className="detailActionBar">
                <div className="detailActionInner">
                    <span className="statusOpen"><span className="dotLive" /> Open now &nbsp;·&nbsp; 11 AM – 11 PM</span>
                    <div className="actionBtns">
                        <button onClick={() => toggleFavorite(data)} className={faved ? "on" : ""}>
                            {faved ? <HeartFilled /> : <HeartOutlined />} {faved ? "Saved" : "Favourite"}
                        </button>
                        <button onClick={() => { navigator.clipboard?.writeText(window.location.href); message.success("Link copied!") }}>
                            <ShareAltOutlined /> Share
                        </button>
                    </div>
                </div>
            </div>

            {/* ------------------------- Two-column body ------------------------- */}
            <div className="detailBody">

                <main className="detailMain">

                    <div className="highlightRow">
                        <div className="hl"><ClockCircleOutlined /><span>{eta} min<small>Delivery time</small></span></div>
                        <div className="hl"><ThunderboltFilled /><span>₹{Math.round(data.price * 0.3)}<small>Delivery fee</small></span></div>
                        <div className="hl"><StarFilled /><span>{data.rating}/5<small>{(300 + (Number(data.id) || 1) * 47)} ratings</small></span></div>
                    </div>

                    <div className="offerStrip">
                        <ThunderboltFilled /> <b>50% OFF up to ₹100</b> · Use code <b>WELCOME50</b>
                    </div>

                    <h2 className="menuTitle">Order Online</h2>
                    <p className="menuSub">Recommended · {menu.length} items</p>

                    <div className="menuList">
                        {menu.map((m) => (
                            <div className="menuItem" key={m.name}>
                                <div className="menuItemInfo">
                                    <span className={`vegDot ${m.veg ? "veg" : "nonveg"}`} />
                                    <h3>{m.name}</h3>
                                    <p className="menuPrice">₹{m.price}</p>
                                    <p className="menuDesc">{m.desc}</p>
                                </div>
                                <div className="menuItemImg">
                                    <img src={m.imgUrl} alt={m.name} />
                                    <button onClick={() => addToCart(m)}><PlusOutlined /> ADD</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="aboutBlock">
                        <h2 className="menuTitle">About {data.name}</h2>
                        <p className="aboutText">
                            {data.name} is one of {data.place}'s favourite spots for {data.variety.toLowerCase()}.
                            Loved for generous portions, quick delivery and consistently great taste, it's a
                            go-to for both quick bites and family feasts.
                        </p>
                        <div className="featureChips">
                            {FEATURES.map((f) => (
                                <span className="featureChip" key={f}><CheckCircleFilled /> {f}</span>
                            ))}
                        </div>
                    </div>
                </main>

                {/* Sticky order sidebar */}
                <aside className="detailSide">
                    <div className="orderCard">
                        <img src={data.imgUrl} alt={data.name} />
                        <h3>{data.name}</h3>
                        <p>{data.variety}</p>
                        <div className="orderCardMeta">
                            <span><StarFilled style={{ color: "#f5a623" }} /> {data.rating}</span>
                            <span><ClockCircleOutlined /> {eta} min</span>
                            <span><EnvironmentOutlined /> {data.place}</span>
                        </div>
                        <div className="orderCardCost">₹{data.price} <small>for one</small></div>
                        {cart &&
                            <button className="orderCta" onClick={() => addToCart(data)}>ADD TO CART</button>}
                        <button className="orderGhost" onClick={() => navigate("/cart")}>Go to Cart →</button>
                    </div>
                </aside>
            </div>

            {/* ------------------------- Related ------------------------- */}
            {related.length > 0 &&
                <div className="relatedSection">
                    <h2>{relatedTitle}</h2>
                    <div className="relatedGrid">
                        {related.map((el) => (
                            <RestaurantCard key={el.id} item={el} to={`${relatedBasePath}/${el.id}`} />
                        ))}
                    </div>
                </div>
            }

            <div className="footerDiv">
                <Footer />
            </div>
        </>
    )
}
