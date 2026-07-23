import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "antd";
import { SearchOutlined, FrownOutlined } from "@ant-design/icons";
import axios from "../Data/api";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import { RestaurantCard } from "../Utils/Cards/RestaurantCard";
import { useCityState, setCity } from "../Utils/store";
import "./Search.css";

const SORTS = [
    { key: "relevance", label: "Relevance" },
    { key: "rating", label: "Rating: High to Low" },
    { key: "priceLow", label: "Cost: Low to High" },
    { key: "priceHigh", label: "Cost: High to Low" },
];

// Merge restaurants + the global search index into one deduped pool so a
// query matches "everything" — restaurant names, cuisines and localities.
const mergeSources = (a = [], b = []) => {
    const seen = new Set();
    return [...a, ...b].filter((el) => {
        const key = (el.name || "").toLowerCase() + "|" + (el.place || "");
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
};

export const SearchResults = () => {

    const [params, setParams] = useSearchParams();
    const query = params.get("q") || "";

    const [term, setTerm] = useState(query);
    const [pool, setPool] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState("relevance");
    const [cuisine, setCuisine] = useState("");

    // Shares the header's location so searching respects the city you picked.
    const city = useCityState();

    useEffect(() => { setTerm(query); }, [query]);
    useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [query]);

    useEffect(() => {
        setLoading(true);
        Promise.all([axios.get("/restaurants"), axios.get("/global")])
            .then(([r, g]) => setPool(mergeSources(r.data, g.data)))
            .finally(() => setLoading(false));
    }, []);

    // Unique cuisine + city chips derived from the data.
    const cuisines = useMemo(() => {
        const set = new Set();
        pool.forEach((el) =>
            (el.variety || "").split(",").forEach((c) => c.trim() && set.add(c.trim())));
        return [...set].sort().slice(0, 14);
    }, [pool]);

    const cities = useMemo(
        () => [...new Set(pool.map((el) => el.place).filter(Boolean))].sort(),
        [pool]
    );

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        let list = pool.filter((el) => {
            const hay = `${el.name} ${el.variety} ${el.place}`.toLowerCase();
            return (!q || hay.includes(q))
                && (!cuisine || (el.variety || "").toLowerCase().includes(cuisine.toLowerCase()))
                && (!city || el.place === city);
        });

        if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
        else if (sort === "priceLow") list = [...list].sort((a, b) => a.price - b.price);
        else if (sort === "priceHigh") list = [...list].sort((a, b) => b.price - a.price);
        return list;
    }, [pool, query, cuisine, city, sort]);

    const runSearch = (val) => {
        setParams(val.trim() ? { q: val.trim() } : {});
    };

    return (
        <>
            <Navbar />

            <div className="searchHero">
                <div className="searchHeroInner">
                    <h1>Search for restaurants, cuisines & dishes</h1>
                    <Input
                        size="large"
                        allowClear
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        onPressEnter={() => runSearch(term)}
                        prefix={<SearchOutlined style={{ color: "var(--brand-dark)", fontSize: 20 }} />}
                        placeholder="Try 'Pizza', 'Barista', 'North Indian' or 'Noida'"
                        className="searchHeroInput"
                    />
                </div>
            </div>

            <div className="searchWrap">

                {/* Cuisine quick-chips */}
                <div className="chipRow">
                    <button className={`chip ${!cuisine ? "on" : ""}`} onClick={() => setCuisine("")}>All</button>
                    {cuisines.map((c) => (
                        <button key={c} className={`chip ${cuisine === c ? "on" : ""}`}
                            onClick={() => setCuisine(cuisine === c ? "" : c)}>{c}</button>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="searchToolbar">
                    <p className="resultCount">
                        {loading ? "Searching…" :
                            <>
                                <b>{results.length}</b> result{results.length !== 1 ? "s" : ""}
                                {query && <> for “<b>{query}</b>”</>}
                            </>}
                    </p>

                    <div className="searchFilters">
                        <select value={city} onChange={(e) => setCity(e.target.value)}>
                            <option value="">All cities</option>
                            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <select value={sort} onChange={(e) => setSort(e.target.value)}>
                            {SORTS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                        </select>
                    </div>
                </div>

                {/* Results */}
                {!loading && results.length === 0 ? (
                    <div className="noResults">
                        <FrownOutlined />
                        <h2>No results found{query && <> for “{query}”</>}</h2>
                        <p>Try a different dish, cuisine or locality.</p>
                        <button onClick={() => { setParams({}); setCuisine(""); setCity(""); }}>
                            Clear search
                        </button>
                    </div>
                ) : (
                    <div className="searchGrid">
                        {results.map((el, i) => (
                            <RestaurantCard key={`${el.id}-${i}`} item={el} />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
};
