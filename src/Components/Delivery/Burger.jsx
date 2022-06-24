import { TabsNav } from "../Navbar/TabsNav"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import { Filter } from "../FilterPage/Filter"
import axios from "axios"
import { useEffect, useState } from "react"
import "./A.Food.css"

export const Burger = () => {

    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [burgerData , setBurgerData] = useState([])


    useEffect(()=>{GetBurgerData()},[])
    useEffect(()=>{window.scrollTo({ top: 0, behavior: "smooth" })},[])


    const HandlePrice = (value) => {
        setPrice(value);
        
        if(value == "ascPrice"){
            let ascending = BurgerData.sort((a,b) => a.price - b.price)
            setBurgerData([...ascending])
        }

        else if(value == "descPrice"){
            let descending = BurgerData.sort((a,b) => b.price - a.price)
            setBurgerData([...descending])
        }
    };


    const HandleRating = (value) => {
        setRating(value);

        if(value == "ascRating"){
            let ascending = BurgerData.sort((a,b) => a.rating - b.rating)
            setBurgerData([...ascending])
        }

        else if(value == "descRating"){
            let descending = BurgerData.sort((a,b) => b.rating - a.rating)
            setBurgerData([...descending])
        }
    };

    const GetBurgerData = () => {
        axios.get("http://localhost:8080/Burger").then((res)=> setBurgerData(res.data))
    }



    return(

        <>

        < ZomatoNav />
        < TabsNav />
        < Filter HandlePrice ={HandlePrice} HandleRating ={HandleRating} price={price} rating={rating} />

        <h1 id="headOrder"> Order your Burger </h1>

        <div className="Burger">

            {burgerData.map((el)=>(

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