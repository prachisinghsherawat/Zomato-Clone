import { useParams } from "react-router"
import { useState, useEffect } from "react"
import axios from "../Data/api"
import { FoodDetail } from "../DetailsPage/FoodDetail"

export const DinningDetails = () => {

    const { id } = useParams()
    const [dinningData, setDinningData] = useState({})

    useEffect(() => {
        axios.get(`/restaurants/${id}`).then((res) => setDinningData(res.data))
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [id])

    return (
        <FoodDetail
            data={dinningData}
            relatedEndpoint="/restaurants"
            relatedBasePath="/dinning"
        />
    )
}
