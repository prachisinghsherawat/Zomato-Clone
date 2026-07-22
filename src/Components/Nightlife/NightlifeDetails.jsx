import { useParams } from "react-router"
import { useState, useEffect } from "react"
import axios from "../Data/api"
import { FoodDetail } from "../DetailsPage/FoodDetail"

export const NightDetails = () => {

    const { id } = useParams()
    const [nightData, setNightData] = useState({})

    useEffect(() => {
        axios.get(`/restaurants/${id}`).then((res) => setNightData(res.data))
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [id])

    return (
        <FoodDetail
            data={nightData}
            relatedEndpoint="/restaurants"
            relatedBasePath="/nightlife"
        />
    )
}
