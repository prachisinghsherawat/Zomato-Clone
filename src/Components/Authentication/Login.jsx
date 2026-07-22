import { AuthForm } from './AuthForm';
import './Authentication.css';

export const Login = () => {
    return (
        <div className="authPage">
            <AuthForm mode="login" />
        </div>
    );
};
