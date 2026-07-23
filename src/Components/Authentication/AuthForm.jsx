import { Input, Button, Alert } from 'antd';
import { GoogleOutlined, CloseOutlined, MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../../firebase.config';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp, signInWithProfile } from '../Utils/store';
import './Authentication.css';

// Shared login / signup form used by the modal (PopUp) and the standalone
// /login and /signup pages.
//
// Credentials are checked against the local account store: signing up creates
// an account, logging in verifies it, and both report a real error instead of
// silently sending you to the home page like the previous version did.
export const AuthForm = ({ mode = 'login', onClose, switchMode, onDone }) => {

    const navigate = useNavigate();
    const isLogin = mode === 'login';

    const [data, setData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);

    const handleChange = (e) => {
        setError('');
        setData({ ...data, [e.target.id]: e.target.value });
    };

    const finish = () => {
        if (onClose) onClose();
        if (onDone) onDone();
        else navigate('/');
    };

    const handleSubmit = () => {
        const result = isLogin ? signIn(data) : signUp(data);
        if (result.error) { setError(result.error); return; }
        finish();
    };

    const googleAuth = async () => {
        setBusy(true);
        setError('');
        try {
            const { user } = await signInWithPopup(getAuth(app), new GoogleAuthProvider());
            const profile = user.providerData[0] || {};
            signInWithProfile({
                name: profile.displayName || profile.email,
                email: profile.email,
                photoURL: profile.photoURL,
            });
            finish();
        } catch (err) {
            // Firebase throws when the popup is dismissed or the domain isn't
            // whitelisted — surface it instead of leaving the button dead.
            setError(
                err?.code === 'auth/popup-closed-by-user'
                    ? 'Google sign-in was cancelled.'
                    : 'Google sign-in is unavailable right now. Use your email instead.'
            );
        } finally {
            setBusy(false);
        }
    };

    const goSwitch = () => {
        setError('');
        if (switchMode) switchMode(isLogin ? 'signup' : 'login');
        else navigate(isLogin ? '/signup' : '/login');
    };

    return (
        <div className="sign">

            <div className="up">
                <div className="upText">
                    <p>{isLogin ? 'Log in' : 'Sign up'}</p>
                    <small>
                        {isLogin
                            ? 'Welcome back — order in a couple of taps.'
                            : 'Save favourites, track orders and check out faster.'}
                    </small>
                </div>
                {onClose && <span id="ex" onClick={onClose}><CloseOutlined /></span>}
            </div>

            {error && <Alert type="error" message={error} showIcon className="authError" />}

            <div className="authFields">
                {!isLogin &&
                    <Input
                        size="large"
                        id="name"
                        prefix={<UserOutlined />}
                        placeholder="Your name"
                        value={data.name}
                        onChange={handleChange}
                        onPressEnter={handleSubmit}
                    />}

                <Input
                    size="large"
                    id="email"
                    type="email"
                    prefix={<MailOutlined />}
                    placeholder="Email"
                    value={data.email}
                    onChange={handleChange}
                    onPressEnter={handleSubmit}
                />

                <Input.Password
                    size="large"
                    id="password"
                    prefix={<LockOutlined />}
                    placeholder={isLogin ? 'Password' : 'Password (min 6 characters)'}
                    value={data.password}
                    onChange={handleChange}
                    onPressEnter={handleSubmit}
                />
            </div>

            <Button id="submit" type="primary" block size="large" onClick={handleSubmit}>
                {isLogin ? 'Log in' : 'Create account'}
            </Button>

            <div className="authOr"><p>or</p></div>

            <Button block size="large" loading={busy} icon={<GoogleOutlined />} onClick={googleAuth}>
                Continue with Google
            </Button>

            <div id="bottomIs">
                <p>{isLogin ? 'New to Zomato?' : 'Already have an account?'}</p>
                <p onClick={goSwitch}>{isLogin ? 'Create an account' : 'Log in'}</p>
            </div>

        </div>
    );
};
