import { Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Navbar.css';

const items = [
  { key: 'profile', label: 'Profile' },
  { key: 'account', label: 'Account' },
  { key: 'dashboard', label: 'Dashboard' },
  { type: 'divider' },
  { key: 'logout', label: 'Logout' },
];

export const Navbar = () => {

  const user = JSON.parse(localStorage.getItem('userDetails'));

  return (
    <header id="navbar">
      <div className="navInner">
        <a href="/" className="navBrand">zomato</a>

        <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
          <Avatar
            src={user?.photoURL}
            icon={<UserOutlined />}
            style={{ cursor: 'pointer', backgroundColor: '#ffffff', color: '#cb202d' }}
          />
        </Dropdown>
      </div>
    </header>
  );
};
