import { useEffect, useState } from "react"
import "./Cart.css"
import axios from "axios"
import { useNavigate } from "react-router"



export const CartPage = ({foodData}) => {

    const [cartData , setCartData] = useState([])
    const [total , setTotal] = useState(0)
    const [quantity , setQuantity] = useState(1)
    const [remove , setRemove] = useState(false)

    const navigate = useNavigate()

    useEffect(()=> { addFoodData() },[])
    useEffect(()=> { totalPrice() },[quantity,remove])


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
        
        setRemove(!remove)
        axios.delete(`https://zomatodataapi.herokuapp.com/cart/${id}`).then(()=> getCartData())
        
    }



    //----------------------------------- Update Food Data ---------------------------------------------------

    const incrementCounter = (id,el) => {

        let quantity = el.quantity+1;
        setQuantity(quantity)

        let data = {
            ...el, quantity:quantity
        }
        axios.put(`https://zomatodataapi.herokuapp.com/cart/${id}`,data).then(()=> getCartData())
    }

    const decrementCounter = (id,el) => {
        
        let quantity = el.quantity-1;
        setQuantity(quantity)

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

    const finalAmount = () => {

        localStorage.setItem("total" , JSON.stringify(total))
        navigate("/payment")
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

                <p>Rs.{el.price * el.quantity} /-</p>

                <button onClick={() => cartDelete(el.id)}>Remove</button>

            </div>

        ))}

        <hr />

        <div className="totalDiv">

            <p>Total -</p>
            <p>Rs.{total} /-</p>
            <button onClick={finalAmount}>Buy Now</button>

        </div>
        
        </>
    )
}