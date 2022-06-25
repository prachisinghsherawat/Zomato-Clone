import { TabsNav } from "../Navbar/TabsNav"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import { Filter } from "../FilterPage/Filter"
import axios from "axios"
import { useEffect, useState } from "react"
import "./A.Food.css"

export const IceCream = () => {

    const [prIce, setPrIce] = useState('');
    const [rating, setRating] = useState('');
    const [IceCreamData , setIceCreamData] = useState([])

    useEffect(()=>{GetIceCreamData()},[])
    useEffect(()=>{window.scrollTo({ top: 0, behavior: "smooth" })},[])

    const GetIceCreamData = () => {
        axios.get("http://localhost:8080/IceCream").then((res)=> setIceCreamData(res.data))
    }

    const HandlePrice = (value) => {
        setPrIce(value);
        
        if(value == "ascPrice"){
            let ascending = IceCreamData.sort((a,b) => a.price - b.price)
            setIceCreamData([...ascending])
        }

        else if(value == "descPrice"){
            let descending = IceCreamData.sort((a,b) => b.price - a.price)
            setIceCreamData([...descending])
        }
    };


    const HandleRating = (value) => {
        setRating(value);

        if(value == "ascRating"){
            let ascending = IceCreamData.sort((a,b) => a.rating - b.rating)
            setIceCreamData([...ascending])
        }

        else if(value == "descRating"){
            let descending = IceCreamData.sort((a,b) => b.rating - a.rating)
            setIceCreamData([...descending])
        }
    };




    return(

        <>

        < ZomatoNav  HandleCities={HandleCities} city={city} />
        < TabsNav />
        < Filter HandlePrIce ={HandlePrice} HandleRating ={HandleRating} prIce={prIce} rating={rating} />

        <h1 id="headOrder"> Order your IceCream </h1>

       {currentCity.length ?

        <div className="random">
            {currentCity.map((el)=>(

                <div >

                    <div className="imgDiv"><img src={el.imgUrl} /></div>

                    <div className="flxBox">
                        <h1>{el.name}</h1>
                        <span>Rs. {el.price}</span>
                    </div>

                    <div className="priceBox">
                        <p>{el.variety}</p>
                        <span>{el. rating}</span>
                    </div>
                    
                    
                </div>
            ))}

        </div>

        :

        <div className="random">
            {ChaatData.map((el)=>(

                <div >

                    <div className="imgDiv"><img src={el.imgUrl} /></div>

                    <div className="flxBox">
                        <h1>{el.name}</h1>
                        <span>Rs. {el.price}</span>
                    </div>

                    <div className="priceBox">
                        <p>{el.variety}</p>
                        <span>{el. rating}</span>
                    </div>
                    
                    
                </div>
            ))}

        </div>

        }

        </>
    )
}