import { Input } from 'antd';
import { SearchOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Collections } from './Collection';
import './Home.css';
import { LandingPage } from './Landing';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';

export const Home = () => {

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
                        prefix={<SearchOutlined style={{ color: '#9c9c9c' }} />}
                        placeholder="Search for restaurant, cuisine or a dish"
                    />
                </div>
            </div>
        </div>

        <div className="homeContent">
            <LandingPage />
            <Collections />
        </div>

        <Footer />

        </>
    );
};
