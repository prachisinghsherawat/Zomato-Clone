
import { Routes , Route} from "react-router"
import { Cake } from "../Food/Cake"
import { Chaat } from "../Food/Chaat"
import { Coffee } from "../Food/Coffee"
import { Random } from "../Food/Random"
import { Home } from "../Home/Home"
import { IceCream } from "../Food/IceCream"
import { Pizza } from "../Food/Pizza"
import { Shake } from "../Food/Shake"


export const AllRoutes = () => {

    return(

        <>
        <Routes>

            <Route path="/" element ={ <Home /> } />
            <Route path="/food" element ={ <Random /> } />
            <Route path="/food/burger" element ={ <Burger /> } />
            <Route path="/food/cake" element ={ <Cake /> } />
            <Route path="/food/coffee" element ={ <Coffee /> } />
            <Route path="/food/chaat" element ={ <Chaat /> } />
            <Route path="/food/ice-cream" element ={ <IceCream /> } />
            <Route path="/food/pizza" element ={ <Pizza /> } />
            <Route path="/food/shake" element ={ <Shake /> } />
            
        </Routes>
        </>
    )
}