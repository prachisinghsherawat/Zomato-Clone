import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingOutlined, CheckCircleFilled } from "@ant-design/icons";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import { useOrders } from "../Utils/store";
import "./Orders.css";

const METHOD_LABEL = { card: "Card", upi: "UPI", cod: "Cash on delivery" };

// Order history — the checkout records every order, so there is somewhere for
// the "View my orders" link and the header menu to actually go.
export const Orders = () => {

    const navigate = useNavigate();
    const orders = useOrders();

    useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

    return (
        <>
            <Navbar solid />

            <div className="ordersPage">

                <header className="ordersHead">
                    <h1>My Orders</h1>
                    <p>{orders.length ? `${orders.length} order${orders.length !== 1 ? "s" : ""} placed` : "Everything you order shows up here."}</p>
                </header>

                {orders.length === 0 ? (
                    <div className="ordersEmpty">
                        <ShoppingOutlined />
                        <h2>No orders yet</h2>
                        <p>Once you place an order it'll appear here with the full bill.</p>
                        <button onClick={() => navigate("/delivery")}>Start ordering</button>
                    </div>
                ) : (
                    <div className="ordersList">
                        {orders.map((order) => (
                            <article className="orderCardRow" key={order.id}>

                                <div className="orderTop">
                                    <div>
                                        <span className="orderStatus"><CheckCircleFilled /> Delivered</span>
                                        <h3>Order {order.id}</h3>
                                        <p>
                                            {new Date(order.placedAt).toLocaleString([], {
                                                day: "numeric", month: "short", year: "numeric",
                                                hour: "2-digit", minute: "2-digit",
                                            })}
                                            &nbsp;·&nbsp;{METHOD_LABEL[order.method] || order.method}
                                        </p>
                                    </div>
                                    <span className="orderTotal">₹{order.bill.total}</span>
                                </div>

                                <div className="orderThumbs">
                                    {order.items.map((el) => (
                                        <div className="orderThumb" key={el.id}>
                                            <img src={el.imgUrl} alt={el.name} loading="lazy" />
                                            <span>{el.name} × {el.quantity}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="orderFoot">
                                    <span>{order.address.line} · {order.address.pin}</span>
                                    <button onClick={() => navigate("/delivery")}>Reorder</button>
                                </div>

                            </article>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
};
