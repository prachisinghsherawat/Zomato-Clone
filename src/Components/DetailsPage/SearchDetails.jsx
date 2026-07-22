import { useParams } from "react-router"
import { useState, useEffect } from "react"
import axios from "../Data/api"
import { FoodDetail } from "./FoodDetail"

export const SearchDetails = () => {

    const { id } = useParams()
    const [searchData, setSearchData] = useState({})

    useEffect(() => {
        axios.get(`/global/${id}`).then((res) => setSearchData(res.data))
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [id])

    return (
        <FoodDetail
            data={searchData}
            cart
            relatedEndpoint="/global"
            relatedBasePath="/search-details"
        />
    )
}
