import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircleFilled } from '@ant-design/icons';
import { AuthForm } from './AuthForm';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import { useUser } from '../Utils/store';
import './Authentication.css';

const PERKS = [
    'Save your favourite restaurants',
    'Track every order in one place',
    'Exclusive coupons and free delivery',
];

// Standalone /login and /signup pages. Both were bare centred cards with no
// header or footer before; they now sit in the normal app chrome and send you
// back where you came from after signing in.
export const AuthPage = ({ mode }) => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const user = useUser();
    const from = state?.from || '/';

    // Already signed in? There is nothing to do on this page.
    useEffect(() => {
        if (user) navigate(from, { replace: true });
    }, [user, from, navigate]);

    return (
        <>
            <Navbar solid />

            <div className="authPage">
                <div className="authPanel">

                    <aside className="authAside">
                        <h2>{mode === 'login' ? 'Good to see you again' : 'Join the table'}</h2>
                        <p>Delhi NCR's kitchens are a couple of taps away.</p>
                        <ul>
                            {PERKS.map((p) => (
                                <li key={p}><CheckCircleFilled /> {p}</li>
                            ))}
                        </ul>
                    </aside>

                    <div className="authCard">
                        <AuthForm mode={mode} onDone={() => navigate(from, { replace: true })} />
                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
};
