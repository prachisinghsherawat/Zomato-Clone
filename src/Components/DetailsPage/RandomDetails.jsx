import { useParams } from "react-router"
import {useState , useEffect} from "react"
import axios from "axios"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import "./A.Details.css"


export const RandomDetails = () => {

    const {id} = useParams()
    const [randomData , setRandomData] = useState({})
    useEffect(() => {GetRandomData()},[])

    useEffect(()=>{window.scrollTo({ top: 0, behavior: "smooth" })},[])


    const GetRandomData = () => {
        axios.get(`http://localhost:8080/random/${id}`).then((res)=> setRandomData(res.data))
    }
    //console.log(randomData)

    return(

        <>
            <ZomatoNav />

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

            </div>

        </>
    )
}