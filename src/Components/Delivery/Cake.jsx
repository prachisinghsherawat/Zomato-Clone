import { TabsNav } from "../Navbar/TabsNav"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import { Filter } from "../FilterPage/Filter"
import axios from "axios"
import { useEffect, useState } from "react"
import "./A.Food.css"

export const Cake = () => {

    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [CakeData , setCakeData] = useState([])

    useEffect(()=>{GetCakeData()},[])
    useEffect(()=>{window.scrollTo({ top: 0, behavior: "smooth" })},[])

    const GetCakeData = () => {
        axios.get("http://localhost:8080/Cake").then((res)=> setCakeData(res.data))
    }


    const HandlePrice = (value) => {
        setPrice(value);
        
        if(value == "ascPrice"){
            let ascending = CakeData.sort((a,b) => a.price - b.price)
            setCakeData([...ascending])
        }

        else if(value == "descPrice"){
            let descending = CakeData.sort((a,b) => b.price - a.price)
            setCakeData([...descending])
        }
    };


    const HandleRating = (value) => {
        setRating(value);

        if(value == "ascRating"){
            let ascending = CakeData.sort((a,b) => a.rating - b.rating)
            setCakeData([...ascending])
        }

        else if(value == "descRating"){
            let descending = CakeData.sort((a,b) => b.rating - a.rating)
            setCakeData([...descending])
        }
    };



    return(

        <>

        < ZomatoNav />
        < TabsNav />
        < Filter HandlePrice ={HandlePrice} HandleRating ={HandleRating} price={price} rating={rating} />

        <h1 id="headOrder"> Order your Cake </h1>

        <div className="Cake">

            {CakeData.map((el)=>(

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