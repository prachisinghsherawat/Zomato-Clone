
import "./Filter.css"
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function Filter() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

    return (

        <div className="filterPart">

           <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Price</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={age}
                    label="Price"
                    onChange={handleChange}>

                   <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Rating</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={age}
                    label="Rating"
                    onChange={handleChange}>

                   <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>

        </div>
    );
}

