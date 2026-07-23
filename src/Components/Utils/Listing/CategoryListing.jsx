import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    SearchOutlined, StarFilled, ThunderboltFilled, EnvironmentOutlined,
    ClockCircleOutlined, FrownOutlined, FireFilled,
} from "@ant-design/icons";
import axios from "../../Data/api";
import { ZomatoNav } from "../../Navbar/ZomatoNav";
import { TabsNav } from "../../Navbar/TabsNav";
import { Footer } from "../../Footer/Footer";
import { RestaurantCard } from "../Cards/RestaurantCard";
import { CATEGORY_RAIL } from "./categories";
import { useCityState, setCity } from "../store";
import "./CategoryListing.css";

// One shared, full-width listing page behind every inner "browse" route
// (Delivery, each cuisine, Dining Out, Nightlife). Every page used to repeat
// ~140 lines of the same fetch + sort code around a narrow 1100px grid; this
// replaces all of them with a hero, live stats, quick filters and a spotlight
// rail so the layout actually uses the width of the screen.

const SORTS = [
    { key: "popular", label: "Popularity" },
    { key: "rating", label: "Rating" },
    { key: "priceLow", label: "Cost: Low to High" },
    { key: "priceHigh", label: "Cost: High to Low" },
    { key: "fast", label: "Delivery Time" },
];

// Same deterministic pseudo-ETA the cards use, so numbers agree everywhere.
const etaOf = (item) => 20 + ((Number(item.id) || 0) * 7) % 25;

