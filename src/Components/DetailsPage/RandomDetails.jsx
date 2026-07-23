import { useParams } from "react-router"
import { useState, useEffect } from "react"
import axios from "../Data/api"
import { FoodDetail } from "./FoodDetail"

export const RandomDetails = () => {

    const { id } = useParams()
    const [randomData, setRandomData] = useState({})

    useEffect(() => {
        axios.get(`/random/${id}`).then((res) => setRandomData(res.data))
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [id])

    return (
        <FoodDetail
            data={randomData}
            relatedEndpoint="/random"
            relatedBasePath="/delivery"
        />
    )
}
