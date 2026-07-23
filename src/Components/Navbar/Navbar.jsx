import { useEffect, useState } from "react";
import { Avatar, Dropdown, Badge } from "antd";
import {
  UserOutlined, HeartOutlined, ShoppingCartOutlined,
  TagOutlined, SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "../Data/api";
import { useFavorites } from "../Utils/store";
import "./Navbar.css";

export const Navbar = ({ solid = false }) => {

  const navigate = useNavigate();
  const favs = useFavorites();
  const [cartCount, setCartCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("userDetails") || "null");

  useEffect(() => {
    const load = () =>
      axios.get("/cart").then((res) =>
        setCartCount((res.data || []).reduce((n, el) => n + (el.quantity || 1), 0)));
    load();
    window.addEventListener("cartchange", load);
    return () => window.removeEventListener("cartchange", load);
  }, []);

  const logout = () => {
    localStorage.removeItem("userDetails");
    navigate("/");
    window.location.reload();
  };

  const items = user
    ? [
        { key: "name", label: <b>{user.displayName || user.email || "Foodie"}</b>, disabled: true },
        { type: "divider" },
        { key: "favorites", label: "Favourites", onClick: () => navigate("/favorites") },
        { key: "cart", label: "My Cart", onClick: () => navigate("/cart") },
        { type: "divider" },
        { key: "logout", label: "Logout", onClick: logout },
      ]
    : [
        { key: "login", label: "Login", onClick: () => navigate("/login") },
        { key: "signup", label: "Sign Up", onClick: () => navigate("/signup") },
      ];

  return (
    <header id="navbar" className={solid ? "navSolid" : ""}>
      <div className="navInner">
        <a href="/" className="navBrand">zomato</a>

        <nav className="navLinks">
          <button onClick={() => navigate("/search")}><SearchOutlined /> Search</button>
          <button onClick={() => navigate("/offers")}><TagOutlined /> Offers</button>

          <button onClick={() => navigate("/favorites")}>
            <Badge count={favs.length} size="small" color="#cb202d" offset={[2, -2]}>
              <HeartOutlined /> <span className="navLinkText">Favourites</span>
            </Badge>
          </button>

          <button onClick={() => navigate("/cart")}>
            <Badge count={cartCount} size="small" color="#cb202d" offset={[2, -2]}>
              <ShoppingCartOutlined /> <span className="navLinkText">Cart</span>
            </Badge>
          </button>
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
  );
};
