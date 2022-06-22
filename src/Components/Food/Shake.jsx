import { TabsNav } from "../Navbar/TabsNav"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import { Filter } from "../FilterPage/Filter"
import axios from "axios"
import { useEffect, useState } from "react"
import "./A.Food.css"

export const Shake = () => {

    const [ShakeData , setShakeData] = useState([])
    useEffect(()=>{GetRandomData()},[])

    const GetRandomData = () => {
        axios.get("http://localhost:8080/Shake").then((res)=> setShakeData(res.data))
    }

    return(

        <>

        < ZomatoNav />
        < TabsNav />
        < Filter />

        <h1 id="headOrder"> Order your Shake </h1>

        <div className="random">

            {ShakeData.map((el)=>(

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