import { useParams } from "react-router"
import { useState, useEffect } from "react"
import axios from "../Data/api"
import { FoodDetail } from "./FoodDetail"

export const CakeDetails = () => {

    const { id } = useParams()
    const [cakeData, setCakeData] = useState({})

    useEffect(() => {
        axios.get(`/cake/${id}`).then((res) => setCakeData(res.data))
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [id])

    return (
        <FoodDetail
            data={cakeData}
            relatedEndpoint="/cake"
            relatedBasePath="/delivery/cake"
        />
    )
}
