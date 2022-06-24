
import "./Filter.css"
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function Filter({HandlePrice , HandleRating , price , rating}) {

    return (

        <div className="filterPart">

           <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Price</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={price}
                    label="Price"
                    onChange={(e) => HandlePrice(e.target.value)}>

                   <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                        <MenuItem value={"descPrice"}>High to Low</MenuItem>
                        <MenuItem value={"ascPrice"}>Low to High</MenuItem>
                        
                </Select>

            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Rating</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={rating}
                    label="Rating"
                    onChange={(e) => HandleRating(e.target.value)}>

                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                        <MenuItem value={"descRating"}>High to Low</MenuItem>
                        <MenuItem value={"ascRating"}>Low to High</MenuItem>

                </Select>
            </FormControl>

        </div>
    );
}

