import { Select, Badge, Dropdown, Avatar } from 'antd';
import {
    EnvironmentOutlined, SearchOutlined, HeartOutlined,
    ShoppingCartOutlined, TagOutlined, UserOutlined,
} from '@ant-design/icons';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../Data/api';
import { LOCATIONS, ALL_LOCATIONS_LABEL } from '../Data/locations';
import { useCityState, setCity, useCart, useFavorites, useUser } from '../Utils/store';
import PopUp from '../Authentication/PopUp';
import { ProfileMenu } from './ProfileMenu';
import './Navbar.css';

const ACTIONS = [
    { key: 'offers', label: 'Offers', to: '/offers', icon: <TagOutlined /> },
    { key: 'favorites', label: 'Favourites', to: '/favorites', icon: <HeartOutlined /> },
    { key: 'cart', label: 'Cart', to: '/cart', icon: <ShoppingCartOutlined /> },
];

// Inner-page header. The location and the search dropdown are both driven by
// React state now — the old version wrote `display: none` onto `.popDiv` with
// querySelector, so the suggestions never closed on blur or Escape and the
// chosen city didn't survive navigating to another page.
export const ZomatoNav = () => {

    const navigate = useNavigate();

    const city = useCityState();
    const { count: cartCount } = useCart();
    const favs = useFavorites();
    const user = useUser();

    const [pool, setPool] = useState([]);
    const [term, setTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(-1);

    const [authOpen, setAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const [menuOpen, setMenuOpen] = useState(false);

    const searchRef = useRef(null);

    useEffect(() => {
        axios.get('/global').then((res) => setPool(res.data || []));
    }, []);

    // Close the suggestions when the click lands anywhere outside the box.
    useEffect(() => {
        const onDown = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', onDown);
        return () => document.removeEventListener('mousedown', onDown);
    }, []);

    const suggestions = useMemo(() => {
        const q = term.trim().toLowerCase();
        if (!q) return [];
        return pool
            .filter((el) => {
                const hay = `${el.name} ${el.variety || ''} ${el.place || ''}`.toLowerCase();
                return hay.includes(q) && (!city || el.place === city);
            })
            .slice(0, 7);
    }, [term, pool, city]);

    const openAuth = (mode) => { setAuthMode(mode); setAuthOpen(true); };

    const goToSearch = (value = term) => {
        setOpen(false);
        navigate(value.trim() ? `/search?q=${encodeURIComponent(value.trim())}` : '/search');
    };

    const goToItem = (item) => {
        setOpen(false);
        setTerm('');
        navigate(`/search-details/${item.id}`, { state: { item } });
    };

    const onKeyDown = (e) => {
        if (!open || !suggestions.length) {
            if (e.key === 'Enter') goToSearch();
            return;
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive((i) => (i + 1) % suggestions.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
        } else if (e.key === 'Enter') {
            if (active >= 0) goToItem(suggestions[active]);
            else goToSearch();
        } else if (e.key === 'Escape') {
            setOpen(false);
        }
    };

    return (

        <>
        <div className="nav">

            <span className="icon" onClick={() => navigate('/')}>
                <img src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png" alt="Zomato" />
            </span>

            <div className="search" ref={searchRef}>

                <EnvironmentOutlined id="locIcon" />

                <Select
                    className="citySelect"
                    variant="borderless"
                    showSearch
                    allowClear
                    optionFilterProp="label"
                    value={city || undefined}
                    placeholder={ALL_LOCATIONS_LABEL}
                    style={{ minWidth: 150 }}
                    onChange={(value) => setCity(value || '')}
                    options={LOCATIONS.map((l) => ({
                        value: l.value,
                        label: l.label,
                        title: `${l.label} · ${l.count} places`,
                    }))}
                />

                <div className="navDivider" />

                <SearchOutlined id="sIcon" />

                <input
                    id="searchFood"
                    value={term}
                    placeholder="Search for restaurant, cuisine or a dish"
                    onChange={(e) => { setTerm(e.target.value); setOpen(true); setActive(-1); }}
                    onFocus={() => setOpen(true)}
                    onKeyDown={onKeyDown}
                />

                {open && term.trim() !== '' &&
                    <div className="popDiv">
                        {suggestions.length ? (
                            <>
                                {suggestions.map((el, i) => (
                                    <div
                                        className={`searchBox ${i === active ? 'active' : ''}`}
                                        key={el.id}
                                        onMouseEnter={() => setActive(i)}
                                        onClick={() => goToItem(el)}
                                    >
                                        <img src={el.imgUrl} alt={el.name} />
                                        <div className="searchBoxText">
                                            <p>{el.name}</p>
                                            <span>{el.variety}</span>
                                        </div>
                                        <span className="searchBoxPlace">{el.place}</span>
                                    </div>
                                ))}
                                <div className="searchAll" onClick={() => goToSearch()}>
                                    See all results for “{term.trim()}” →
                                </div>
                            </>
                        ) : (
                            <div className="searchEmpty">
                                No matches for “{term.trim()}”{city && <> in {city}</>}.
                                <span onClick={() => goToSearch()}>Search everywhere →</span>
                            </div>
                        )}
                    </div>}
            </div>

            <div className="auth">
                {/* One markup shape for all three so they read as one set of
                    buttons — the badge sits on the icon, not around the label. */}
                {ACTIONS.map((a) => {
                    const count = a.key === 'favorites' ? favs.length : a.key === 'cart' ? cartCount : 0;
                    return (
                        <button key={a.key} className="navAction" onClick={() => navigate(a.to)}>
                            <Badge count={count} size="small" color="#cb202d" offset={[2, 0]}>
                                {a.icon}
                            </Badge>
                            <span>{a.label}</span>
                        </button>
                    );
                })}

                <Dropdown
                    open={menuOpen}
                    onOpenChange={setMenuOpen}
                    placement="bottomRight"
                    trigger={['click']}
                    classNames={{ root: 'profileDrop' }}
                    popupRender={() => (
                        <ProfileMenu
                            onNavigate={() => setMenuOpen(false)}
                            onLogin={() => openAuth('login')}
                            onSignup={() => openAuth('signup')}
                        />
                    )}
                >
                    <span className={`navUser ${menuOpen ? 'on' : ''}`}>
                        <Avatar
                            size={34}
                            src={user?.photoURL}
                            icon={<UserOutlined />}
                            style={{ background: 'var(--brand-dark)' }}
                        />
                        <span className="navUserName">{user ? (user.name || 'Account') : 'Log in'}</span>
                    </span>
                </Dropdown>
            </div>

        </div>

        <PopUp
            open={authOpen}
            checkauth={authMode}
            handleClose={() => setAuthOpen(false)}
        />

        </>
    );
};
