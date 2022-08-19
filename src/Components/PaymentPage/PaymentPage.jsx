
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router';
import "./Payment.css"

export function PaymentPage() {

    const navigate = useNavigate()

    const [ formData , setFormData] = React.useState({
        name : "",
        cardNo : "",
        expiry :"",
        cvv : ""
    })

    let price = JSON.parse(localStorage.getItem("total"))

    const HandleChange = (e) => {

        const {id,value} = e.target;
        setFormData({...formData , [id] : value})
    }

    const HandleSubmit = () => {

        console.log(formData.cardNo.length)

        if(formData.name !=="" && formData.cardNo.length == 16 && formData.expiry.length == 5 && formData.cvv.length == 3   ){
            navigate("/paymentsuccessful")
        }
        
        else{
            alert("write correct details !")
        }
    }

  return (
    <>
    <div className="payment">

    <div className="pricePage">

        <p>TO PAY ONLY</p>
        <h1>Rs. {price} /-</h1>
    </div>



    <div className="paymentBox">

    <h1 id="mypay">YOUR CARD DETAILS</h1>
    <Box
      sx={{
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}
    >
      <TextField className="inputIs" onChange={HandleChange}
        id="name"
        label="Name"
      /> 

     <TextField className="inputIs" onChange={HandleChange}
        id="cardNo"
        label="Card Number"
      /> 

      <TextField className="inputIs" onChange={HandleChange}
        id="expiry"
        label="Expiry Date"
      /> 

      <TextField className="inputIs" onChange={HandleChange}
        id="cvv"
        label="CVV"
      /> 
    
     {/* ---------------------- Button --------------------------------------- */}


    <Stack direction="row" spacing={2}>
      <Button onClick={HandleSubmit} id='paymentBtn' variant="contained">Submit Here</Button>
    </Stack>
 
    </Box>
    </div>
    
    </div>
    </>
  );
}