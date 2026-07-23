import { useParams, useLocation } from "react-router"
import { useState, useEffect } from "react"
import axios from "../Data/api"
import { FoodDetail } from "./FoodDetail"

export const SearchDetails = () => {

    const { id } = useParams()
    const { state } = useLocation()
    // Cards pass the exact item via router state so a restaurant sourced from
    // `/restaurants` isn't mismatched against a same-id `/global` entry.
    const [searchData, setSearchData] = useState(state?.item || {})

    useEffect(() => {
        if (state?.item && String(state.item.id) === String(id)) {
            setSearchData(state.item)
        } else {
            axios.get(`/global/${id}`).then((res) => setSearchData(res.data))
        }
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [id, state])

    return (
        <FoodDetail
            data={searchData}
            relatedEndpoint="/global"
            relatedBasePath="/search-details"
        />
    )
}
