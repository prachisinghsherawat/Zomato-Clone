import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import {useState , useEffect} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import "./Navbar.css"
import PopUp from '../Authentication/PopUp';

export const ZomatoNav = ({HandleCities , city}) => {

    const [searchData , setSearchData] = useState([])
    const [filterData , setFilterData] = useState([])

    const [checkauth , setCheckAuth] = useState("")

    const [open, setOpen] = React.useState(false);
    const handleOpen = (value) => {
        setOpen(true)
        setCheckAuth(value)
    }
    const handleClose = () => setOpen(false);

    const navigate = useNavigate()
    useEffect(() => {GetSearchData()},[])


    const HandlePopDiv = (value) => {

        if(value == ""){
            document.querySelector(".popDiv").style.display = "none"
        }
        else{
            document.querySelector(".popDiv").style.display = "block"
        }

        let searchFiltered = searchData.filter((el)=>el.name.toLowerCase().includes(value.toLowerCase()))
        setFilterData([...searchFiltered])

    }


    const GetSearchData = () => {
        axios.get("https://zomatodataapi.herokuapp.com/global").then((res)=>setSearchData(res.data))
    }


    return(

        <>
        <div className="nav">

            <div className="icon">
                <img src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png" alt="" height="100%" width="100%" />
            </div>

            <div className="search">

                < LocationOnIcon id="locIcon" />

                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small"></InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={city}
                      label=""
                      onChange={(e) => HandleCities(e.target.value)}>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Ghaziabad"}>Ghaziabad</MenuItem>
                      <MenuItem value={"New Delhi"}>New Delhi</MenuItem>
                      <MenuItem value={"Gurgaon"}>Gurgaon</MenuItem>
                      <MenuItem value={"Noida"}>Noida</MenuItem>

                    </Select>
                </FormControl> 

               <div className="or"> | </div> 




               {/* ----------------------------- Search Implementation -------------------------------------- */}

               <button><SearchIcon id="sIcon" /></button>  

               <input type="text" placeholder='Search for your favourite dish' id='searchFood' onChange={(e) => HandlePopDiv(e.target.value)} />         
                
            </div>




            {/* ------------------------- Login And SignUp --------------------------------------- */}
           
            
            <div className="auth">

                <p onClick={() => handleOpen("signup")}>Sign Up</p>
                <p onClick={() => handleOpen("login")}>Login</p>

            </div>

        </div>





        {/* ------------------------------ Search POP-UP Div ---------------------------------------  */}

        <div className="popDiv">

            {filterData.map((el) => (

                <div id='searchBox' key={el.id}  onClick={()=>navigate(`/search-details/${el.id}`)}   >

                    <img src={el.imgUrl} />
                    <p>{el.name}</p>

                </div>
            ))}

        </div>

        

        <PopUp handleClose={handleClose} handleOpen={handleOpen} open={open} checkauth={checkauth} />

        </>
    )
}

