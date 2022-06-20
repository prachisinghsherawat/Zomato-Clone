import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./Navbar.css"

export const ZomatoNav = () => {

    const [age, setAge] = React.useState('');
    const [value, setValue] = React.useState(0);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const HandleChange = (event, newValue) => {
        setValue(newValue);
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
                      value={age}
                      label=""
                      onChange={handleChange}>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ghaziabad</MenuItem>
                      <MenuItem value={20}>New Delhi</MenuItem>
                      <MenuItem value={30}>Gurgaon</MenuItem>
                      <MenuItem value={30}>Noida</MenuItem>
                    </Select>
                </FormControl> 

               <div className="or"> | </div> 

               <button><SearchIcon id="sIcon" /></button>  

               <input type="text" placeholder='Search for your favourite dish' id='searchFood' />          
                
            </div>
           
            <a href="">Log in</a>
            <a href="">Sign up</a>

        </div> 

        </>
    )
}

