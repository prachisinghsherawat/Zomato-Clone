
import { useParams } from "react-router"
import {useState , useEffect} from "react"
import axios from "axios"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import "./A.Details.css"
import { Footer } from "../Footer/Footer"
import { CartPage } from "../CartPage/CartPage"


export const ChaatDetails = () => {

    const {id} = useParams()
    const [chaatData , setChaatData] = useState({})

    const [isCheck , setIsCheck] = useState(false)

    useEffect(() => {GetChaatData()},[])
    useEffect(()=>{window.scrollTo({ top: 0, behavior: "smooth" })},[])


    const GetChaatData = () => {
        axios.get(`https://zomatodataapi.herokuapp.com/chaat/${id}`).then((res)=> setChaatData(res.data))
    }
    //console.log(chaatData)

    return(

        <>
            <ZomatoNav />

            { !isCheck ? 
                
                <div className="FoodDetails">

                <div><img src={chaatData.imgUrl} /></div>

                <div id="FlexBoxis">
                    <h1>{chaatData.name}</h1>
                    <span> Rs . {chaatData.price} /-</span>
                </div>

                <p>{chaatData.variety}</p>

                <div id="keyPair">
                    <span>Location : </span>
                    <p>{chaatData.place}</p>
                </div>

                <div id="keyPair">
                    <span>Rating : </span> 
                    <p>{chaatData.rating}</p>
                </div>

                <button onClick={() => setIsCheck(true)} id="cartBtn">ADD TO CART</button>

                </div>

                :

                <CartPage foodData={chaatData} />
            }

            

            <div className="footerDiv">
                <Footer />
            </div>

        </>
    )
}