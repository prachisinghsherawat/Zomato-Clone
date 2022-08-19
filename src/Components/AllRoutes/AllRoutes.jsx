
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
import { DinningOut } from "../DinningOut/DinningOut"
import { Nightlife } from "../Nightlife/Nightlife"
import { SearchDetails } from "../DetailsPage/SearchDetails"
import { RandomDetails } from "../DetailsPage/RandomDetails"
import { BurgerDetails } from "../DetailsPage/BurgerDetails"
import { CakeDetails } from "../DetailsPage/CakeDetails"
import { ChaatDetails } from "../DetailsPage/ChaatDetails"
import { CoffeeDetails } from "../DetailsPage/CoffeeDetails"
import { IceCreamDetails } from "../DetailsPage/IceCreamDetails"
import { PizzaDetails } from "../DetailsPage/PizzaDetails"
import { ShakeDetails } from "../DetailsPage/ShakeDetails"
import { DinningDetails } from "../DinningOut/DinningDetails"
import { NightDetails } from "../Nightlife/NightlifeDetails"
import { SignUp } from "../Authentication/Signup"
import { Login } from "../Authentication/Login"
import { CartPage } from "../CartPage/CartPage"
import { PaymentPage } from "../PaymentPage/PaymentPage"


export const AllRoutes = () => {

    return(

        <>

        <Routes>


            {/* -------------------------------- Home Routes ------------------------------- */}

            <Route path="/" element ={ <Home /> } />



            {/* -------------------------------- Delivery Routes ----------------------------- */}

            <Route path="/delivery" element ={ <Random /> } />
            <Route path="/delivery/burger" element ={ <Burger /> } />
            <Route path="/delivery/cake" element ={ <Cake /> } />
            <Route path="/delivery/coffee" element ={ <Coffee /> } />
            <Route path="/delivery/chaat" element ={ <Chaat /> } />
            <Route path="/delivery/ice-cream" element ={ <IceCream /> } />
            <Route path="/delivery/pizza" element ={ <Pizza /> } />
            <Route path="/delivery/shake" element ={ <Shake /> } />


            {/* --------------------------------Delivery Details Routes -------------------------------- */}

            <Route path="/search-details/:id" element ={ <SearchDetails /> } />

            <Route path="/delivery/:id" element ={ <RandomDetails /> } />
            <Route path="/delivery/burger/:id" element ={ <BurgerDetails /> } />
            <Route path="/delivery/cake/:id" element ={ <CakeDetails /> } />
            <Route path="/delivery/coffee/:id" element ={ <CoffeeDetails /> } />
            <Route path="/delivery/chaat/:id" element ={ <ChaatDetails /> } />
            <Route path="/delivery/ice-cream/:id" element ={ <IceCreamDetails /> } />
            <Route path="/delivery/pizza/:id" element ={ <PizzaDetails /> } />
            <Route path="/delivery/shake/:id" element ={ <ShakeDetails /> } />
            



            {/* -------------------------------- Dinning-Out Routes ------------------------------- */}

            <Route path="/dinning" element ={ <DinningOut /> } />
            <Route path="/dinning/:id" element ={ <DinningDetails /> } />




            {/* -------------------------------- Nightlife Routes -------------------------------- */}

            <Route path="/nightlife" element ={ <Nightlife /> } />
            <Route path="/nightlife/:id" element ={ <NightDetails /> } />




            {/* ------------------------------- Login And SignUp Routes -------------------------------- */}

            <Route path="/signup" element ={ <SignUp /> } />
            <Route path="/login" element ={ <Login /> } />




            {/* ------------------------------- Cart Page Routes ---------------------------------------- */}

            <Route path="/cart" element ={ <CartPage /> } />



            {/* ------------------------------- Paymentt Page Routes ---------------------------------------- */}

            <Route path="/payment" element ={ <PaymentPage /> } />
            
            
        </Routes>
        </>
    )
}