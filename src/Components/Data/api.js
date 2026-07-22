// ---------------------------------------------------------------------------
// Local mock API — replaces the old (dead) Heroku backend.
//
// The app was built against a json-server hosted on Heroku that no longer
// exists, so every axios call returned nothing and the UI showed no data.
// This module bundles db.json and exposes an axios-compatible interface
// (get / post / put / patch / delete) backed by an in-memory store, so the
// app works with just `npm start` and even when deployed as a static site.
//
// Resource names are matched case-insensitively, which also transparently
// fixes the mismatched endpoints in the app (e.g. `/pizza` vs `Pizza`,
// `/shake` vs `Shake`).
// ---------------------------------------------------------------------------

import db from "./db.json";

// Normalise every collection under a lower-cased key.
const store = {};
Object.entries(db).forEach(([key, value]) => {
    store[key.toLowerCase()] = Array.isArray(value)
        ? value.map((item) => ({ ...item }))
        : value;
});

// The cart is a runtime resource (the old backend had a writable `cart`).
if (!store.cart) store.cart = [];

// Simulate a small network delay so loading behaviour matches the real thing.
const respond = (data) =>
    new Promise((resolve) => setTimeout(() => resolve({ data }), 120));

// Pull `{ resource, id }` out of a full or relative URL.
const parseUrl = (url) => {
    const path = String(url)
        .replace(/^https?:\/\/[^/]+/, "")
        .replace(/^\/+/, "")
        .replace(/\/+$/, "");
    const [resource = "", id] = path.split("/");
    return { key: resource.toLowerCase(), id };
};

const sameId = (a, b) => String(a) === String(b);

const api = {
    get(url) {
        const { key, id } = parseUrl(url);
        const collection = store[key] || [];
        if (id !== undefined) {
            return respond(collection.find((el) => sameId(el.id, id)) || {});
        }
        return respond(collection);
    },

    post(url, body = {}) {
        const { key } = parseUrl(url);
        if (!store[key]) store[key] = [];
        const nextId =
            body.id ??
            (store[key].reduce((max, el) => Math.max(max, Number(el.id) || 0), 0) + 1);
        const item = { ...body, id: nextId };
        store[key].push(item);
        return respond(item);
    },

    put(url, body = {}) {
        const { key, id } = parseUrl(url);
        const collection = store[key] || [];
        const index = collection.findIndex((el) => sameId(el.id, id));
        if (index !== -1) collection[index] = { ...body, id: collection[index].id };
        return respond(collection[index] || {});
    },

    patch(url, body = {}) {
        const { key, id } = parseUrl(url);
        const collection = store[key] || [];
        const index = collection.findIndex((el) => sameId(el.id, id));
        if (index !== -1) collection[index] = { ...collection[index], ...body };
        return respond(collection[index] || {});
    },

    delete(url) {
        const { key, id } = parseUrl(url);
        if (store[key]) {
            store[key] = store[key].filter((el) => !sameId(el.id, id));
        }
        return respond({});
    },
};

export default api;
