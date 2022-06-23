
import { Routes , Route} from "react-router"
import { Cake } from "../Delivery/Cake"
import { Chaat } from "../Delivery/Chaat"
import { Coffee } from "../Delivery/Coffee"
import { Random } from "../Delivery/Random"
import { Home } from "../Home/Home"
import { IceCream } from "../Delivery/IceCream"
import { Pizza } from "../Delivery/Pizza"
import { Shake } from "../Delivery/Shake"
import { Burger } from "../Delivery/Burger"


export const AllRoutes = () => {

    return(

        <>
        <Routes>

            <Route path="/" element ={ <Home /> } />
            <Route path="/delivery" element ={ <Random /> } />
            <Route path="/delivery/burger" element ={ <Burger /> } />
            <Route path="/delivery/cake" element ={ <Cake /> } />
            <Route path="/delivery/coffee" element ={ <Coffee /> } />
            <Route path="/delivery/chaat" element ={ <Chaat /> } />
            <Route path="/delivery/ice-cream" element ={ <IceCream /> } />
            <Route path="/delivery/pizza" element ={ <Pizza /> } />
            <Route path="/delivery/shake" element ={ <Shake /> } />
            
        </Routes>
        </>
    )
}