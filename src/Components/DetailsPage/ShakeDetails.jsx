import { useParams } from "react-router"
import { useState, useEffect } from "react"
import axios from "../Data/api"
import { FoodDetail } from "./FoodDetail"

export const ShakeDetails = () => {

    const { id } = useParams()
    const [shakeData, setShakeData] = useState({})

    useEffect(() => {
        axios.get(`/shake/${id}`).then((res) => setShakeData(res.data))
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [id])

    return (
        <FoodDetail
            data={shakeData}
            relatedEndpoint="/shake"
            relatedBasePath="/delivery/shake"
        />
    )
}
