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


    return(
        
        <>

        <div className="cartBox"></div>
        
        </>
    )
}