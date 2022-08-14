
import { useParams } from "react-router"
import {useState , useEffect} from "react"
import axios from "axios"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import "./A.Details.css"
import { Footer } from "../Footer/Footer"


export const PizzaDetails = () => {

    const {id} = useParams()
    const [pizzaData , setPizzaData] = useState({})
    useEffect(() => {GetPizzaData()},[])


    useEffect(()=>{window.scrollTo({ top: 0, behavior: "smooth" })},[])


    const GetPizzaData = () => {
        axios.get(`https://zomatodataapi.herokuapp.com/pizza/${id}`).then((res)=> setPizzaData(res.data))
    }
    //console.log(pizzaData)

    return(

        <>
            <ZomatoNav />

            <div className="FoodDetails">

                <div><img src={pizzaData.imgUrl} /></div>

                <div id="FlexBoxis">
                    <h1>{pizzaData.name}</h1>
                    <span> Rs . {pizzaData.price} /-</span>
                </div>

                <p>{pizzaData.variety}</p>

                <div id="keyPair">
                    <span>Location : </span>
                    <p>{pizzaData.place}</p>
                </div>

                <div id="keyPair">
                    <span>Rating : </span> 
                    <p>{pizzaData.rating}</p>
                </div>

                <button id="cartBtn">ADD TO CART</button>

            </div>

            <div className="footerDiv">
                <Footer />
            </div>

        </>
    )
}
