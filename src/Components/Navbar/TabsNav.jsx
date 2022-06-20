import "./Navbar.css"
import delivery from "../Icons/delivery.png"
import order from "../Icons/order.png"
import night from "../Icons/night.png"
import deliveryCol from "../Icons/deliveryCol.png"
import orderCol from "../Icons/orderCol.png"
import nightCol from "../Icons/nightCol.png"


export const TabsNav = () => {

    return(

        <>
            <div className="tabs">
                <div>
                    <div onClick={} className="icontab">
                        <img src={delivery} alt="" height="100%" width="100%"/>
                    </div>
                    <p>Delivery</p>
                </div>

                <div>
                    <div onClick={} className="icontab">
                        <img src={night} alt="" height="100%" width="100%"/>
                    </div>
                    <p>Nightlife</p>
                </div>

                <div>
                    <div onClick={} className="icontab">
                        <img src={order} alt="" height="100%" width="100%"/>
                    </div>
                    <p>Dinning Out</p>
                </div>

                
            </div>
        </>
    )
}