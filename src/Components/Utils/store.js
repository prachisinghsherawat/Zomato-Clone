// ---------------------------------------------------------------------------
// Tiny client-side store for Favorites + Cart badge state.
//
// Favorites are persisted in localStorage so they survive reloads. The cart
// itself lives in the mock api (in-memory), but we expose a lightweight event
// bus here so the navbar badges update instantly whenever the cart or the
// favourites change anywhere in the app.
// ---------------------------------------------------------------------------

import { useEffect, useState } from "react";

const FAV_KEY = "zomatoFavorites";

/* ------------------------------- Favorites ------------------------------- */

export const getFavorites = () => {
    try {
        return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
    } catch {
        return [];
    }
};

export const isFavorite = (id) =>
    getFavorites().some((el) => String(el.id) === String(id));

export const toggleFavorite = (item) => {
    const favs = getFavorites();
    const exists = favs.some((el) => String(el.id) === String(item.id));
    const next = exists
        ? favs.filter((el) => String(el.id) !== String(item.id))
        : [...favs, item];
    localStorage.setItem(FAV_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("favchange"));
    return !exists;
};

/* --------------------------------- Cart ---------------------------------- */

// Called by the cart flow after any add / remove / quantity change so the
// navbar cart badge can re-fetch the live count.
export const pingCart = () => window.dispatchEvent(new Event("cartchange"));

/* -------------------------------- Hooks ---------------------------------- */

// Re-renders the caller whenever favourites change (used for badges + hearts).
export const useFavorites = () => {
    const [favs, setFavs] = useState(getFavorites);
    useEffect(() => {
        const sync = () => setFavs(getFavorites());
        window.addEventListener("favchange", sync);
        window.addEventListener("storage", sync);
        return () => {
            window.removeEventListener("favchange", sync);
            window.removeEventListener("storage", sync);
        };
    }, []);
    return favs;
};
