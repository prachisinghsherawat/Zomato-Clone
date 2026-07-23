// ---------------------------------------------------------------------------
// Single client-side store for everything the app needs to remember:
// the signed-in user, the cart, favourites, the chosen location, the applied
// coupon and past orders.
//
// Everything is persisted to localStorage (so a reload doesn't wipe the cart
// or log you out) and every write broadcasts a `zomato:store` event, which the
// hooks below subscribe to. That is what keeps the navbar badges, the cart
// page and the payment summary in agreement — previously the cart lived in
// the in-memory mock API and the counts drifted apart.
// ---------------------------------------------------------------------------

import { useEffect, useState } from "react";

const KEYS = {
    user: "zomatoUser",
    users: "zomatoUsers",
    cart: "zomatoCart",
    favs: "zomatoFavorites",
    city: "zomatoCity",
    coupon: "zomatoCoupon",
    orders: "zomatoOrders",
};

const EVENT = "zomato:store";

const read = (key, fallback) => {
    try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
    } catch {
        return fallback;
    }
};

const write = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        /* quota / private mode — the in-page state still updates */
    }
    window.dispatchEvent(new Event(EVENT));
    return value;
};

/* --------------------------------- Auth ---------------------------------- */

export const getUser = () => read(KEYS.user, null);

const normaliseEmail = (email) => String(email || "").trim().toLowerCase();

// Accounts are stored locally — this is a front-end clone, so "the database"
// is localStorage. Passwords are kept as-is; do not reuse a real one here.
export const signUp = ({ name, email, password }) => {
    const clean = normaliseEmail(email);
    if (!clean) return { error: "Please enter your email address." };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return { error: "That email doesn't look right." };
    if ((password || "").length < 6) return { error: "Password must be at least 6 characters." };

    const users = read(KEYS.users, []);
    if (users.some((u) => u.email === clean)) {
        return { error: "An account with this email already exists. Try logging in." };
    }

    const user = {
        name: (name || "").trim() || clean.split("@")[0],
        email: clean,
        password,
        joined: new Date().toISOString(),
    };
    write(KEYS.users, [...users, user]);

    const { password: _pw, ...safe } = user;
    write(KEYS.user, safe);
    return { user: safe };
};

export const signIn = ({ email, password }) => {
    const clean = normaliseEmail(email);
    if (!clean || !password) return { error: "Enter your email and password." };

    const users = read(KEYS.users, []);
    const match = users.find((u) => u.email === clean);
    if (!match) return { error: "No account found for that email. Create one first." };
    if (match.password !== password) return { error: "Incorrect password. Please try again." };

    const { password: _pw, ...safe } = match;
    write(KEYS.user, safe);
    return { user: safe };
};

// Used by the Google sign-in path, which hands us an already-verified profile.
export const signInWithProfile = (profile) => write(KEYS.user, profile);

export const signOut = () => write(KEYS.user, null);

/* --------------------------------- Cart ---------------------------------- */

export const getCart = () => read(KEYS.cart, []);

const cartKey = (item) => `${item.name}|${item.restaurant || ""}`;

// Adding the same dish twice bumps the quantity instead of stacking a second
// identical row, which is what made the cart count disagree with the list.
export const addToCart = (item, qty = 1) => {
    const cart = getCart();
    const key = cartKey(item);
    const existing = cart.find((el) => cartKey(el) === key);

    const next = existing
        ? cart.map((el) =>
            cartKey(el) === key ? { ...el, quantity: el.quantity + qty } : el)
        : [...cart, {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            name: item.name,
            imgUrl: item.imgUrl,
            price: Number(item.price) || 0,
            restaurant: item.restaurant || "",
            quantity: qty,
        }];

    write(KEYS.cart, next);
    return next;
};

export const setQuantity = (id, qty) => {
    const next = qty <= 0
        ? getCart().filter((el) => el.id !== id)
        : getCart().map((el) => (el.id === id ? { ...el, quantity: qty } : el));
    return write(KEYS.cart, next);
};

export const removeFromCart = (id) =>
    write(KEYS.cart, getCart().filter((el) => el.id !== id));

export const clearCart = () => write(KEYS.cart, []);

export const cartCount = (cart = getCart()) =>
    cart.reduce((n, el) => n + (Number(el.quantity) || 0), 0);

export const cartSubtotal = (cart = getCart()) =>
    cart.reduce((sum, el) => sum + (Number(el.price) || 0) * (Number(el.quantity) || 0), 0);

/* ------------------------------- Favourites ------------------------------- */

export const getFavorites = () => read(KEYS.favs, []);

export const isFavorite = (id) =>
    getFavorites().some((el) => String(el.id) === String(id));

export const toggleFavorite = (item) => {
    const favs = getFavorites();
    const exists = favs.some((el) => String(el.id) === String(item.id));
    write(KEYS.favs, exists
        ? favs.filter((el) => String(el.id) !== String(item.id))
        : [...favs, item]);
    return !exists;
};

/* -------------------------------- Location -------------------------------- */

export const getCity = () => read(KEYS.city, "");
export const setCity = (city) => write(KEYS.city, city || "");

/* --------------------------------- Coupon --------------------------------- */

export const getCoupon = () => read(KEYS.coupon, null);
export const applyCoupon = (coupon) => write(KEYS.coupon, coupon);
export const clearCoupon = () => write(KEYS.coupon, null);

// Works out what a coupon is actually worth against a given subtotal, and why
// it doesn't apply when it doesn't. The cart and payment pages share this so
// they can never show two different discounts.
export const couponDiscount = (coupon, subtotal) => {
    if (!coupon) return { value: 0, reason: "" };
    if (subtotal < (coupon.minOrder || 0)) {
        return { value: 0, reason: `Add ₹${coupon.minOrder - subtotal} more to use ${coupon.code}` };
    }
    if (coupon.type === "flat") {
        return { value: Math.min(coupon.amount, subtotal), reason: "" };
    }
    const raw = Math.round((subtotal * coupon.percent) / 100);
    return { value: Math.min(raw, coupon.maxDiscount || raw), reason: "" };
};

/* --------------------------------- Orders --------------------------------- */

export const getOrders = () => read(KEYS.orders, []);

export const placeOrder = (order) => {
    const record = {
        ...order,
        id: `ZOM${Date.now().toString().slice(-8)}`,
        placedAt: new Date().toISOString(),
    };
    write(KEYS.orders, [record, ...getOrders()]);
    clearCart();
    clearCoupon();
    return record;
};

/* --------------------------------- Hooks ---------------------------------- */

// One subscription helper for every slice — each hook re-reads its own value
// whenever any part of the store changes, including from another tab.
const useStoreValue = (getValue) => {
    const [value, setValue] = useState(getValue);
    useEffect(() => {
        const sync = () => setValue(getValue());
        sync(); // catch writes that landed between render and effect
        window.addEventListener(EVENT, sync);
        window.addEventListener("storage", sync);
        return () => {
            window.removeEventListener(EVENT, sync);
            window.removeEventListener("storage", sync);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return value;
};

export const useUser = () => useStoreValue(getUser);
export const useFavorites = () => useStoreValue(getFavorites);
export const useCityState = () => useStoreValue(getCity);
export const useCoupon = () => useStoreValue(getCoupon);
export const useOrders = () => useStoreValue(getOrders);

export const useCart = () => {
    const items = useStoreValue(getCart);
    return { items, count: cartCount(items), subtotal: cartSubtotal(items) };
};
