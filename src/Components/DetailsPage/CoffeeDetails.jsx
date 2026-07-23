import { useParams } from "react-router"
import { useState, useEffect } from "react"
import axios from "../Data/api"
import { FoodDetail } from "./FoodDetail"

export const CoffeeDetails = () => {

    const { id } = useParams()
    const [coffeeData, setCoffeeData] = useState({})

    useEffect(() => {
        axios.get(`/coffee/${id}`).then((res) => setCoffeeData(res.data))
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [id])

    return (
        <FoodDetail
            data={coffeeData}
            relatedEndpoint="/coffee"
            relatedBasePath="/delivery/coffee"
        />
    )
}
