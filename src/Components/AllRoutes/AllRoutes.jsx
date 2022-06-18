import { Routes , Route} from "react-router"
import { Home } from "../Home/Home"




export const AllRoutes = () => {

    return(

        <>
        <Routes>
            <Route path="/" element ={ <Home /> } />
        </Routes>
        </>
    )
}