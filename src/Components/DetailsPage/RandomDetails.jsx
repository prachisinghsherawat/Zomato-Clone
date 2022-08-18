import { useParams } from "react-router"
import {useState , useEffect} from "react"
import axios from "axios"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import "./A.Details.css"
import { Footer } from "../Footer/Footer"
import { CartPage } from "../CartPage/CartPage"


export const RandomDetails = () => {

    const {id} = useParams()
    const [randomData , setRandomData] = useState({})

    const [isCheck , setIsCheck] = useState(false)

    useEffect(() => {GetRandomData()},[])
    useEffect(()=>{window.scrollTo({ top: 0, behavior: "smooth" })},[])


    const GetRandomData = () => {
        axios.get(`https://zomatodataapi.herokuapp.com/random/${id}`).then((res)=> setRandomData(res.data))
    }
    //console.log(randomData)


    return(

        <>
            <ZomatoNav />

            { !isCheck ? 
                
                <div className="FoodDetails">
                
                <div><img src={randomData.imgUrl} /></div>

                <div id="FlexBoxis">
                    <h1>{randomData.name}</h1>
                    <span> Rs . {randomData.price} /-</span>
                </div>

                <p>{randomData.variety}</p>

                <div id="keyPair">
                    <span>Location : </span>
                    <p>{randomData.place}</p>
                </div>

                <div id="keyPair">
                    <span>Rating : </span> 
                    <p>{randomData.rating}</p>
                </div>

                <button onClick={() => setIsCheck(true)} id="cartBtn">ADD TO CART</button>

                </div>

                :

                <CartPage foodData={randomData} />
            }

            

            <div className="footerDiv">
                <Footer />
            </div>

        </>
    )
}
