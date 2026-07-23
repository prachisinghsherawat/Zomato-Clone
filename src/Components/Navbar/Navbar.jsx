import { useState } from "react";
import { Avatar, Dropdown, Badge } from "antd";
import {
  UserOutlined, HeartOutlined, ShoppingCartOutlined,
  TagOutlined, SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useFavorites, useCart, useUser, signOut } from "../Utils/store";
import PopUp from "../Authentication/PopUp";
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

  const openAuth = (mode) => { setAuthMode(mode); setAuthOpen(true); };

  const items = user
    ? [
        { key: "name", label: <b>{user.name || user.email || "Foodie"}</b>, disabled: true },
        { type: "divider" },
        { key: "favorites", label: "Favourites", onClick: () => navigate("/favorites") },
        { key: "cart", label: "My Cart", onClick: () => navigate("/cart") },
        { key: "orders", label: "My Orders", onClick: () => navigate("/orders") },
        { type: "divider" },
        { key: "logout", label: "Log out", onClick: () => signOut() },
      ]
    : [
        { key: "login", label: "Log in", onClick: () => openAuth("login") },
        { key: "signup", label: "Sign Up", onClick: () => openAuth("signup") },
      ];

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

          <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]}>
            <Avatar
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
