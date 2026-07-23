import { useEffect, useMemo, useRef, useState } from 'react';
import { Select } from 'antd';
import { SearchOutlined, EnvironmentOutlined, StarFilled, ThunderboltFilled, ShopOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Collections } from './Collection';
import './Home.css';
import { LandingPage } from './Landing';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import { RestaurantCard } from '../Utils/Cards/RestaurantCard';
import { CATEGORY_RAIL } from '../Utils/Listing/categories';
import { LOCATIONS, ALL_LOCATIONS_LABEL, TOTAL_PLACES } from '../Data/locations';
import { useCityState, setCity } from '../Utils/store';
import axios from '../Data/api';

export const Home = () => {

    const navigate = useNavigate();
    const city = useCityState();

    const [term, setTerm] = useState('');
    const [pool, setPool] = useState([]);
    const [open, setOpen] = useState(false);
    const boxRef = useRef(null);

    useEffect(() => {
        axios.get('/restaurants').then((res) => setPool(res.data || []));
    }, []);

    useEffect(() => {
        const onDown = (e) => {
            if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', onDown);
        return () => document.removeEventListener('mousedown', onDown);
    }, []);

    const inCity = useMemo(
        () => (city ? pool.filter((el) => el.place === city) : pool),
        [pool, city]
    );

    const popular = useMemo(
        () => [...inCity].sort((a, b) => b.rating - a.rating).slice(0, 8),
        [inCity]
    );

    // Live suggestions right in the hero, so the front page search does
    // something before you even hit Enter.
    const suggestions = useMemo(() => {
        const q = term.trim().toLowerCase();
        if (!q) return [];
        return inCity
            .filter((el) => `${el.name} ${el.variety} ${el.place}`.toLowerCase().includes(q))
            .slice(0, 6);
    }, [term, inCity]);

    const search = () => navigate(term.trim() ? `/search?q=${encodeURIComponent(term.trim())}` : '/search');

    return (

        <>

        <Navbar />

        <div className="hero">
            <div className="heroOverlay">
                <div className="heroLogo">
                    <img src="https://b.zmtcdn.com/web_assets/8313a97515fcb0447d2d77c276532a511583262271.png" alt="Zomato" />
                </div>

                <h1 className="heroTagline">
                    Discover the best food &amp; drinks in {city || ALL_LOCATIONS_LABEL}
                </h1>

                <div className="heroSearch" ref={boxRef}>
                    <div className="heroSearchLocation">
                        <EnvironmentOutlined className="heroLocIcon" />
                        <Select
                            variant="borderless"
                            showSearch
                            allowClear
                            optionFilterProp="label"
                            value={city || undefined}
                            placeholder={ALL_LOCATIONS_LABEL}
                            style={{ minWidth: 140 }}
                            onChange={(value) => setCity(value || '')}
                            options={LOCATIONS.map((l) => ({ value: l.value, label: l.label }))}
                        />
                    </div>

                    <div className="heroSearchDivider" />

                    <SearchOutlined className="heroSearchIcon" />
                    <input
                        className="heroSearchInput"
                        value={term}
                        onChange={(e) => { setTerm(e.target.value); setOpen(true); }}
                        onFocus={() => setOpen(true)}
                        onKeyDown={(e) => e.key === 'Enter' && search()}
                        placeholder="Search for restaurant, cuisine or a dish"
                    />

                    <button className="heroSearchBtn" onClick={search}>Search</button>

                    {open && suggestions.length > 0 &&
                        <div className="heroSuggest">
                            {suggestions.map((el) => (
                                <div
                                    key={el.id}
                                    onClick={() => navigate(`/search-details/${el.id}`, { state: { item: el } })}
                                >
                                    <img src={el.imgUrl} alt={el.name} />
                                    <div>
                                        <p>{el.name}</p>
                                        <span>{el.variety}</span>
                                    </div>
                                    <b>{el.rating} <StarFilled /></b>
                                </div>
                            ))}
                        </div>}
                </div>

                <div className="heroStats">
                    <span><ShopOutlined /> {TOTAL_PLACES}+ places</span>
                    <span><ThunderboltFilled /> Delivery in 30 min</span>
                    <span><StarFilled /> Rated by real diners</span>
                </div>
            </div>
        </div>

        <div className="homeContent">

            <LandingPage />

            {/* -------- Quick order band -------- */}
            <div className="quickBand">
                <h2>Inspiration for your first order</h2>
                <div className="quickRow">
                    {CATEGORY_RAIL.filter((q) => q.label !== 'All').map((q) => (
                        <div className="quickItem" key={q.label} onClick={() => navigate(q.to)}>
                            <div className="quickImg"><img src={q.img} alt={q.label} /></div>
                            <p>{q.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* -------- Popular restaurants -------- */}
            <div className="popularSection">
                <div className="sectionHead">
                    <h2>Popular restaurants {city ? `in ${city}` : 'near you'}</h2>
                    <button onClick={() => navigate('/dinning')}>See all →</button>
                </div>
                <div className="popularGrid">
                    {popular.map((el) => (
                        <RestaurantCard key={el.id} item={el} to={`/dinning/${el.id}`} />
                    ))}
                </div>
            </div>

            <Collections />
        </div>

        <Footer />

        </>
    );
};
