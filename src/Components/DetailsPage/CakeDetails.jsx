
import { useParams } from "react-router"
import {useState , useEffect} from "react"
import axios from "axios"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import "./A.Details.css"
import { Footer } from "../Footer/Footer"


export const CakeDetails = () => {

    const {id} = useParams()
    const [cakeData , setCakeData] = useState({})
    useEffect(() => {GetCakeData()},[])


    useEffect(()=>{window.scrollTo({ top: 0, behavior: "smooth" })},[])


    const GetCakeData = () => {
        axios.get(`https://zomatodataapi.herokuapp.com/cake/${id}`).then((res)=> setCakeData(res.data))
    }
    //console.log(cakeData)

    return(

        <>
            <ZomatoNav />

            <div className="FoodDetails">

                <div><img src={cakeData.imgUrl} /></div>

                <div id="FlexBoxis">
                    <h1>{cakeData.name}</h1>
                    <span> Rs . {cakeData.price} /-</span>
                </div>

                <p>{cakeData.variety}</p>

                <div id="keyPair">
                    <span>Location : </span>
                    <p>{cakeData.place}</p>
                </div>

                <div id="keyPair">
                    <span>Rating : </span> 
                    <p>{cakeData.rating}</p>
                </div>

            </div>

            <div className="footerDiv">
                <Footer />
            </div>

        </>
    )
}