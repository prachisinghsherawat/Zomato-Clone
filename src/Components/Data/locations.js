// Location list for the header picker.
//
// Derived from db.json rather than hard-coded, so the dropdown can only ever
// offer places that actually have restaurants behind them — picking one always
// returns results. The count shown next to each name comes from the same pass.

import db from "./db.json";

const counts = {};
Object.values(db).forEach((collection) => {
    if (!Array.isArray(collection)) return;
    collection.forEach((item) => {
        if (!item || !item.place) return;
        counts[item.place] = (counts[item.place] || 0) + 1;
    });
});

export const LOCATIONS = Object.keys(counts)
    .sort()
    .map((place) => ({ value: place, label: place, count: counts[place] }));

export const TOTAL_PLACES = Object.values(counts).reduce((a, b) => a + b, 0);

// Shown when nothing is picked — the whole catalogue is Delhi NCR.
export const ALL_LOCATIONS_LABEL = "Delhi NCR";
