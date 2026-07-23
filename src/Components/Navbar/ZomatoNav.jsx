import { Select, Input } from 'antd';
import { EnvironmentOutlined, SearchOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../Data/api';
import './Navbar.css';
import PopUp from '../Authentication/PopUp';

export const ZomatoNav = ({ HandleCities, city }) => {

    const [searchData, setSearchData] = useState([]);
    const [filterData, setFilterData] = useState([]);

    const [checkauth, setCheckAuth] = useState('');
    const [open, setOpen] = useState(false);
    const [term, setTerm] = useState('');

    const handleOpen = (value) => {
        setOpen(true);
        setCheckAuth(value);
    };
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();
    useEffect(() => { GetSearchData(); }, []);

    const HandlePopDiv = (value) => {
        setTerm(value);
        const popDiv = document.querySelector('.popDiv');
        if (popDiv) popDiv.style.display = value === '' ? 'none' : 'block';

        const searchFiltered = searchData.filter((el) =>
            `${el.name} ${el.variety || ''} ${el.place || ''}`.toLowerCase()
                .includes(value.toLowerCase()));
        setFilterData([...searchFiltered.slice(0, 8)]);
    };

    const goToSearch = () => {
        const popDiv = document.querySelector('.popDiv');
        if (popDiv) popDiv.style.display = 'none';
        navigate(term.trim() ? `/search?q=${encodeURIComponent(term.trim())}` : '/search');
    };

    const GetSearchData = () => {
        axios.get('/global').then((res) => setSearchData(res.data));
    };

    return (

        <>
        <div className="nav">

            <a href="/" className="icon">
                <img src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png" alt="Zomato" />
            </a>

            <div className="search">
                <EnvironmentOutlined id="locIcon" />

                <Select
                    className="citySelect"
                    variant="borderless"
                    value={city || undefined}
                    placeholder="Delhi NCR"
                    style={{ minWidth: 130 }}
                    onChange={(value) => HandleCities && HandleCities(value)}
                    options={[
                        { value: '', label: 'None' },
                        { value: 'Ghaziabad', label: 'Ghaziabad' },
                        { value: 'New Delhi', label: 'New Delhi' },
                        { value: 'Gurgaon', label: 'Gurgaon' },
                        { value: 'Noida', label: 'Noida' },
                    ]}
                />

                <div className="or">|</div>

                <Input
                    variant="borderless"
                    id="searchFood"
                    prefix={<SearchOutlined id="sIcon" />}
                    placeholder="Search for restaurant, cuisine or a dish"
                    onChange={(e) => HandlePopDiv(e.target.value)}
                    onPressEnter={goToSearch}
                />
            </div>

            <div className="auth">
                <p onClick={() => navigate('/offers')}>Offers</p>
                <p onClick={() => navigate('/favorites')}>Favourites</p>
                <p onClick={() => navigate('/cart')}>Cart</p>
                <p onClick={() => handleOpen('login')}>Login</p>
            </div>

        </div>

        {/* ------------------------------ Search POP-UP Div ---------------------------------------  */}

        <div className="popDiv">
            {filterData.map((el) => (
                <div id="searchBox" key={el.id} onClick={() => navigate(`/search-details/${el.id}`)}>
                    <img src={el.imgUrl} alt={el.name} />
                    <p>{el.name}</p>
                </div>
            ))}
        </div>

        <PopUp handleClose={handleClose} handleOpen={handleOpen} open={open} checkauth={checkauth} />

        </>
    );
};
