import { useNavigate, useParams } from "react-router"
import {useState , useEffect} from "react"
import axios from "axios"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import "./A.Details.css"
import { Footer } from "../Footer/Footer"
import { CartPage } from "../CartPage/CartPage"


export const BurgerDetails = () => {

    const {id} = useParams()
    const [burgerData , setBurgerData] = useState({})

    const [isCheck , setIsCheck] = useState(false)

    useEffect(() => {GetBurgerData()},[])
    useEffect(()=>{window.scrollTo({ top: 0, behavior: "smooth" })},[])


    const GetBurgerData = () => {
        axios.get(`https://zomatodataapi.herokuapp.com/burger/${id}`).then((res)=> setBurgerData(res.data))
    }
    //console.log(burgerData)

    return(

        <>
            <ZomatoNav />

            { !isCheck ? 
                
                <div className="FoodDetails">

                <div><img src={burgerData.imgUrl} /></div>

                <div id="FlexBoxis">
                    <h1>{burgerData.name}</h1>
                    <span> Rs . {burgerData.price} /-</span>
                </div>

                <p>{burgerData.variety}</p>

                <div id="keyPair">
                    <span>Location : </span>
                    <p>{burgerData.place}</p>
                </div>

                <div id="keyPair">
                    <span>Rating : </span> 
                    <p>{burgerData.rating}</p>
                </div>

                <button onClick={() => setIsCheck(true)} id="cartBtn">ADD TO CART</button>             

                </div>

                :

                <CartPage foodData={burgerData} />
            }

            

            <div className="footerDiv">
                <Footer />
            </div>

        </>
    )
}