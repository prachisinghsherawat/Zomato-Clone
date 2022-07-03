import { TabsNav } from "../Navbar/TabsNav"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import { Filter } from "../FilterPage/Filter"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"
import "./A.Food.css"
import { Footer } from "../Footer/Footer"

export const Cake = () => {

    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [city, setCity] = useState('');
    const [currentCity, setCurrentCity] = useState([]);
    const [CakeData , setCakeData] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{GetCakeData()},[])
    useEffect(()=>{window.scrollTo({ top: 0, behavior: "smooth" })},[])


    const HandleCities = (value) => {
        setCity(value);

        let cityFilter = CakeData.filter((el) => el.place == value )
        setCurrentCity([...cityFilter])
    }; 
    

    const GetCakeData = () => {
        axios.get("https://zomatodataapi.herokuapp.com/Cake").then((res)=> setCakeData(res.data))
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

        < ZomatoNav  HandleCities={HandleCities} city={city} />
        < TabsNav />
        < Filter HandlePrice ={HandlePrice} HandleRating ={HandleRating} price={price} rating={rating} />

        <h1 id="headOrder"> Order your Cake </h1>

        {currentCity.length ?

        <div className="random">
            {currentCity.map((el)=>(

                <div>

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
            {CakeData.map((el)=>(

                <div onClick={()=>navigate(`/delivery/cake/${el.id}`)} >

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