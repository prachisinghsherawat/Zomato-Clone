import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { app } from '../../firebase.config';
import {getAuth , signInWithPopup , GoogleAuthProvider} from "firebase/auth"
import "./Authentication.css"
import { useNavigate } from 'react-router';

let arr = [];

export const SignUp = () => {

    const navigate = useNavigate()

    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider()

    const [data , setData] = React.useState({
        email : "",
        password : "" 
    })

    const HandleChange = (e) => {

        const {id,value} = e.target
        setData({...data , [id]: value})
    }
    console.log(data)

    
    const HandleSubmit = () => {

        arr.push(data)
        localStorage.setItem("signupDetails",JSON.stringify(arr))
        navigate("/login")
    }

    const SignUp = async() => {

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
                <p>Sign up</p>
                <p id='ex'>x</p>
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

            <button onClick={SignUp}>Continue with Google</button>

            <div id='bottomIs'>
                <p>Already have an Account ?</p>
                <p onClick={()=> navigate("/login")}>Log in</p>
            </div>

        </div>

        </>
    )
}
