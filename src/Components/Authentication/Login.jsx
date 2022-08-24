import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { SignUp } from '../Authentication/Signup';
import { app } from '../../firebase.config';
import {getAuth , signInWithPopup , GoogleAuthProvider} from "firebase/auth"
import "./Authentication.css"
import { useNavigate } from 'react-router';



// ------------------------------------- Firebase Authentication -----------------------------------------------


export const Login = () => {

    const navigate = useNavigate()

    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider()

    const Login = async() => {

        let {user} = await signInWithPopup(firebaseAuth , provider)
        console.log(user)

        let details = {name : user.displayName}
        console.log(details)

        localStorage.setItem("userDetails" , JSON.stringify(user.providerData[0]))
    }

    return(

        <>

        <div className="signup">
            
            <div className="up">
                <p>Log in</p>
                <p id='ex'>x</p>
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

            <button onClick={()=> navigate("/")} id='submit'>Login Here</button>

            <div className='or'>
                <p>or</p>
            </div>

            <button onClick={Login}>Continue with Google</button>

            <div id='bottomIs'>
                <p>New to Zomato?</p>
                <p onClick={()=> navigate("/signup")}>Create an account</p>
            </div>

        </div>



        </>
    )
}
