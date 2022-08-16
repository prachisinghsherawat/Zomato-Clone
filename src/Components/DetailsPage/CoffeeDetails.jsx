
import { useParams } from "react-router"
import {useState , useEffect} from "react"
import axios from "axios"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import "./A.Details.css"
import { Footer } from "../Footer/Footer"
import { CartPage } from "../CartPage/CartPage"


export const CoffeeDetails = () => {

    const {id} = useParams()
    const [coffeeData , setCoffeeData] = useState({})

    const [isCheck , setIsCheck] = useState(false)

    useEffect(() => {GetCoffeeData()},[])
    useEffect(()=>{window.scrollTo({ top: 0, behavior: "smooth" })},[])


    const GetCoffeeData = () => {
        axios.get(`https://zomatodataapi.herokuapp.com/coffee/${id}`).then((res)=> setCoffeeData(res.data))
    }
    //console.log(coffeeData)


    return(

        <>
            <ZomatoNav />

            { !isCheck ? 
                
                <div className="FoodDetails">

                <div><img src={coffeeData.imgUrl} /></div>

                <div id="FlexBoxis">
                    <h1>{coffeeData.name}</h1>
                    <span> Rs . {coffeeData.price} /-</span>
                </div>

                <p>{coffeeData.variety}</p>

                <div id="keyPair">
                    <span>Location : </span>
                    <p>{coffeeData.place}</p>
                </div>

                <div id="keyPair">
                    <span>Rating : </span> 
                    <p>{coffeeData.rating}</p>
                </div>

                <button onClick={() => setIsCheck(true)} id="cartBtn">ADD TO CART</button>

                </div>

                :

                <CartPage foodData={coffeeData} />
            }

            

            <div className="footerDiv">
                <Footer />
            </div>

        </>
    )
}