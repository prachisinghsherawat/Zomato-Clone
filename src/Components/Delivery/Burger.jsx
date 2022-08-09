import { TabsNav } from "../Navbar/TabsNav"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import { Filter } from "../FilterPage/Filter"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"
import "./A.Food.css"
import { Footer } from "../Footer/Footer"

export const Burger = () => {

    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [city, setCity] = useState('');
    const [currentCity, setCurrentCity] = useState([]);
    const [BurgerData , setBurgerData] = useState([])
    const navigate = useNavigate()


    useEffect(()=>{GetBurgerData()},[])
    useEffect(()=>{window.scrollTo({ top: 0, behavior: "smooth" })},[])


    const HandleCities = (value) => {
        setCity(value);

        let cityFilter = BurgerData.filter((el) => el.place == value )
        setCurrentCity([...cityFilter])
    }; 
    

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
        axios.get("https://zomatodataapi.herokuapp.com/Burger").then((res)=> setBurgerData(res.data))
    }


    return(
        <>

        < ZomatoNav HandleCities={HandleCities} city={city} />
        < TabsNav />
        < Filter HandlePrice ={HandlePrice} HandleRating ={HandleRating} price={price} rating={rating} />

        <h1 id="headOrder"> Order your Burger </h1>

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
            {BurgerData.map((el)=>(

                <div onClick={()=>navigate(`/delivery/burger/${el.id}`)} >

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
