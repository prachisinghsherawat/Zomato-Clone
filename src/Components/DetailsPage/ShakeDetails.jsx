

import { useParams } from "react-router"
import {useState , useEffect} from "react"
import axios from "axios"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import "./A.Details.css"
import { Footer } from "../Footer/Footer"


export const ShakeDetails = () => {

    const {id} = useParams()
    const [shakeData , setShakeData] = useState({})
    useEffect(() => {GetShakeData()},[])

    useEffect(()=>{window.scrollTo({ top: 0, behavior: "smooth" })},[])


    const GetShakeData = () => {
        axios.get(`https://zomatodataapi.herokuapp.com/shake/${id}`).then((res)=> setShakeData(res.data))
    }
    //console.log(shakeData)

    return(

        <>
            <ZomatoNav />

            <div className="FoodDetails">

                <div><img src={shakeData.imgUrl} /></div>

                <div id="FlexBoxis">
                    <h1>{shakeData.name}</h1>
                    <span> Rs . {shakeData.price} /-</span>
                </div>

                <p>{shakeData.variety}</p>

                <div id="keyPair">
                    <span>Location : </span>
                    <p>{shakeData.place}</p>
                </div>

                <div id="keyPair">
                    <span>Rating : </span> 
                    <p>{shakeData.rating}</p>
                </div>

            </div>

            <div className="footerDiv">
                <Footer/>
            </div>

        </>
    )
}
