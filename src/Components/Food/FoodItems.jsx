import { TabsNav } from "../Navbar/TabsNav"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import { Filter } from "../FilterPage/Filter"
import { FoodFilter } from "../FilterPage/FoodFilter"
import {FoodData}  from "../Data/FilterData"
import axios from "axios"
import { useEffect, useState } from "react"


export const FoodItems = () => {

    const [randomData , setRandomData] = useState([])
    useEffect(()=>{GetRandomData()},[])

    const GetRandomData = () => {
        axios.get("http://localhost:8080/random").then((res)=>setRandomData(res.data))
    }

    return(
        
        <>
        
        < ZomatoNav />
        < TabsNav />
        < Filter />
        < FoodFilter data = {FoodData}/>

        {/* <div className="random">
            {randomData.map((el)=>(

                <div>
                    <img src={el.imgUrl} />
                </div>
            ))}
        </div> */}

        </>
    )
}