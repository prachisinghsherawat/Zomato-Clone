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

    const [restaurantData , setRestaurantData] = useState([])
    useEffect(()=>{GetRandomData()},[])
    useEffect(()=>{window.scrollTo({ top: 0, behavior: "smooth" })},[])

    const GetRandomData = () => {
        axios.get("http://localhost:8080/restaurants").then((res)=>setRestaurantData(res.data))
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

        <div className="random">
            {restaurantData.map((el)=>(

                <div onClick={()=>navigate(`/dinning/${el.id}`)}>

                    <div className="imgDiv"><img src={el.imgUrl} /></div>
                    <div className="flxBox">
                        <h1>{el.name}</h1>
                        <span> Rs. {el.price}</span>
                    </div>
                    <div className="priceBox">
                        <p>{el.variety}</p>
                        <span>{el. rating}</span>
                    </div>
                    
                    

                </div>
            ))}
        </div>

        </>
    )
}