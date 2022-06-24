import { TabsNav } from "../Navbar/TabsNav"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import { Filter } from "../FilterPage/Filter"
import axios from "axios"
import { useEffect, useState } from "react"
import "./A.Food.css"

export const Chaat = () => {

    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [ChaatData , setChaatData] = useState([])

    useEffect(()=>{GetChaatData()},[])
    useEffect(()=>{window.scrollTo({ top: 0, behavior: "smooth" })},[])

    const GetChaatData = () => {
        axios.get("http://localhost:8080/Chaat").then((res)=> setChaatData(res.data))
    }

    const HandlePrice = (value) => {
        setPrice(value);
        
        if(value == "ascPrice"){
            let ascending = ChaatData.sort((a,b) => a.price - b.price)
            setChaatData([...ascending])
        }

        else if(value == "descPrice"){
            let descending = ChaatData.sort((a,b) => b.price - a.price)
            setChaatData([...descending])
        }
    };


    const HandleRating = (value) => {
        setRating(value);

        if(value == "ascRating"){
            let ascending = ChaatData.sort((a,b) => a.rating - b.rating)
            setChaatData([...ascending])
        }

        else if(value == "descRating"){
            let descending = ChaatData.sort((a,b) => b.rating - a.rating)
            setChaatData([...descending])
        }
    };



    return(

        <>

        < ZomatoNav />
        < TabsNav />
        < Filter HandlePrice ={HandlePrice} HandleRating ={HandleRating} price={price} rating={rating} />

        <h1 id="headOrder"> Order your Chaat </h1>

        <div className="Chaat">

            {ChaatData.map((el)=>(

                <div >

                   <div className="imgDiv"><img src={el.imgUrl} /></div>

                    <div className="flxBox">
                        <h1>{el.name}</h1>
                        <span>Rs . {el.price}</span>
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