import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import {
    CopyOutlined, CheckOutlined, ThunderboltFilled, TagFilled, CheckCircleFilled,
} from "@ant-design/icons";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import { COUPONS } from "../Data/offers";
import { applyCoupon, useCoupon, useCart, couponDiscount } from "../Utils/store";
import "./Offers.css";

const BANNERS = [
    {
        title: "Zomato Gold",
        desc: "Free delivery and exclusive discounts at 15,000+ restaurants",
        cta: "Explore restaurants", to: "/dinning",
        bg: "linear-gradient(135deg,#3a2c00,#8a6d00)",
    },
    {
        title: "Eat healthy this week",
        desc: "30% off on salads, bowls and smoothies with FEAST40",
        cta: "Order now", to: "/delivery/shake",
        bg: "linear-gradient(135deg,#0b6e4f,#2fb380)",
    },
    {
        title: "Late night cravings?",
        desc: "Rooftops and lounges open past midnight near you",
        cta: "See nightlife", to: "/nightlife",
        bg: "linear-gradient(135deg,#1e2a78,#5568d3)",
    },
];

// Coupons are no longer decorative — "Apply" writes the code to the shared
// store, so the cart and checkout immediately price the discount.
export const Offers = () => {

    const navigate = useNavigate();
    const active = useCoupon();
    const { subtotal } = useCart();
    const [copied, setCopied] = useState("");

    useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

    const copy = (code) => {
        navigator.clipboard?.writeText(code);
        setCopied(code);
        message.success(`Code ${code} copied`);
        setTimeout(() => setCopied(""), 1800);
    };

    const use = (coupon) => {
        applyCoupon(coupon);
        const { value } = couponDiscount(coupon, subtotal);
        message.success(
            subtotal > 0 && value > 0
                ? `${coupon.code} applied — you save ₹${value}`
                : `${coupon.code} applied. It'll kick in at checkout.`
        );
        navigate("/cart");
    };

    return (
        <>
            <Navbar solid />

            <div className="offersHero">
                <div className="offersHeroInner">
                    <ThunderboltFilled className="offersBolt" />
                    <h1>Offers &amp; Deals</h1>
                    <p>Save on every order with coupons that actually apply at checkout.</p>
                    {active &&
                        <span className="offersActive">
                            <CheckCircleFilled /> {active.code} is applied to your cart
                        </span>}
                </div>
            </div>

            <div className="offersWrap">

                <div className="offerBanners">
                    {BANNERS.map((b) => (
                        <div className="offerBanner" key={b.title} style={{ background: b.bg }}>
                            <h3>{b.title}</h3>
                            <p>{b.desc}</p>
                            <button onClick={() => navigate(b.to)}>{b.cta}</button>
                        </div>
                    ))}
                </div>

                <h2 className="offersSectionTitle"><TagFilled /> Coupons for you</h2>

                <div className="offerGrid">
                    {COUPONS.map((o) => {
                        const on = active?.code === o.code;
                        return (
                            <div className={`offerCard ${on ? "on" : ""}`} key={o.code}>
                                <div className="offerStub" style={{ background: o.color }}>
                                    <span>{o.code.slice(0, 5)}</span>
                                </div>

                                <div className="offerInfo">
                                    <h3>{o.title}</h3>
                                    <p>{o.sub}</p>
                                    <span className="offerBank">{o.tag}</span>
                                </div>

                                <div className="offerActions">
                                    <button
                                        className={`offerApply ${on ? "done" : ""}`}
                                        onClick={() => use(o)}
                                        disabled={on}
                                    >
                                        {on ? <><CheckOutlined /> Applied</> : "Apply"}
                                    </button>

                                    <button className="offerCopy" onClick={() => copy(o.code)}>
                                        {copied === o.code ? <CheckOutlined /> : <CopyOutlined />}
                                        <span>{copied === o.code ? "Copied" : o.code}</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <Footer />
        </>
    );
};
