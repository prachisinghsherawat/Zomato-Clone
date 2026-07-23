// Category metadata for the shared listing page — one entry per inner page.
// `rail` drives the circular quick-switch strip shown on delivery pages so a
// user can hop between cuisines without going back to /delivery.

export const CATEGORY_RAIL = [
    { label: "All", img: "https://b.zmtcdn.com/data/pictures/3/20066713/8d55259349a583f56d540b716c249f1a_o2_featured_v2.jpg", to: "/delivery" },
    { label: "Pizza", img: "https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png", to: "/delivery/pizza" },
    { label: "Burger", img: "https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png", to: "/delivery/burger" },
    { label: "Coffee", img: "https://b.zmtcdn.com/data/images/cuisines/unlabelled_v2_1/1040.jpg", to: "/delivery/coffee" },
    { label: "Cake", img: "https://b.zmtcdn.com/data/dish_photos/b24/163ec0c041094f6e4f1efc81cf32bb24.png", to: "/delivery/cake" },
    { label: "Chaat", img: "https://b.zmtcdn.com/data/dish_images/1437bc204cb5c892cb22d78b4347f4651634827140.png", to: "/delivery/chaat" },
    { label: "Ice Cream", img: "https://b.zmtcdn.com/data/pictures/chains/4/18949234/d60d487c5c887ce9b7da458c0253389d_o2_featured_v2.jpg", to: "/delivery/ice-cream" },
    { label: "Shake", img: "https://b.zmtcdn.com/data/dish_images/8187d3223ac2cc42cc24f723c92877511634805403.png", to: "/delivery/shake" },
];

// Fallback hero art per page. The hero normally uses the highest-rated
// restaurant's own photo; these cover the moment before data lands.
export const HERO_FALLBACK = {
    delivery: "https://b.zmtcdn.com/data/pictures/3/20066713/8d55259349a583f56d540b716c249f1a_o2_featured_v2.jpg",
    dinning: "https://b.zmtcdn.com/data/pictures/4/307374/b3309d3aad3838b482586ca304a7dcc0_featured_v2.jpg?output-format=webp",
    nightlife: "https://b.zmtcdn.com/data/pictures/7/19291447/5243902b4cb774b2cc36556e40a6170d_featured_v2.jpg",
};
