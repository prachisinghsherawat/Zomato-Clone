import { useEffect, useState } from "react"
import "./Cart.css"
import axios from "../Data/api"
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

        // When the cart is opened directly (no item passed in), just show
        // whatever is already in the cart instead of crashing.
        if (!foodData || !foodData.name) {
            getCartData()
            return
        }

        const { id, ...rest } = foodData
        let data = {...rest ,quantity : 1}
        //console.log(data)

        axios.post("/cart",data).then(()=> getCartData())
    }
    //console.log(cartData)




    //----------------------------------- Get Food Data -----------------------------------------------------


    const getCartData = () => {

        axios.get("/cart").then((res)=> setCartData(res.data))
    }




    //----------------------------------- Delete Food Data ---------------------------------------------------

    const cartDelete = (id) => {
        
        setRemove(!remove)
        axios.delete(`/cart/${id}`).then(()=> getCartData())
        
    }



    //----------------------------------- Update Food Data ---------------------------------------------------

    const incrementCounter = (id,el) => {

        let quantity = el.quantity+1;
        setQuantity(quantity)

        let data = {
            ...el, quantity:quantity
        }
        axios.put(`/cart/${id}`,data).then(()=> getCartData())
    }

    const decrementCounter = (id,el) => {
        
        let quantity = el.quantity-1;
        setQuantity(quantity)

        let data = {
            quantity:quantity
        }   
        axios.patch(`/cart/${id}`,data).then(()=> getCartData())
        
        
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

        <div className="cartPage">

            <h1 className="cartHeading">Your Cart</h1>

            {cartData.length === 0 &&
                <p className="cartEmpty">Your cart is empty. Add some delicious food to get started!</p>
            }

            {cartData.map((el)=>(

                <div className="cartBox" key={el.id}>

                    <img src={el.imgUrl} alt={el.name} />

                    <div className="cartInfo">
                        <p className="cartName">{el.name}</p>
                        <span className="cartUnit">Rs. {el.price} each</span>
                    </div>

                    <div className="qtyBox">
                        <button disabled={el.quantity==1} onClick={()=>decrementCounter(el.id , el)}>-</button>
                        <h1>{el.quantity}</h1>
                        <button onClick={()=>incrementCounter(el.id , el)}>+</button>
                    </div>

                    <p className="cartLinePrice">Rs.{el.price * el.quantity} /-</p>

                    <button className="cartRemove" onClick={() => cartDelete(el.id)}>Remove</button>

                </div>

            ))}

            {cartData.length > 0 &&
                <div className="totalDiv">
                    <span className="totalLabel">Total</span>
                    <span className="totalValue">Rs. {total} /-</span>
                    <button onClick={finalAmount}>Buy Now</button>
                </div>
            }

        </div>
    )
}