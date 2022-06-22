import { Routes , Route} from "react-router"
import { Random } from "../Food/Random"
import { Home } from "../Home/Home"




export const AllRoutes = () => {

    return(

        <>
        <Routes>

            <Route path="/" element ={ <Home /> } />
            <Route path="/food" element ={ <Random /> } />
            <Route path="/food/burger" element ={ <Burger /> } />
            <Route path="/food/cake" element ={ <Random /> } />
            <Route path="/food/coffee" element ={ <Random /> } />
            <Route path="/food/chaat" element ={ <Random /> } />
            <Route path="/food/ice-cream" element ={ <Random /> } />
            <Route path="/food/pizza" element ={ <Random /> } />
            <Route path="/food/shake" element ={ <Random /> } />
            
        </Routes>
        </>
    )
}