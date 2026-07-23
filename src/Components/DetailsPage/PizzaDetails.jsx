import { useParams } from "react-router"
import { useState, useEffect } from "react"
import axios from "../Data/api"
import { FoodDetail } from "./FoodDetail"

export const PizzaDetails = () => {

    const { id } = useParams()
    const [pizzaData, setPizzaData] = useState({})

    useEffect(() => {
        axios.get(`/pizza/${id}`).then((res) => setPizzaData(res.data))
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [id])

    return (
        <FoodDetail
            data={pizzaData}
            relatedEndpoint="/pizza"
            relatedBasePath="/delivery/pizza"
        />
    )
}
