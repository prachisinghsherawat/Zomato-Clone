import { useParams } from "react-router"
import { useState, useEffect } from "react"
import axios from "../Data/api"
import { FoodDetail } from "./FoodDetail"

export const BurgerDetails = () => {

    const { id } = useParams()
    const [burgerData, setBurgerData] = useState({})

    useEffect(() => {
        axios.get(`/burger/${id}`).then((res) => setBurgerData(res.data))
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [id])

    return (
        <FoodDetail
            data={burgerData}
            cart
            relatedEndpoint="/burger"
            relatedBasePath="/delivery/burger"
        />
    )
}
