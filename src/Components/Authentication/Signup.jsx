import { AuthForm } from './AuthForm';
import './Authentication.css';

export const SignUp = () => {
    return (
        <div className="authPage">
            <AuthForm mode="signup" />
        </div>
    );
};
