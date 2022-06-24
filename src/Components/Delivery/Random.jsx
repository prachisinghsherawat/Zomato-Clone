import { TabsNav } from "../Navbar/TabsNav"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import { Filter } from "../FilterPage/Filter"
import { FoodFilter } from "../FilterPage/FoodFilter"
import {FoodData}  from "../Data/FilterData"
import axios from "axios"
import { useEffect, useState } from "react"
import "./A.Food.css"


export const Random = () => {

    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');

    const [randomData , setRandomData] = useState([])
    useEffect(()=>{GetRandomData()},[])
    useEffect(()=>{window.scrollTo({ top: 0, behavior: "smooth" })},[])

    const HandlePrice = (value) => {

        setPrice(value);
        
        if(value == "asc"){
            let ascending = randomData.sort((a,b) => a.price - b.price)
            setRandomData([...ascending])
        }

        else if(value == "desc"){
            let descending = randomData.sort((a,b) => b.price - a.price)
            setRandomData([...descending])
        }
    };

    const HandleRating = (value) => {
        setRating(value);
    };

    const GetRandomData = () => {
        axios.get("http://localhost:8080/random").then((res)=>setRandomData(res.data))
    }

    return(
        
        <>
        
        < ZomatoNav />
        < TabsNav />
        < Filter HandlePrice ={HandlePrice} HandlePrice ={HandleRating} price={price} rating={rating} />
        < FoodFilter data = {FoodData}/>

        <h1 id="headOrder">Order Food Online In NCR Delhi </h1>

        <div className="random">
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
        </div>

        </>
    )
}