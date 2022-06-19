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

             
        <div className="tabsDiv">

            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={HandleChange} aria-label="basic tabs example">
                        <Tab label="Delivery" {...a11yProps(0)} />
                        <Tab label="Dinning Out" {...a11yProps(1)} />
                        <Tab label="Nightlife" {...a11yProps(2)} />
                    </Tabs>
                </Box>

              <TabPanel value={value} index={0}>
                {/* Item One */}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {/* Item Two */}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {/* Item Three */}
              </TabPanel>


            </Box>

        </div>




        
        </>
    )
}


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


