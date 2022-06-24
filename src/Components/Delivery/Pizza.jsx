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

    useEffect(()=>{GetPizzaData()},[])
    useEffect(()=>{window.scrollTo({ top: 0, behavior: "smooth" })},[])

    const GetPizzaData = () => {
        axios.get("http://localhost:8080/Pizza").then((res)=> setPizzaData(res.data))
    }

    const HandlePrice = (value) => {
        setPrice(value);
        
        if(value == "ascPrice"){
            let ascending = PizzaData.sort((a,b) => a.price - b.price)
            setPizzaData([...ascending])
        }

        else if(value == "descPrice"){
            let descending = PizzaData.sort((a,b) => b.price - a.price)
            setPizzaData([...descending])
        }
    };


    const HandleRating = (value) => {
        setRating(value);

        if(value == "ascRating"){
            let ascending = PizzaData.sort((a,b) => a.rating - b.rating)
            setPizzaData([...ascending])
        }

        else if(value == "descRating"){
            let descending = PizzaData.sort((a,b) => b.rating - a.rating)
            setPizzaData([...descending])
        }
    };




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