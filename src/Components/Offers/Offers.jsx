import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { CopyOutlined, CheckOutlined, ThunderboltFilled, TagFilled } from "@ant-design/icons";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import "./Offers.css";

const OFFERS = [
    { code: "WELCOME50", title: "50% OFF up to ₹100", sub: "On your first order", color: "#ff5a5f", bank: "New users only" },
    { code: "ZOMATO60", title: "60% OFF up to ₹120", sub: "On orders above ₹199", color: "#7b2ff7", bank: "All users" },
    { code: "HDFC15", title: "Flat 15% OFF", sub: "Up to ₹150 on HDFC cards", color: "#0f9d58", bank: "HDFC Bank" },
    { code: "FEAST40", title: "40% OFF up to ₹80", sub: "On orders above ₹149", color: "#f4820a", bank: "Weekends only" },
    { code: "ICICI20", title: "Flat 20% OFF", sub: "Up to ₹200 on ICICI cards", color: "#1a73e8", bank: "ICICI Bank" },
    { code: "GOLD1", title: "Free delivery", sub: "On all orders with Zomato Gold", color: "#c48f00", bank: "Gold members" },
];

const BANNERS = [
    { title: "Zomato Gold", desc: "Free delivery & exclusive discounts at 15,000+ restaurants", cta: "Join now", bg: "linear-gradient(135deg,#3a2c00,#8a6d00)" },
    { title: "Eat healthy this week", desc: "Get 30% off on salads, bowls & smoothies", cta: "Order now", bg: "linear-gradient(135deg,#0b6e4f,#2fb380)" },
    { title: "Late night cravings?", desc: "Restaurants open till 2 AM near you", cta: "Explore", bg: "linear-gradient(135deg,#1e2a78,#5568d3)" },
];

export const Offers = () => {

    const [copied, setCopied] = useState("");
    const navigate = useNavigate();

    useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

    const copy = (code) => {
        navigator.clipboard?.writeText(code);
        setCopied(code);
        message.success(`Code ${code} copied!`);
        setTimeout(() => setCopied(""), 1800);
    };

    return (
        <>
            <Navbar />

            <div className="offersHero">
                <div className="offersHeroInner">
                    <ThunderboltFilled className="offersBolt" />
                    <h1>Offers & Deals</h1>
                    <p>Save big on every order with the best coupons and bank discounts.</p>
                </div>
            </div>

            <div className="offersWrap">

                <div className="offerBanners">
                    {BANNERS.map((b) => (
                        <div className="offerBanner" key={b.title} style={{ background: b.bg }}>
                            <h3>{b.title}</h3>
                            <p>{b.desc}</p>
                            <button onClick={() => navigate("/delivery")}>{b.cta}</button>
                        </div>
                    ))}
                </div>

                <h2 className="offersSectionTitle"><TagFilled /> Coupons for you</h2>

                <div className="offerGrid">
                    {OFFERS.map((o) => (
                        <div className="offerCard" key={o.code}>
                            <div className="offerStub" style={{ background: o.color }}>
                                <span>{o.code.slice(0, 5)}</span>
                            </div>
                            <div className="offerInfo">
                                <h3>{o.title}</h3>
                                <p>{o.sub}</p>
                                <span className="offerBank">{o.bank}</span>
                            </div>
                            <button
                                className={`offerCopy ${copied === o.code ? "done" : ""}`}
                                onClick={() => copy(o.code)}
                            >
                                {copied === o.code ? <CheckOutlined /> : <CopyOutlined />}
                                <span>{copied === o.code ? "Copied" : o.code}</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
};
