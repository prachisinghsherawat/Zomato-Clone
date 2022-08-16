import { useEffect, useState } from "react"
import "./Cart.css"
import axios from "axios"

export const CartPage = ({foodData}) => {

    const [cartData , setCartData] = useState([])
    useEffect(()=> {addFoodData()},[])

    const addFoodData = () => {

        delete foodData.id
        let data = {...foodData ,quantity : 1}
        //console.log(data)

        axios.post("https://zomatodataapi.herokuapp.com/cart",data).then(()=> getCartData())
    }
    //console.log(cartData)

    const getCartData = () => {
        axios.get("https://zomatodataapi.herokuapp.com/cart").then((res)=> setCartData(res.data))
    }

    const cartDelete = (id) => {
        axios.delete(`https://zomatodataapi.herokuapp.com/cart/${id}`).then(()=> getCartData())
    }


    return(
        
        <>

        {cartData.map((el)=>(

            <div className="cartBox">

                <img src={el.imgUrl} alt="food" />
                <p>{el.name}</p>

                <div>
                    <button>-</button>
                    <h1>{el.quantity}</h1>
                    <button>+</button>
                </div>

                <p>Rs.{el.price}</p>

                <button onClick={() => cartDelete(el.id)}>Remove</button>

            </div>


        ))}
        
        </>
    )
}