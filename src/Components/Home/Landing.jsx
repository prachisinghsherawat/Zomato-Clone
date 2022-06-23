import "./Home.css"
import {useNavigate} from "react-router-dom"

export const LandingPage = () => {

    const navigate = useNavigate()

    return(

        <>
        <div className="cardBox">

            <div onClick={()=> navigate("/delivery")}>

                <img src="https://b.zmtcdn.com/data/pictures/3/20066713/8d55259349a583f56d540b716c249f1a_o2_featured_v2.jpg" alt="" height="100%" width="100%" />
                <h1>Order Online</h1>
                <p>Stay home and Order to your doorsteps</p>

            </div>


            <div onClick={()=> navigate("/dinning")}>

                <img src="https://b.zmtcdn.com/data/pictures/4/307374/b3309d3aad3838b482586ca304a7dcc0_featured_v2.jpg?output-format=webp" alt="" height="100%" width="100%" />
                <h1>Dinning Out</h1>
                <p>View the city's favourite dining venues</p>

            </div>


            <div onClick={()=> navigate("/nightlife")}>

                <img src="https://b.zmtcdn.com/data/pictures/7/19291447/5243902b4cb774b2cc36556e40a6170d_featured_v2.jpg" alt="" height="100%" width="100%" />
                <h1>Nightlife and Clubs</h1>
                <p>Explore the city's top nightlife outlets </p>

            </div>
        </div>
        </>
    )
}