import { TabsNav } from "../Navbar/TabsNav"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import { Filter } from "../FilterPage/Filter"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"
import "./A.Food.css"
import { Footer } from "../Footer/Footer"

export const Pizza = () => {

    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [city, setCity] = useState('');
    const [currentCity, setCurrentCity] = useState([]);
    const [PizzaData , setPizzaData] = useState([])
    const navigate = useNavigate();


    useEffect(()=>{GetPizzaData()},[])
    useEffect(()=>{window.scrollTo({ top: 0, behavior: "smooth" })},[])


    const HandleCities = (value) => {
        setCity(value);

        let cityFilter = PizzaData.filter((el) => el.place == value )
        setCurrentCity([...cityFilter])
    }; 

    
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


    const GetPizzaData = () => {
        axios.get("https://zomatodataapi.herokuapp.com/Pizza").then((res)=> setPizzaData(res.data))
    }





    return(

        <>

        < ZomatoNav  HandleCities={HandleCities} city={city} />
        < TabsNav />
        < Filter HandlePrice ={HandlePrice} HandleRating ={HandleRating} price={price} rating={rating} />

        <h1 id="headOrder"> Order your Pizza </h1>

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
            {PizzaData.map((el)=>(

                <div onClick={()=>navigate(`/delivery/pizza/${el.id}`)} >

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