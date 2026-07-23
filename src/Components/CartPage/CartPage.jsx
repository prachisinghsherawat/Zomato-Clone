import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { message } from "antd"
import {
    DeleteOutlined, MinusOutlined, PlusOutlined, TagOutlined,
    ShoppingOutlined, CloseCircleFilled,
} from "@ant-design/icons"
import { Navbar } from "../Navbar/Navbar"
import { Footer } from "../Footer/Footer"
import {
    useCart, useCoupon, setQuantity, removeFromCart,
    applyCoupon, clearCoupon, couponDiscount, useUser,
} from "../Utils/store"
import { COUPONS, findCoupon, buildBill, FREE_DELIVERY_ABOVE } from "../Data/offers"
import "./Cart.css"

// The cart reads straight from the shared store, so the line items, the
// header badge and the payment summary are always the same numbers. The old
// version recomputed the total only when a quantity changed, which meant a
// freshly loaded cart showed a total of 0.
export const CartPage = () => {

    const navigate = useNavigate()
    const { items, count, subtotal } = useCart()
    const coupon = useCoupon()
    const user = useUser()

    const [code, setCode] = useState("")

    useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }) }, [])

    const { value: discount, reason } = couponDiscount(coupon, subtotal)
    const bill = buildBill(subtotal, discount)

    const tryCoupon = (raw) => {
        const found = findCoupon(raw)
        if (!found) { message.error(`"${raw}" isn't a valid coupon code.`); return }
        if (subtotal < (found.minOrder || 0)) {
            message.warning(`${found.code} needs a minimum order of ₹${found.minOrder}.`)
            return
        }
        applyCoupon(found)
        setCode("")
        message.success(`${found.code} applied!`)
    }

    const checkout = () => {
        if (!user) {
            message.info("Please log in to place your order.")
            navigate("/login", { state: { from: "/cart" } })
            return
        }
        navigate("/payment")
    }

    /* ------------------------------ Empty state ------------------------------ */

    if (!items.length) {
        return (
            <>
                <Navbar solid />
                <div className="cartPage">
                    <div className="cartEmptyBox">
                        <ShoppingOutlined />
                        <h2>Your cart is empty</h2>
                        <p>Add a few dishes from any restaurant and they'll show up here.</p>
                        <button className="cartBrowse" onClick={() => navigate("/delivery")}>
                            Browse restaurants
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        )
    }

    /* -------------------------------- Cart ---------------------------------- */

    return (
        <>
            <Navbar solid />

            <div className="cartPage">

                <header className="cartHead">
                    <h1>Your Cart</h1>
                    <p>{count} item{count !== 1 ? "s" : ""} · {items.length} dish{items.length !== 1 ? "es" : ""}</p>
                </header>

                <div className="cartLayout">

                    {/* ------------------------- Line items ------------------------- */}
                    <section className="cartItems">
                        {items.map((el) => (
                            <div className="cartBox" key={el.id}>

                                <img src={el.imgUrl} alt={el.name} />

                                <div className="cartInfo">
                                    <p className="cartName">{el.name}</p>
                                    {el.restaurant && <span className="cartFrom">{el.restaurant}</span>}
                                    <span className="cartUnit">₹{el.price} each</span>
                                </div>

                                <div className="qtyBox">
                                    <button
                                        aria-label="Decrease quantity"
                                        onClick={() => setQuantity(el.id, el.quantity - 1)}
                                    ><MinusOutlined /></button>
                                    <span>{el.quantity}</span>
                                    <button
                                        aria-label="Increase quantity"
                                        onClick={() => setQuantity(el.id, el.quantity + 1)}
                                    ><PlusOutlined /></button>
                                </div>

                                <p className="cartLinePrice">₹{el.price * el.quantity}</p>

                                <button
                                    className="cartRemove"
                                    aria-label={`Remove ${el.name}`}
                                    onClick={() => { removeFromCart(el.id); message.success(`${el.name} removed`) }}
                                ><DeleteOutlined /></button>

                            </div>
                        ))}

                        {subtotal < FREE_DELIVERY_ABOVE &&
                            <p className="cartNudge">
                                Add ₹{FREE_DELIVERY_ABOVE - subtotal} more to get <b>free delivery</b>.
                            </p>}
                    </section>

                    {/* --------------------------- Bill ---------------------------- */}
                    <aside className="cartSide">

                        <div className="couponBox">
                            <h3><TagOutlined /> Apply a coupon</h3>

                            {coupon ? (
                                <div className="couponOn">
                                    <div>
                                        <b>{coupon.code}</b>
                                        <span>{discount > 0 ? `You saved ₹${discount}` : reason}</span>
                                    </div>
                                    <button onClick={() => clearCoupon()} aria-label="Remove coupon">
                                        <CloseCircleFilled />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="couponInput">
                                        <input
                                            value={code}
                                            placeholder="Enter code"
                                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                                            onKeyDown={(e) => e.key === "Enter" && code.trim() && tryCoupon(code)}
                                        />
                                        <button disabled={!code.trim()} onClick={() => tryCoupon(code)}>Apply</button>
                                    </div>

                                    <div className="couponSuggest">
                                        {COUPONS.filter((c) => subtotal >= (c.minOrder || 0)).slice(0, 3).map((c) => (
                                            <button key={c.code} onClick={() => tryCoupon(c.code)}>
                                                {c.code} <small>{c.title}</small>
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="billBox">
                            <h3>Bill details</h3>

                            <div className="billRow">
                                <span>Item total</span><span>₹{bill.subtotal}</span>
                            </div>

                            {bill.discount > 0 &&
                                <div className="billRow green">
                                    <span>Coupon discount ({coupon.code})</span><span>−₹{bill.discount}</span>
                                </div>}

                            <div className="billRow">
                                <span>Delivery fee</span>
                                <span>{bill.delivery === 0 ? <b className="freeTag">FREE</b> : `₹${bill.delivery}`}</span>
                            </div>

                            <div className="billRow">
                                <span>Taxes &amp; charges (5%)</span><span>₹{bill.taxes}</span>
                            </div>

                            <div className="billTotal">
                                <span>To pay</span><span>₹{bill.total}</span>
                            </div>

                            <button className="checkoutBtn" onClick={checkout}>
                                Proceed to payment →
                            </button>

                            <button className="keepShopping" onClick={() => navigate("/delivery")}>
                                Add more items
                            </button>
                        </div>

                    </aside>
                </div>
            </div>

            <Footer />
        </>
    )
}
