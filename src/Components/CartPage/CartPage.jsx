import { useEffect, useState } from "react"
import "./Cart.css"
import axios from "axios"



export const CartPage = ({foodData}) => {

    const [cartData , setCartData] = useState([])
    const [counter , setCounter] = useState(0)

    useEffect(()=> {addFoodData()},[])



    //---------------------------------- Post Food Data -----------------------------------------------------


    const addFoodData = () => {

        delete foodData.id
        let data = {...foodData ,quantity : 1}
        //console.log(data)

        axios.post("https://zomatodataapi.herokuapp.com/cart",data).then(()=> getCartData())
    }
    //console.log(cartData)




    //----------------------------------- Get Food Data -----------------------------------------------------


    const getCartData = () => {
        axios.get("https://zomatodataapi.herokuapp.com/cart").then((res)=> setCartData(res.data))
    }




    //----------------------------------- Delete Food Data ---------------------------------------------------

    const cartDelete = (id) => {
        axios.delete(`https://zomatodataapi.herokuapp.com/cart/${id}`).then(()=> getCartData())
    }



    //----------------------------------- Update Food Data ---------------------------------------------------


    return(
        
        <>

        {cartData.map((el)=>(

            <div className="cartBox">

                <img src={el.imgUrl} alt="food" />
                <p>{el.name}</p>

                <div>
                    <button onClick={()=>setCounter(counter-1)}>-</button>
                    <h1>{el.quantity}</h1>
                    <button onClick={()=>setCounter(counter+1)}>+</button>
                </div>

                <p>Rs.{el.price}</p>

                <button onClick={() => cartDelete(el.id)}>Remove</button>

            </div>


        ))}
        
        </>
    )
}