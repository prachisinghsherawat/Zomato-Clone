import { Avatar } from 'antd';
import {
    UserOutlined, HeartOutlined, ShoppingCartOutlined,
    ShoppingOutlined, LogoutOutlined, RightOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCart, useFavorites, useUser, signOut } from '../Utils/store';

// The panel behind the avatar in both headers. It is rendered through the
// Dropdown's `popupRender` rather than as a plain antd menu — the default menu
// gave us a cramped 120px strip with a greyed-out name in it, which is not the
// account panel this needs to be.
export const ProfileMenu = ({ onNavigate, onLogin, onSignup }) => {

    const navigate = useNavigate();
    const user = useUser();
    const favs = useFavorites();
    const { count: cartCount } = useCart();

    const go = (to) => {
        if (onNavigate) onNavigate();
        navigate(to);
    };

    if (!user) {
        return (
            <div className="profileMenu">
                <div className="profileGuest">
                    <Avatar size={46} icon={<UserOutlined />} className="profileGuestAvatar" />
                    <p>Welcome to Zomato</p>
                    <small>Log in to save favourites, track orders and check out faster.</small>
                </div>

                <div className="profileAuthBtns">
                    <button
                        className="profileBtn primary"
                        onClick={() => { if (onNavigate) onNavigate(); onLogin(); }}
                    >
                        Log in
                    </button>
                    <button
                        className="profileBtn ghost"
                        onClick={() => { if (onNavigate) onNavigate(); onSignup(); }}
                    >
                        Create an account
                    </button>
                </div>
            </div>
        );
    }

    const links = [
        { key: 'fav', label: 'Favourites', to: '/favorites', icon: <HeartOutlined />, count: favs.length },
        { key: 'cart', label: 'My Cart', to: '/cart', icon: <ShoppingCartOutlined />, count: cartCount },
        { key: 'orders', label: 'My Orders', to: '/orders', icon: <ShoppingOutlined /> },
    ];

    return (
        <div className="profileMenu">

            <div className="profileHead">
                <Avatar size={46} src={user.photoURL} icon={<UserOutlined />} className="profileHeadAvatar" />
                <div className="profileHeadText">
                    <p>{user.name || user.displayName || 'Foodie'}</p>
                    {user.email && <small>{user.email}</small>}
                </div>
            </div>

            <div className="profileLinks">
                {links.map((l) => (
                    <button key={l.key} className="profileLink" onClick={() => go(l.to)}>
                        <span className="profileLinkIcon">{l.icon}</span>
                        <span className="profileLinkLabel">{l.label}</span>
                        {l.count > 0 && <span className="profileLinkCount">{l.count}</span>}
                        <RightOutlined className="profileLinkArrow" />
                    </button>
                ))}
            </div>

            <div className="profileFoot">
                <button
                    className="profileLink danger"
                    onClick={() => { if (onNavigate) onNavigate(); signOut(); }}
                >
                    <span className="profileLinkIcon"><LogoutOutlined /></span>
                    <span className="profileLinkLabel">Log out</span>
                </button>
            </div>

        </div>
    );
};
