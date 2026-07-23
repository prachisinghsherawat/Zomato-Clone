import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import {
    CreditCardOutlined, MobileOutlined, WalletOutlined,
    LockFilled, EnvironmentOutlined, ClockCircleOutlined,
} from '@ant-design/icons';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import { useCart, useCoupon, couponDiscount, placeOrder, useUser } from '../Utils/store';
import { buildBill } from '../Data/offers';
import './Payment.css';

const METHODS = [
    { key: 'card', label: 'Card', icon: <CreditCardOutlined /> },
    { key: 'upi', label: 'UPI', icon: <MobileOutlined /> },
    { key: 'cod', label: 'Cash on delivery', icon: <WalletOutlined /> },
];

const onlyDigits = (value) => value.replace(/\D/g, '');

// Checkout. The amount is derived from the live cart and the applied coupon
// rather than a `total` string parked in localStorage — that key was written
// once and then read back even if the cart had changed, so the page could
// happily charge you for an order you no longer had.
export function PaymentPage() {

    const navigate = useNavigate();
    const { items, count, subtotal } = useCart();
    const coupon = useCoupon();
    const user = useUser();

    const [method, setMethod] = useState('card');
    const [address, setAddress] = useState({ line: '', pin: '', phone: '' });
    const [card, setCard] = useState({ name: '', number: '', expiry: '', cvv: '' });
    const [upi, setUpi] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

    // Nothing to pay for — send people back rather than showing "Rs. null".
    useEffect(() => {
        if (!items.length) navigate('/cart', { replace: true });
    }, [items.length, navigate]);

    const { value: discount } = couponDiscount(coupon, subtotal);
    const bill = buildBill(subtotal, discount);

    const validate = () => {
        const next = {};

        if (address.line.trim().length < 8) next.line = 'Enter a full delivery address.';
        if (address.pin.length !== 6) next.pin = 'PIN code must be 6 digits.';
        if (address.phone.length !== 10) next.phone = 'Enter a 10-digit mobile number.';

        if (method === 'card') {
            if (card.name.trim().length < 3) next.name = 'Enter the name printed on the card.';
            if (card.number.length !== 16) next.number = 'Card number must be 16 digits.';
            if (!/^\d{2}\/\d{2}$/.test(card.expiry)) next.expiry = 'Use MM/YY.';
            else {
                const [mm, yy] = card.expiry.split('/').map(Number);
                const now = new Date();
                const expired = mm < 1 || mm > 12
                    || yy < Number(String(now.getFullYear()).slice(2))
                    || (yy === Number(String(now.getFullYear()).slice(2)) && mm < now.getMonth() + 1);
                if (expired) next.expiry = 'That card has expired.';
            }
            if (card.cvv.length !== 3) next.cvv = 'CVV must be 3 digits.';
        }

        if (method === 'upi' && !/^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(upi.trim())) {
            next.upi = 'Enter a valid UPI ID, e.g. name@okbank.';
        }

        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const pay = () => {
        if (!validate()) {
            message.error('Please fix the highlighted fields.');
            return;
        }

        const order = placeOrder({
            items,
            bill,
            method,
            coupon: coupon?.code || null,
            address: { ...address },
            customer: user?.name || user?.email || 'Guest',
        });

        message.success('Order placed!');
        navigate('/paymentsuccessful', { state: { order } });
    };

    const field = (key) => (errors[key] ? 'payField bad' : 'payField');

    return (
        <>
            <Navbar solid />

            <div className="payPage">

                <header className="payHead">
                    <h1>Checkout</h1>
                    <p>{count} item{count !== 1 ? 's' : ''} · paying ₹{bill.total}</p>
                </header>

                <div className="payLayout">

                    {/* ---------------------------- Form ---------------------------- */}
                    <section className="payMain">

                        <div className="payCard">
                            <h2><EnvironmentOutlined /> Delivery address</h2>

                            <div className={field('line')}>
                                <label htmlFor="line">Full address</label>
                                <input
                                    id="line"
                                    value={address.line}
                                    placeholder="Flat / house, street, locality"
                                    onChange={(e) => setAddress({ ...address, line: e.target.value })}
                                />
                                {errors.line && <small>{errors.line}</small>}
                            </div>

                            <div className="payRow">
                                <div className={field('pin')}>
                                    <label htmlFor="pin">PIN code</label>
                                    <input
                                        id="pin"
                                        inputMode="numeric"
                                        value={address.pin}
                                        placeholder="110001"
                                        onChange={(e) => setAddress({ ...address, pin: onlyDigits(e.target.value).slice(0, 6) })}
                                    />
                                    {errors.pin && <small>{errors.pin}</small>}
                                </div>

                                <div className={field('phone')}>
                                    <label htmlFor="phone">Mobile number</label>
                                    <input
                                        id="phone"
                                        inputMode="numeric"
                                        value={address.phone}
                                        placeholder="9876543210"
                                        onChange={(e) => setAddress({ ...address, phone: onlyDigits(e.target.value).slice(0, 10) })}
                                    />
                                    {errors.phone && <small>{errors.phone}</small>}
                                </div>
                            </div>
                        </div>

                        <div className="payCard">
                            <h2><LockFilled /> Payment method</h2>

                            <div className="methodRow">
                                {METHODS.map((m) => (
                                    <button
                                        key={m.key}
                                        className={`methodBtn ${method === m.key ? 'on' : ''}`}
                                        onClick={() => { setMethod(m.key); setErrors({}); }}
                                    >
                                        {m.icon}<span>{m.label}</span>
                                    </button>
                                ))}
                            </div>

                            {method === 'card' &&
                                <div className="methodBody">
                                    <div className={field('name')}>
                                        <label htmlFor="cardName">Name on card</label>
                                        <input
                                            id="cardName"
                                            value={card.name}
                                            placeholder="As printed on the card"
                                            onChange={(e) => setCard({ ...card, name: e.target.value })}
                                        />
                                        {errors.name && <small>{errors.name}</small>}
                                    </div>

                                    <div className={field('number')}>
                                        <label htmlFor="cardNo">Card number</label>
                                        <input
                                            id="cardNo"
                                            inputMode="numeric"
                                            value={card.number.replace(/(.{4})/g, '$1 ').trim()}
                                            placeholder="1234 5678 9012 3456"
                                            onChange={(e) => setCard({ ...card, number: onlyDigits(e.target.value).slice(0, 16) })}
                                        />
                                        {errors.number && <small>{errors.number}</small>}
                                    </div>

                                    <div className="payRow">
                                        <div className={field('expiry')}>
                                            <label htmlFor="expiry">Expiry</label>
                                            <input
                                                id="expiry"
                                                inputMode="numeric"
                                                value={card.expiry}
                                                placeholder="MM/YY"
                                                onChange={(e) => {
                                                    const d = onlyDigits(e.target.value).slice(0, 4);
                                                    setCard({ ...card, expiry: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d });
                                                }}
                                            />
                                            {errors.expiry && <small>{errors.expiry}</small>}
                                        </div>

                                        <div className={field('cvv')}>
                                            <label htmlFor="cvv">CVV</label>
                                            <input
                                                id="cvv"
                                                type="password"
                                                inputMode="numeric"
                                                value={card.cvv}
                                                placeholder="•••"
                                                onChange={(e) => setCard({ ...card, cvv: onlyDigits(e.target.value).slice(0, 3) })}
                                            />
                                            {errors.cvv && <small>{errors.cvv}</small>}
                                        </div>
                                    </div>

                                    <p className="payNote">
                                        <LockFilled /> Demo checkout — nothing is sent anywhere. Don't enter a real card.
                                    </p>
                                </div>}

                            {method === 'upi' &&
                                <div className="methodBody">
                                    <div className={field('upi')}>
                                        <label htmlFor="upi">UPI ID</label>
                                        <input
                                            id="upi"
                                            value={upi}
                                            placeholder="yourname@okbank"
                                            onChange={(e) => setUpi(e.target.value)}
                                        />
                                        {errors.upi && <small>{errors.upi}</small>}
                                    </div>
                                    <p className="payNote">You'll get a collect request on your UPI app.</p>
                                </div>}

                            {method === 'cod' &&
                                <div className="methodBody">
                                    <p className="payNote">
                                        Pay ₹{bill.total} in cash when your order arrives. Please keep exact change handy.
                                    </p>
                                </div>}
                        </div>
                    </section>

                    {/* --------------------------- Summary -------------------------- */}
                    <aside className="paySide">
                        <div className="payCard">
                            <h2>Order summary</h2>

                            <div className="payItems">
                                {items.map((el) => (
                                    <div className="payItem" key={el.id}>
                                        <img src={el.imgUrl} alt={el.name} />
                                        <div>
                                            <p>{el.name}</p>
                                            <span>Qty {el.quantity}</span>
                                        </div>
                                        <b>₹{el.price * el.quantity}</b>
                                    </div>
                                ))}
                            </div>

                            <div className="billRow"><span>Item total</span><span>₹{bill.subtotal}</span></div>
                            {bill.discount > 0 &&
                                <div className="billRow green">
                                    <span>Coupon ({coupon.code})</span><span>−₹{bill.discount}</span>
                                </div>}
                            <div className="billRow">
                                <span>Delivery</span>
                                <span>{bill.delivery === 0 ? <b className="freeTag">FREE</b> : `₹${bill.delivery}`}</span>
                            </div>
                            <div className="billRow"><span>Taxes &amp; charges</span><span>₹{bill.taxes}</span></div>

                            <div className="billTotal"><span>To pay</span><span>₹{bill.total}</span></div>

                            <p className="payEta"><ClockCircleOutlined /> Arriving in 30–40 minutes</p>

                            <button className="payBtn" onClick={pay}>
                                {method === 'cod' ? `Place order · ₹${bill.total}` : `Pay ₹${bill.total}`}
                            </button>

                            <button className="payBack" onClick={() => navigate('/cart')}>Back to cart</button>
                        </div>
                    </aside>

                </div>
            </div>

            <Footer />
        </>
    );
}
