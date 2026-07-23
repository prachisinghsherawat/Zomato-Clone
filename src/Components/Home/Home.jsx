import { useEffect, useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Collections } from './Collection';
import './Home.css';
import { LandingPage } from './Landing';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import { RestaurantCard } from '../Utils/Cards/RestaurantCard';
import axios from '../Data/api';

const QUICK = [
    { label: 'Pizza', img: 'https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png', to: '/delivery/pizza' },
    { label: 'Burger', img: 'https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png', to: '/delivery/burger' },
    { label: 'Coffee', img: 'https://b.zmtcdn.com/data/images/cuisines/unlabelled_v2_1/1040.jpg', to: '/delivery/coffee' },
    { label: 'Cake', img: 'https://b.zmtcdn.com/data/dish_photos/b24/163ec0c041094f6e4f1efc81cf32bb24.png', to: '/delivery/cake' },
    { label: 'Chaat', img: 'https://b.zmtcdn.com/data/dish_images/1437bc204cb5c892cb22d78b4347f4651634827140.png', to: '/delivery/chaat' },
    { label: 'Ice Cream', img: 'https://b.zmtcdn.com/data/pictures/chains/4/18949234/d60d487c5c887ce9b7da458c0253389d_o2_featured_v2.jpg', to: '/delivery/ice-cream' },
    { label: 'Shake', img: 'https://b.zmtcdn.com/data/dish_images/8187d3223ac2cc42cc24f723c92877511634805403.png', to: '/delivery/shake' },
];

export const Home = () => {

    const navigate = useNavigate();
    const [term, setTerm] = useState('');
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        axios.get('/restaurants').then((res) =>
            setPopular([...(res.data || [])].sort((a, b) => b.rating - a.rating).slice(0, 8)));
    }, []);

    const search = () => navigate(term.trim() ? `/search?q=${encodeURIComponent(term.trim())}` : '/search');

    return (

        <>

        <Navbar />

        <div className="hero">
            <div className="heroOverlay">
                <div className="heroLogo">
                    <img src="https://b.zmtcdn.com/web_assets/8313a97515fcb0447d2d77c276532a511583262271.png" alt="Zomato" />
                </div>

                <h1 className="heroTagline">Discover the best food &amp; drinks in Delhi NCR</h1>

                <div className="heroSearch">
                    <div className="heroSearchLocation">
                        <EnvironmentOutlined className="heroLocIcon" />
                        <span>Delhi NCR</span>
                    </div>
                    <div className="heroSearchDivider" />
                    <Input
                        variant="borderless"
                        size="large"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        onPressEnter={search}
                        prefix={<SearchOutlined style={{ color: '#9c9c9c' }} />}
                        placeholder="Search for restaurant, cuisine or a dish"
                    />
                    <button className="heroSearchBtn" onClick={search}>Search</button>
                </div>
            </div>
        </div>

        <div className="homeContent">

            <LandingPage />

            {/* -------- Quick order band -------- */}
            <div className="quickBand">
                <h2>Inspiration for your first order</h2>
                <div className="quickRow">
                    {QUICK.map((q) => (
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
                    <h2>Popular restaurants near you</h2>
                    <button onClick={() => navigate('/search')}>See all →</button>
                </div>
                <div className="popularGrid">
                    {popular.map((el) => (
                        <RestaurantCard key={el.id} item={el} />
                    ))}
                </div>
            </div>

            <Collections />
        </div>

        <Footer />

        </>
    );
};
