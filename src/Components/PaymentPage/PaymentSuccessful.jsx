import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircleFilled, EnvironmentOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import { useOrders } from "../Utils/store";
import "./Payment.css";

const METHOD_LABEL = { card: "Card", upi: "UPI", cod: "Cash on delivery" };

// Confirmation screen. Previously this was a single hot-linked image from an
// unrelated website, so it showed nothing about the order (and broke whenever
// that host went down). It now renders the real order the store just recorded.
export const PaymentSuccessful = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const orders = useOrders();

    // Prefer the order handed over by the checkout; fall back to the newest
    // one so a refresh still shows something sensible.
    const order = state?.order || orders[0];

    useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

    useEffect(() => {
        if (!order) navigate("/", { replace: true });
    }, [order, navigate]);

    if (!order) return null;

    const eta = new Date(new Date(order.placedAt).getTime() + 35 * 60000);

    return (
        <>
            <Navbar solid />

            <div className="paySuccess">

                <div className="paySuccessTop">
                    <CheckCircleFilled />
                    <h1>Order confirmed!</h1>
                    <p>Thanks {order.customer}. Your food is being prepared.</p>
                    <span className="orderId">Order ID · {order.id}</span>
                </div>

                <div className="payCard">
                    <div className="successMeta">
                        <div>
                            <ClockCircleOutlined />
                            <span>
                                <b>{eta.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</b>
                                <small>Expected arrival</small>
                            </span>
                        </div>
                        <div>
                            <EnvironmentOutlined />
                            <span>
                                <b>{order.address.line}</b>
                                <small>{order.address.pin} · {order.address.phone}</small>
                            </span>
                        </div>
                    </div>

                    <h2>What's coming</h2>
                    <div className="payItems">
                        {order.items.map((el) => (
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

                    <div className="billRow"><span>Item total</span><span>₹{order.bill.subtotal}</span></div>
                    {order.bill.discount > 0 &&
                        <div className="billRow green">
                            <span>Coupon ({order.coupon})</span><span>−₹{order.bill.discount}</span>
                        </div>}
                    <div className="billRow">
                        <span>Delivery</span>
                        <span>{order.bill.delivery === 0 ? <b className="freeTag">FREE</b> : `₹${order.bill.delivery}`}</span>
                    </div>
                    <div className="billRow"><span>Taxes &amp; charges</span><span>₹{order.bill.taxes}</span></div>

                    <div className="billTotal">
                        <span>Paid via {METHOD_LABEL[order.method] || order.method}</span>
                        <span>₹{order.bill.total}</span>
                    </div>

                    <div className="successActions">
                        <button className="payBtn" onClick={() => navigate("/orders")}>View my orders</button>
                        <button className="payBack" onClick={() => navigate("/delivery")}>Order something else</button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};
