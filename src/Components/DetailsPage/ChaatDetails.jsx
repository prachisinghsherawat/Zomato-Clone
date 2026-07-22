import { useParams } from "react-router"
import { useState, useEffect } from "react"
import axios from "../Data/api"
import { FoodDetail } from "./FoodDetail"

export const ChaatDetails = () => {

    const { id } = useParams()
    const [chaatData, setChaatData] = useState({})

    useEffect(() => {
        axios.get(`/chaat/${id}`).then((res) => setChaatData(res.data))
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [id])

    return (
        <FoodDetail
            data={chaatData}
            cart
            relatedEndpoint="/chaat"
            relatedBasePath="/delivery/chaat"
        />
    )
}
