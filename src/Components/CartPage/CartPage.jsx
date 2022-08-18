import { useEffect, useState } from "react"
import "./Cart.css"
import axios from "axios"



export const CartPage = ({foodData}) => {

    const [cartData , setCartData] = useState([])
    const [total , setTotal] = useState("")

    useEffect(()=> {        
        addFoodData()
    },[])


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

        let quantity = el.quantity+1;

        let data = {
            ...el, quantity:quantity
        }
        axios.put(`https://zomatodataapi.herokuapp.com/cart/${id}`,data).then(()=> getCartData())
    }

    const decrementCounter = (id,el) => {

        // if(el.quantity == 1){

        //     axios.delete(`https://zomatodataapi.herokuapp.com/cart/${id}`).then(()=> getCartData())
        // }
        
            let quantity = el.quantity-1;

            let data = {
                quantity:quantity
            }   
            axios.patch(`https://zomatodataapi.herokuapp.com/cart/${id}`,data).then(()=> getCartData())
        
        
    }

    const totalPrice = () => {

        let totalSum = 0

        cartData.map((el)=>{
            totalSum += (el.quantity * el.price)
        })

        setTotal(totalSum)

    }
    


    return(
        
        <>

        {cartData.map((el)=>(

            <div className="cartBox">

                <img src={el.imgUrl} alt="food" />
                <p>{el.name}</p>

                <div>
                    <button disabled={el.quantity==1} onClick={()=>decrementCounter(el.id , el)}>-</button>
                    <h1>{el.quantity}</h1>
                    <button onClick={()=>incrementCounter(el.id , el)}>+</button>
                </div>

                <p>Rs.{el.price * el.quantity}</p>

                <button onClick={() => cartDelete(el.id)}>Remove</button>

            </div>

        ))}

        <hr />

        <div className="totalDiv">
            <p>Total : {total}</p>
            <button>Buy Now</button>
        </div>
        
        </>
    )
}