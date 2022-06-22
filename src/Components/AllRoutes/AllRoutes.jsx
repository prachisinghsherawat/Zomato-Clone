import { Routes , Route} from "react-router"
import { Random } from "../Food/Random"
import { Home } from "../Home/Home"




export const AllRoutes = () => {

    return(

        <>
        <Routes>
            <Route path="/" element ={ <Home /> } />
            <Route path="/food" element ={ <Random /> } />
        </Routes>
        </>
    )
}