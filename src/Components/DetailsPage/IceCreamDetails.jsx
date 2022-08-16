
import { useParams } from "react-router"
import {useState , useEffect} from "react"
import axios from "axios"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import "./A.Details.css"
import { Footer } from "../Footer/Footer"
import { CartPage } from "../CartPage/CartPage"


export const IceCreamDetails = () => {

    const {id} = useParams()
    const [iceCreamData , setIceCreamData] = useState({})

    const [isCheck , setIsCheck] = useState(false)

    useEffect(() => {GetIceCreamData()},[])
    useEffect(()=>{window.scrollTo({ top: 0, behavior: "smooth" })},[])


    const GetIceCreamData = () => {
        axios.get(`https://zomatodataapi.herokuapp.com/IceCream/${id}`).then((res)=> setIceCreamData(res.data))
    }
    //console.log(iceCreamData)


    return(

        <>
            <ZomatoNav />

            { !isCheck ? 
                
                <div className="FoodDetails">

                <div><img src={iceCreamData.imgUrl} /></div>

                <div id="FlexBoxis">
                    <h1>{iceCreamData.name}</h1>
                    <span> Rs . {iceCreamData.price} /-</span>
                </div>

                <p>{iceCreamData.variety}</p>

                <div id="keyPair">
                    <span>Location : </span>
                    <p>{iceCreamData.place}</p>
                </div>

                <div id="keyPair">
                    <span>Rating : </span> 
                    <p>{iceCreamData.rating}</p>
                </div>

                <button onClick={() => setIsCheck(true)} id="cartBtn">ADD TO CART</button>

                </div>

                :

                <CartPage foodData={iceCreamData} />
            }

            

            <div className="footerDiv">
                <Footer />
            </div>

        </>
    )
}

