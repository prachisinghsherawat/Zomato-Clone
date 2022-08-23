import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PopUp({handleOpen , handleClose , open , checkauth}) {
  

    const [data , setData] = React.useState({
      email : "",
      password : "" 
    })

    const HandleChange = (e) => {
      const {id,value} = e.target
      setData({...data , [id]: value})
    }
    //console.log(data)

    let arr = [];

    const HandleSubmit = () => {

      arr.push(data)
      localStorage.setItem("signupDetails",JSON.stringify(arr))
  
    }

    return (
    
      <>

      {

      checkauth == "login" &&

      <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

        <div className='sign'>
            
            <div className="up">
                <p>Log in</p>
                <p onClick={handleClose} id='ex'>x</p>
            </div>
            
            <Box
               sx={{
                width: 500,
                maxWidth: '100%',
               }}>
               <TextField fullWidth label="Full Name" id="full_name" />
            </Box><br />

            <Box
              sx={{
                width: 500,
                maxWidth: '100%',
              }}>
              <TextField fullWidth label="Email" id="email" />
            </Box><br />

            <button id='submit'>Login Here</button>

            <div className='or'>
                <p>or</p>
            </div>

            <button>Continue with Google</button>

            <div id='bottomIs'>
                <p>New to Zomato?</p>
                <p>Create an account</p>
            </div>

        </div>

        </Box>
      </Modal>
    </div>

    }

    {
      checkauth == "signup" &&

      <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

        <div className="sign">
            
            <div className="up">
              <p>Sign up</p>
              <p onClick={handleClose} id='ex'>x</p>
            </div>
        
            <Box
              sx={{
                width: 500,
                maxWidth: '100%',
              }}>
              <TextField fullWidth label="Email" id="email" onChange={HandleChange} />
            </Box><br />

            <Box
               sx={{
                width: 500,
                maxWidth: '100%',
               }}>
               <TextField fullWidth label="Password" id="password" type="password" onChange={HandleChange} />
            </Box><br />


            <button onClick={HandleSubmit} id='submit'>Create account</button>

            <div className='or'>
                <p>or</p>
            </div>

            <button>Continue with Google</button>

            <div id='bottomIs'>
                <p>Already have an Account ?</p>
                <p>Log in</p>
            </div>

        </div>

        </Box>
      </Modal>
    </div>

    }

  </>
  );
}

