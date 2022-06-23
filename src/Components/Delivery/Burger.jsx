import { TabsNav } from "../Navbar/TabsNav"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import { Filter } from "../FilterPage/Filter"
import axios from "axios"
import { useEffect, useState } from "react"
import "./A.Food.css"

export const Burger = () => {

    const [burgerData , setBurgerData] = useState([])
    useEffect(()=>{GetRandomData()},[])

    const GetRandomData = () => {
        axios.get("http://localhost:8080/Burger").then((res)=> setBurgerData(res.data))
    }

    return(

        <>

        < ZomatoNav />
        < TabsNav />
        < Filter />

        <h1 id="headOrder"> Order your Burger </h1>

        <div className="random">

            {burgerData.map((el)=>(

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