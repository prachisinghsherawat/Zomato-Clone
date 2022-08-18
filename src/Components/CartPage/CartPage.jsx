import { useEffect, useState } from "react"
import "./Cart.css"
import axios from "axios"



export const CartPage = ({foodData}) => {

    const [cartData , setCartData] = useState([])
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

    const incrementCounter = (id,el) => {

        let quan1 = el.quantity+1
        axios.patch(`https://zomatodataapi.herokuapp.com/cart/${id}`,quan1).then(()=> getCartData())
    }

    const decrementCounter = (id,el) => {

        let quan2 = el.quantity-1
        axios.patch(`https://zomatodataapi.herokuapp.com/cart/${id}`,quan2).then(()=> getCartData())
    }
    


    return(
        
        <>

        {cartData.map((el)=>(

            <div className="cartBox">

                <img src={el.imgUrl} alt="food" />
                <p>{el.name}</p>

                <div>
                    <button onClick={()=>decrementCounter(el.id , el)}>-</button>
                    <h1>{el.quantity}</h1>
                    <button onClick={()=>incrementCounter(el.id , el)}>+</button>
                </div>

                <p>Rs.{el.price}</p>

                <button onClick={() => cartDelete(el.id)}>Remove</button>

            </div>


        ))}
        
        </>
    )
}