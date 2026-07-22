import { Input, Button } from 'antd';
import { GoogleOutlined, CloseOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../../firebase.config';
import { useNavigate } from 'react-router-dom';
import './Authentication.css';

// Shared login / signup form used by the modal (PopUp) and the standalone
// /login and /signup pages.
export const AuthForm = ({ mode = 'login', onClose, switchMode }) => {

    const navigate = useNavigate();
    const isLogin = mode === 'login';
    const [data, setData] = useState({ email: '', password: '' });

    const handleChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const finish = () => {
        if (onClose) onClose();
        navigate('/');
    };

    const handleSubmit = () => {
        const arr = JSON.parse(localStorage.getItem('signupDetails') || '[]');
        arr.push(data);
        localStorage.setItem('signupDetails', JSON.stringify(arr));
        finish();
    };

    const googleAuth = async () => {
        const provider = new GoogleAuthProvider();
        const { user } = await signInWithPopup(getAuth(app), provider);
        localStorage.setItem('userDetails', JSON.stringify(user.providerData[0]));
        finish();
    };

    const goSwitch = () => {
        if (switchMode) switchMode(isLogin ? 'signup' : 'login');
        else navigate(isLogin ? '/signup' : '/login');
    };

    return (
        <div className="sign">

            <div className="up">
                <p>{isLogin ? 'Log in' : 'Sign up'}</p>
                {onClose && <span id="ex" onClick={onClose}><CloseOutlined /></span>}
            </div>

            <div className="authFields">
                <Input
                    size="large"
                    id="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={handleChange}
                />
                <Input.Password
                    size="large"
                    id="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={handleChange}
                />
            </div>

            <Button id="submit" type="primary" block size="large" onClick={handleSubmit}>
                {isLogin ? 'Login' : 'Create account'}
            </Button>

            <div className="or"><p>or</p></div>

            <Button block size="large" icon={<GoogleOutlined />} onClick={googleAuth}>
                Continue with Google
            </Button>

            <div id="bottomIs">
                <p>{isLogin ? 'New to Zomato?' : 'Already have an account?'}</p>
                <p onClick={goSwitch}>{isLogin ? 'Create an account' : 'Log in'}</p>
            </div>

        </div>
    );
};
