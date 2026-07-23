import "./Navbar.css"
import delivery from "../Icons/delivery.png"
import order from "../Icons/order.png"
import night from "../Icons/night.png"
import deliveryCol from "../Icons/deliveryCol.png"
import orderCol from "../Icons/orderCol.png"
import nightCol from "../Icons/nightCol.png"
import { useNavigate, useLocation } from "react-router-dom"

const TABS = [
    { key: "delivery", label: "Delivery", icon: delivery, active: deliveryCol },
    { key: "nightlife", label: "Nightlife", icon: night, active: nightCol },
    { key: "dinning", label: "Dining Out", icon: order, active: orderCol },
]

// The active tab is derived from the URL rather than from local state plus
// direct style writes, so landing on /delivery/pizza (or hitting browser back)
// highlights the right tab instead of leaving all three grey.
export const TabsNav = () => {

    const navigate = useNavigate()
    const { pathname } = useLocation()

    return (
        <div className="tabs">
            {TABS.map((tab) => {
                const on = pathname === `/${tab.key}` || pathname.startsWith(`/${tab.key}/`)
                return (
                    <div
                        key={tab.key}
                        className={`tabItem ${on ? "on" : ""}`}
                        onClick={() => navigate(`/${tab.key}`)}
                    >
                        <div className="icontab">
                            <img src={on ? tab.active : tab.icon} alt="" height="100%" width="100%" />
                        </div>
                        <p>{tab.label}</p>
                    </div>
                )
            })}
        </div>
    )
}
