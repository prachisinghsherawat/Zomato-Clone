import { TabsNav } from "../Navbar/TabsNav"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import { Filter } from "../FilterPage/Filter"
import axios from "axios"
import { useEffect, useState } from "react"
import "./A.Food.css"

export const Pizza = () => {

    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [PizzaData , setPizzaData] = useState([])

    useEffect(()=>{GetRandomData()},[])
    useEffect(()=>{window.scrollTo({ top: 0, behavior: "smooth" })},[])

    const GetRandomData = () => {
        axios.get("http://localhost:8080/Pizza").then((res)=> setPizzaData(res.data))
    }

    return(

        <>

        < ZomatoNav />
        < TabsNav />
        < Filter HandlePrice ={HandlePrice} HandleRating ={HandleRating} price={price} rating={rating} />

        <h1 id="headOrder"> Order your Pizza </h1>

        <div className="random">

            {PizzaData.map((el)=>(

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