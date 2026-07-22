import { useParams } from "react-router"
import { useState, useEffect } from "react"
import axios from "../Data/api"
import { FoodDetail } from "./FoodDetail"

export const IceCreamDetails = () => {

    const { id } = useParams()
    const [iceCreamData, setIceCreamData] = useState({})

    useEffect(() => {
        axios.get(`/IceCream/${id}`).then((res) => setIceCreamData(res.data))
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [id])

    return (
        <FoodDetail
            data={iceCreamData}
            cart
            relatedEndpoint="/IceCream"
            relatedBasePath="/delivery/ice-cream"
        />
    )
}
