import { Routes , Route} from "react-router"
import { FoodItems } from "../Food/FoodItems"
import { Home } from "../Home/Home"




export const AllRoutes = () => {

    return(

        <>
        <Routes>
            <Route path="/" element ={ <Home /> } />
            <Route path="/food" element ={ <FoodItems/> } />
        </Routes>
        </>
    )
}