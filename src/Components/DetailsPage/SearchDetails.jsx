import { useParams } from "react-router"
import {useState , useEffect} from "react"
import axios from "axios"


export const SearchDetails = () => {

    const {id} = useParams()
    const [searchData , setSearchData] = useState([])
    useEffect(() => {GetSearchData()},[])


    const GetSearchData = () => {
        axios.get(`http://localhost:8080/global/${id}`).then((res)=> setSearchData(res.data))
    }
    console.log(searchData)

    return(

        <>
        {searchData.map((el)=>(
            <div></div>
        ))}
        </>
    )
}