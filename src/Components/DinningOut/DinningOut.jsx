import { TabsNav } from "../Navbar/TabsNav"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import { Filter } from "../FilterPage/Filter"
import { FoodFilter } from "../FilterPage/FoodFilter"
import {FoodData}  from "../Data/FilterData"
import axios from "axios"
import { useEffect, useState } from "react"
import { Collections } from "../Home/Collection"
import "./Dinning.css"


export const DinningOut = () => {

    const [randomData , setRandomData] = useState([])
    useEffect(()=>{GetRandomData()},[])
    useEffect(()=>{window.scrollTo({ top: 0, behavior: "smooth" })},[])

    const GetRandomData = () => {
        axios.get("http://localhost:8080/random").then((res)=>setRandomData(res.data))
    }

    return(
        
        <>
        
        < ZomatoNav />
        < TabsNav />
        < Filter />
        <div className="collectionBox">
            <Collections />
        </div>
        {/* < FoodFilter data = {FoodData}/> */}

        <h1 id="headOrder">Dine-Out Restaurants In NCR Delhi </h1>

        {/* <div className="random">
            {randomData.map((el)=>(

                <div >

                    <div className="imgDiv"><img src={el.imgUrl} /></div>
                    <div className="flxBox">
                        <h1>{el.name}</h1>
                        <span>{el.rating}</span>
                    </div>
                    <p>{el.variety}</p>
                    
                    

                </div>
            ))}
        </div> */}

        </>
    )
}