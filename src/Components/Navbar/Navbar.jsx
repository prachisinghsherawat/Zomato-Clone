import { useState } from "react";
import { Avatar, Dropdown, Badge } from "antd";
import {
  UserOutlined, HeartOutlined, ShoppingCartOutlined,
  TagOutlined, SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useFavorites, useCart, useUser } from "../Utils/store";
import PopUp from "../Authentication/PopUp";
import { ProfileMenu } from "./ProfileMenu";
import "./Navbar.css";

const ACTIONS = [
  { key: "search", label: "Search", to: "/search", icon: <SearchOutlined /> },
  { key: "offers", label: "Offers", to: "/offers", icon: <TagOutlined /> },
  { key: "favorites", label: "Favourites", to: "/favorites", icon: <HeartOutlined /> },
  { key: "cart", label: "Cart", to: "/cart", icon: <ShoppingCartOutlined /> },
];

// Home / global header. Badge counts come from the shared store, so they stay
// in step with the cart page instead of being fetched separately.
export const Navbar = ({ solid = false }) => {

  const navigate = useNavigate();
  const favs = useFavorites();
  const { count: cartCount } = useCart();
  const user = useUser();

  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [menuOpen, setMenuOpen] = useState(false);

  const openAuth = (mode) => { setAuthMode(mode); setAuthOpen(true); };

  return (
    <>
      <header id="navbar" className={solid ? "navSolid" : ""}>
        <div className="navInner">
          <span className="navBrand" onClick={() => navigate("/")}>zomato</span>

          <nav className="navLinks">
            {/* Search / Offers / Favourites / Cart all share one shape and one
                colour — only the badge differs. */}
            {ACTIONS.map((a) => {
              const count = a.key === "favorites" ? favs.length : a.key === "cart" ? cartCount : 0;
              return (
                <button key={a.key} className="navAction" onClick={() => navigate(a.to)}>
                  <Badge count={count} size="small" color="#ffffff" style={{ color: "#cb202d" }} offset={[2, 0]}>
                    {a.icon}
                  </Badge>
                  <span className="navLinkText">{a.label}</span>
                </button>
              );
            })}
          </nav>

          {/* The panel is a real component, not an antd menu — see ProfileMenu. */}
          <Dropdown
            open={menuOpen}
            onOpenChange={setMenuOpen}
            placement="bottomRight"
            trigger={["click"]}
            classNames={{ root: "profileDrop" }}
            popupRender={() => (
              <ProfileMenu
                onNavigate={() => setMenuOpen(false)}
                onLogin={() => openAuth("login")}
                onSignup={() => openAuth("signup")}
              />
            )}
          >
            <Avatar
              size={38}
              src={user?.photoURL}
              icon={<UserOutlined />}
              style={{ cursor: "pointer", backgroundColor: "#ffffff", color: "#cb202d" }}
            />
          </Dropdown>
        </div>
      </header>

      <PopUp
        open={authOpen}
        checkauth={authMode}
        handleClose={() => setAuthOpen(false)}
      />
    </>
  );
};
