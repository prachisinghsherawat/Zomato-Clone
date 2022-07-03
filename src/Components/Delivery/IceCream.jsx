import { TabsNav } from "../Navbar/TabsNav"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import { Filter } from "../FilterPage/Filter"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"
import "./A.Food.css"
import { Footer } from "../Footer/Footer"

export const IceCream = () => {

    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [city, setCity] = useState('');
    const [currentCity, setCurrentCity] = useState([]);
    const [IceCreamData , setIceCreamData] = useState([]);
    const navigate = useNavigate();


    useEffect(()=>{GetIceCreamData()},[])
    useEffect(()=>{window.scrollTo({ top: 0, behavior: "smooth" })},[])


    const HandleCities = (value) => {
        setCity(value);

        let cityFilter = IceCreamData.filter((el) => el.place == value )
        setCurrentCity([...cityFilter])
    }; 

   

    const HandlePrice = (value) => {
        setPrice(value);
        
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


    const GetIceCreamData = () => {
        axios.get("https://zomatodataapi.herokuapp.com/IceCream").then((res)=> setIceCreamData(res.data))
    }



    return(

        <>

        < ZomatoNav  HandleCities={HandleCities} city={city} />
        < TabsNav />
        < Filter HandlePrice ={HandlePrice} HandleRating ={HandleRating} price={price} rating={rating} />

        <h1 id="headOrder"> Order your Ice Cream </h1>

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
            {IceCreamData.map((el)=>(

                <div onClick={()=>navigate(`/delivery/ice-cream/${el.id}`)} >

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

        <div className="footerDiv">
            <Footer />
        </div>

        </>
    )
}