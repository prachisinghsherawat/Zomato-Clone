import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./Authentication.css"

export const SignUp = () => {

    return(

        <>

        <div className="signup">
            
            <div className="up">
                <p>Sign up</p>
                <p>x</p>
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

            <button id='submit'>Create account</button>

            <div className='or'>
                <p>or</p>
            </div>

            <button>Continue with Google</button>

            <div id='bottomIs'>
                <p>Already have an Account ?</p>
                <p>Log in</p>
            </div>

        </div>



        </>
    )
}