export const CategoryListing = ({
    endpoint,
    basePath,
    title,
    subtitle,
    crumb = "Delivery",
    crumbTo = "/delivery",
    heroFallback,
    railKey,
    showRail = false,
    spotlightTitle = "Top rated this week",
    children,
}) => {

    const navigate = useNavigate();

    const [raw, setRaw] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState("popular");
    const [term, setTerm] = useState("");
    const [tags, setTags] = useState([]);

    // The location lives in the shared store, so the header picker and these
    // area chips are the same control and the choice survives navigation.
    const city = useCityState();

    useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [endpoint]);

    useEffect(() => {
        setLoading(true);
        setTerm(""); setTags([]); setSort("popular");
        axios.get(endpoint)
            .then((res) => setRaw(res.data || []))
            .finally(() => setLoading(false));
    }, [endpoint]);

    const cities = useMemo(
        () => [...new Set(raw.map((el) => el.place).filter(Boolean))].sort(),
        [raw]
    );

    // Everything below the header counts the same set the grid shows, so the
    // hero stats can't claim "24 places" while the grid renders three.
    const inCity = useMemo(
        () => (city ? raw.filter((el) => el.place === city) : raw),
        [raw, city]
    );

    // Median cost splits the list into "pocket friendly" and the rest without
    // hard-coding a rupee threshold that only suits one category.
    const medianPrice = useMemo(() => {
        const p = inCity.map((el) => Number(el.price) || 0).sort((a, b) => a - b);
        return p.length ? p[Math.floor(p.length / 2)] : 0;
    }, [inCity]);

    const stats = useMemo(() => {
        if (!inCity.length) return null;
        const ratings = inCity.map((el) => Number(el.rating) || 0);
        const prices = inCity.map((el) => Number(el.price) || 0);
        return {
            count: inCity.length,
            rating: (ratings.reduce((a, b) => a + b, 0) / inCity.length).toFixed(1),
            price: Math.round(prices.reduce((a, b) => a + b, 0) / inCity.length),
            eta: Math.min(...inCity.map(etaOf)),
        };
    }, [inCity]);

    const spotlight = useMemo(
        () => [...inCity].sort((a, b) => b.rating - a.rating).slice(0, 3),
        [inCity]
    );

    const heroImg = spotlight[0]?.imgUrl || heroFallback;

    const TAGS = [
        { key: "rating4", label: <><StarFilled /> Rating 4.0+</>, test: (el) => Number(el.rating) >= 4 },
        { key: "fast", label: <><ThunderboltFilled /> Fast delivery</>, test: (el) => etaOf(el) <= 30 },
        { key: "cheap", label: <>₹ Pocket friendly</>, test: (el) => (Number(el.price) || 0) <= medianPrice },
    ];

    const toggleTag = (key) =>
        setTags((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);

    const results = useMemo(() => {
        const q = term.trim().toLowerCase();
        let list = inCity.filter((el) => {
            const hay = `${el.name} ${el.variety} ${el.place}`.toLowerCase();
            return (!q || hay.includes(q))
                && tags.every((k) => TAGS.find((t) => t.key === k)?.test(el));
        });

        if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
        else if (sort === "priceLow") list = [...list].sort((a, b) => a.price - b.price);
        else if (sort === "priceHigh") list = [...list].sort((a, b) => b.price - a.price);
        else if (sort === "fast") list = [...list].sort((a, b) => etaOf(a) - etaOf(b));
        return list;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inCity, term, tags, sort, medianPrice]);

    const clearAll = () => { setCity(""); setTags([]); setTerm(""); };
    const linkFor = (el) => `${basePath}/${el.id}`;

    return (
        <>
            <ZomatoNav />
            <TabsNav />

            {/* ------------------------------ Hero ------------------------------ */}
            <section className="lsHero">
                <div className="lsHeroBg" style={{ backgroundImage: `url(${heroImg})` }} />
                <div className="lsHeroTint" />

                <div className="lsHeroInner">

                    <div className="lsHeroText">
                        <nav className="lsCrumb">
                            <span onClick={() => navigate("/")}>Home</span>
                            <i>/</i>
                            <span onClick={() => navigate(crumbTo)}>{crumb}</span>
                            <i>/</i>
                            <b>{title}</b>
                        </nav>

                        <h1>{title}</h1>
                        <p className="lsHeroSub">{subtitle}</p>

                        {stats &&
                            <div className="lsStats">
                                <div><b>{stats.count}</b><span>places</span></div>
                                <div><b>{stats.rating} <StarFilled /></b><span>avg rating</span></div>
                                <div><b>₹{stats.price}</b><span>avg for one</span></div>
                                <div><b>{stats.eta} min</b><span>fastest</span></div>
                            </div>}

                        <div className="lsHeroSearch">
                            <SearchOutlined />
                            <input
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                                placeholder={`Search inside ${title} — name, cuisine or area`}
                            />
                            {term && <button onClick={() => setTerm("")}>Clear</button>}
                        </div>
                    </div>

                    {/* Fanned photo collage — fills the space the old page wasted */}
                    <div className="lsHeroCollage" aria-hidden="true">
                        {spotlight.map((el, i) => (
                            <figure className={`lsTile t${i}`} key={el.id}>
                                <img src={el.imgUrl} alt="" loading="lazy" />
                                <figcaption>
                                    <span className="lsTileName">{el.name}</span>
                                    <span className="lsTileRate">{el.rating} <StarFilled /></span>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------------------- Cuisine rail ---------------------------- */}
            {showRail &&
                <div className="lsRailWrap">
                    <div className="lsRail">
                        {CATEGORY_RAIL.map((c) => (
                            <button
                                key={c.label}
                                className={`lsRailItem ${railKey === c.label ? "on" : ""}`}
                                onClick={() => navigate(c.to)}
                            >
                                <span className="lsRailImg"><img src={c.img} alt={c.label} /></span>
                                <span>{c.label}</span>
                            </button>
                        ))}
                    </div>
                </div>}

            {/* ------------------------------ Spotlight ------------------------------ */}
            {!loading && spotlight.length > 0 &&
                <section className="lsSpotlight">
                    <h2><FireFilled /> {spotlightTitle}</h2>
                    <div className="lsSpotRow">
                        {spotlight.map((el, i) => (
                            <div className="lsSpot" key={el.id} onClick={() => navigate(linkFor(el))}>
                                <span className="lsSpotRank">#{i + 1}</span>
                                <img src={el.imgUrl} alt={el.name} loading="lazy" />
                                <div className="lsSpotInfo">
                                    <h3>{el.name}</h3>
                                    <p>{el.variety}</p>
                                    <div className="lsSpotMeta">
                                        <span className="lsPill green">{el.rating} <StarFilled /></span>
                                        <span><ClockCircleOutlined /> {etaOf(el)} min</span>
                                        <span><EnvironmentOutlined /> {el.place}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>}

            {/* ------------------------------ Toolbar ------------------------------ */}
            <div className="lsToolbar">
                <div className="lsToolbarInner">

                    <div className="lsFilters">
                        {TAGS.map((t) => (
                            <button
                                key={t.key}
                                className={`lsChip ${tags.includes(t.key) ? "on" : ""}`}
                                onClick={() => toggleTag(t.key)}
                            >{t.label}</button>
                        ))}

                        <span className="lsDivider" />

                        <button className={`lsChip ${!city ? "on" : ""}`} onClick={() => setCity("")}>
                            All areas
                        </button>
                        {cities.map((c) => (
                            <button
                                key={c}
                                className={`lsChip ${city === c ? "on" : ""}`}
                                onClick={() => setCity(city === c ? "" : c)}
                            >{c}</button>
                        ))}
                    </div>

                    <div className="lsSortWrap">
                        <label htmlFor="lsSort">Sort by</label>
                        <select id="lsSort" value={sort} onChange={(e) => setSort(e.target.value)}>
                            {SORTS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* ------------------------------ Results ------------------------------ */}
            <section className="lsBody">

                <div className="lsCount">
                    {loading
                        ? "Finding the best places near you…"
                        : <><b>{results.length}</b> place{results.length !== 1 ? "s" : ""} found
                            {city && <> in <b>{city}</b></>}</>}
                    {(city || tags.length || term) && !loading &&
                        <button className="lsClear" onClick={clearAll}>Reset filters</button>}
                </div>

                {loading ?
                    <div className="lsGrid">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div className="lsSkeleton" key={i}>
                                <div className="lsSkImg" />
                                <div className="lsSkLine w70" />
                                <div className="lsSkLine w45" />
                                <div className="lsSkLine w90" />
                            </div>
                        ))}
                    </div>

                    : results.length ?
                        <div className="lsGrid">
                            {results.map((el) => (
                                <RestaurantCard key={el.id} item={el} to={linkFor(el)} />
                            ))}
                        </div>

                        :
                        <div className="lsEmpty">
                            <FrownOutlined />
                            <h3>Nothing matched those filters</h3>
                            <p>Try a different area, or loosen the filters a little.</p>
                            <button onClick={clearAll}>Reset filters</button>
                        </div>}

                {children}
            </section>

            <div className="footerDiv">
                <Footer />
            </div>
        </>
    );
};
