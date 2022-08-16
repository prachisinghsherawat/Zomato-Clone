import { useEffect } from "react"


export const CartPage = ({foodData}) => {

    const [cartData , setCartData] = useState([])
    useEffect(()=> {addFoodData()},[])

    const addFoodData = () => {

        let data = {...foodData ,quantity : 1}
        axios.post("https://zomatodataapi.herokuapp.com/cart",data).then(()=> getCartData())
    }

    const getCartData = () => {
        axios.get("https://zomatodataapi.herokuapp.com/cart").then((res)=> setCartData(res.data))
    }


    return(
        
        <>
        
        </>
    )
}