// ---------------------------------------------------------------------------
// Menu generator for the restaurant detail page.
//
// db.json only stores a restaurant's headline info (name, cuisines, cost,
// rating) — there is no per-restaurant dish list. Rather than show an empty
// page, we synthesise a plausible menu from the cuisines listed in `variety`,
// priced around the restaurant's own "cost for one" and seeded by its id so a
// given restaurant always shows the same menu across renders and reloads.
// ---------------------------------------------------------------------------

// Dish pools keyed by a cuisine keyword found in `variety`.
// Every image URL below is one already served by Zomato's CDN for that dish.
const POOLS = {
    pizza: [
        { name: "Margherita Pizza", desc: "Classic thin crust, San Marzano sauce, fresh mozzarella & basil.", mult: 0.9, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/e27/ca8acd8c6ad33a9e33816b85921a0e27.jpg" },
        { name: "Farmhouse Pizza", desc: "Onion, capsicum, mushroom and tomato on a cheesy hand-tossed base.", mult: 1.15, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/f95/d9b95c93f774525d98288216d728cf95.jpg" },
        { name: "Peri Peri Chicken Pizza", desc: "Spicy peri peri chicken, red paprika and a double cheese blend.", mult: 1.45, veg: false, imgUrl: "https://b.zmtcdn.com/data/dish_photos/2d1/e0b25764746e75ea239f5ae6149502d1.jpg?output-format=webp" },
        { name: "Garlic Bread Sticks", desc: "Buttery garlic bread baked fresh, served with cheesy dip.", mult: 0.5, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/f72/a9a7391ff814c3248e83a60f61579f72.jpg" },
    ],
    burger: [
        { name: "Classic Veg Burger", desc: "Crunchy patty, lettuce, tomato and house mayo in a toasted bun.", mult: 0.75, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/6ce/aafab7fd85d60aed9ae66190ec42d6ce.jpg" },
        { name: "Double Cheese Burger", desc: "Two smashed patties, molten cheddar and caramelised onion.", mult: 1.2, veg: false, imgUrl: "https://b.zmtcdn.com/data/dish_photos/d0f/02be5bded9b55108435eff0f4a417d0f.jpg" },
        { name: "Crispy Chicken Burger", desc: "Buttermilk-fried chicken thigh with slaw and chipotle sauce.", mult: 1.35, veg: false, imgUrl: "https://b.zmtcdn.com/data/dish_photos/729/65a56bb6fc80afd8202b87cc6a447729.jpg" },
        { name: "Loaded Peri Fries", desc: "Golden fries tossed in peri peri, topped with cheese sauce.", mult: 0.55, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/2cd/554a151953be2415e44e3d561e8742cd.jpg" },
    ],
    coffee: [
        { name: "Cappuccino", desc: "Double shot espresso with velvety steamed milk and cocoa dust.", mult: 0.6, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/736/53a4e7723dace47214c3f5f4118cb736.png" },
        { name: "Cold Brew", desc: "Slow-steeped 18 hours for a smooth, low-acidity finish.", mult: 0.8, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/9dc/432d248a9f7dd20817ba48a8686749dc.jpg?output-format=webp" },
        { name: "Hazelnut Latte", desc: "Espresso, roasted hazelnut syrup and silky micro-foam.", mult: 0.85, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/67b/578488e8750ab630f54e013d24b8067b.jpg?output-format=webp" },
        { name: "Choco Chip Cookie", desc: "Warm, gooey centre with Belgian dark chocolate chunks.", mult: 0.35, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/46c/3228748042b79c1be2ec769fb14ba46c.jpg" },
    ],
    cake: [
        { name: "Belgian Chocolate Truffle", desc: "Layered sponge soaked in ganache, finished with dark truffle.", mult: 1.3, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/7bb/3a5ee0417cb34c83afcfb8ecd99af7bb.jpg" },
        { name: "Red Velvet Pastry", desc: "Cocoa-kissed sponge with classic cream cheese frosting.", mult: 0.7, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/a20/d4fd5ac662cc8cc69a0d64359d28ba20.jpg" },
        { name: "Blueberry Cheesecake", desc: "New York style baked cheesecake under a blueberry compote.", mult: 1.1, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/1b8/aba9d5ea63bf8b80e8c93b65275c81b8.jpg" },
        { name: "Assorted Brownie Box", desc: "Six fudge brownies — walnut, sea salt and triple chocolate.", mult: 0.9, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/7ae/c4d38b91aa0c86c528e681e8e535f7ae.jpg" },
    ],
    chaat: [
        { name: "Dahi Puri", desc: "Crisp puris filled with potato, chilled curd and tamarind chutney.", mult: 0.55, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/f72/a9a7391ff814c3248e83a60f61579f72.jpg" },
        { name: "Aloo Tikki Chaat", desc: "Griddled potato tikki with chole, curd and sweet-sour chutneys.", mult: 0.6, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/3c0/11aa20dd6b635a118a63e2ef6b1843c0.jpg" },
        { name: "Raj Kachori", desc: "A giant kachori loaded with sprouts, curd, sev and pomegranate.", mult: 0.75, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/803/5ca47cc8d292db89602d5741c6754803.jpg" },
        { name: "Pav Bhaji", desc: "Buttery mashed vegetable bhaji with toasted pav and onion.", mult: 0.7, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/f39/2c0da4f66093790ac101f3d1d1808f39.jpg" },
    ],
    "ice cream": [
        { name: "Belgian Chocolate Scoop", desc: "Slow-churned dark chocolate with cocoa nibs.", mult: 0.5, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/73a/f92470bd2ef4c1c0a9db26411babc73a.jpg" },
        { name: "Sundae Supreme", desc: "Three scoops, hot fudge, roasted nuts and whipped cream.", mult: 0.95, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/1af/50662575103454eb64ef88633f7c41af.jpg" },
        { name: "Brownie Fudge Tub", desc: "500 ml tub with brownie chunks folded through vanilla bean.", mult: 1.25, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/b11/ba5cd34d7557dc94213f5c816df68b11.jpg" },
        { name: "Fresh Fruit Falooda", desc: "Rose syrup, sabja, vermicelli and a scoop of kulfi.", mult: 0.8, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/d27/81d8245bf7bac57cbbb241d9b2f45d27.jpg" },
    ],
    shake: [
        { name: "Thick Oreo Shake", desc: "Blended cookies and cream, topped with crumble.", mult: 0.7, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/194/aab2479d72c040574842e4bfc10a7194.jpg?output-format=webp" },
        { name: "Belgian Chocolate Shake", desc: "Real chocolate blended with vanilla bean ice cream.", mult: 0.8, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/bbf/022e247bac5100827852e93a8e8d0bbf.jpg" },
        { name: "Strawberry Shake", desc: "Fresh strawberries, chilled milk and a swirl of cream.", mult: 0.65, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/716/2ba893d0828d837c7357dc72a715b716.jpg" },
        { name: "Cold Coffee Frappe", desc: "Double espresso, ice cream and a thick chocolate drizzle.", mult: 0.7, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/7c0/d9134ccd345574403a27320f517867c0.jpg" },
    ],
};

// Shown when the cuisines don't match any pool (North Indian, Continental…).
const HOUSE = [
    { name: "Paneer Butter Masala", desc: "Cottage cheese simmered in a silky tomato-cashew gravy.", mult: 0.8, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/f39/2c0da4f66093790ac101f3d1d1808f39.jpg" },
    { name: "Butter Chicken", desc: "Tandoor-charred chicken in the house makhani gravy.", mult: 1.0, veg: false, imgUrl: "https://b.zmtcdn.com/data/dish_photos/729/65a56bb6fc80afd8202b87cc6a447729.jpg" },
    { name: "Dal Makhani", desc: "Black lentils slow-cooked overnight with butter and cream.", mult: 0.6, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/803/5ca47cc8d292db89602d5741c6754803.jpg" },
    { name: "Assorted Kebab Platter", desc: "Chef's selection of four kebabs with mint chutney and onion.", mult: 1.35, veg: false, imgUrl: "https://b.zmtcdn.com/data/dish_photos/2cd/554a151953be2415e44e3d561e8742cd.jpg" },
    { name: "Truffle Mushroom Risotto", desc: "Arborio rice, wild mushrooms and a hit of truffle oil.", mult: 1.2, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/6ce/aafab7fd85d60aed9ae66190ec42d6ce.jpg" },
    { name: "Death by Chocolate", desc: "Warm chocolate pudding with a molten centre and ice cream.", mult: 0.65, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/7bb/3a5ee0417cb34c83afcfb8ecd99af7bb.jpg" },
];

// Always-available add-ons so every menu has some breadth.
const SIDES = [
    { name: "Masala Fries", desc: "Crisp fries dusted with our house masala.", mult: 0.4, veg: true, imgUrl: "https://b.zmtcdn.com/data/o2_assets/13bdf0d4c96d44e6ddb21fedde0fe4081632716661.png" },
    { name: "Fresh Lime Soda", desc: "Sweet or salted, served ice cold.", mult: 0.2, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/9dc/432d248a9f7dd20817ba48a8686749dc.jpg?output-format=webp" },
];

// Highlights listed under "About" on the detail page.
export const FEATURES = [
    "Home Delivery",
    "Takeaway Available",
    "Indoor Seating",
    "Digital Payments",
    "Fully Air Conditioned",
    "Serves Desserts",
];

// Round to a price that looks like a real menu (…9 endings, never below ₹49).
const nicePrice = (value) => {
    const rounded = Math.max(49, Math.round(value / 10) * 10);
    return rounded - 1;
};

export const buildMenu = (data = {}) => {
    const variety = String(data.variety || "").toLowerCase();
    const seed = Number(data.id) || 1;

    // `price` is Zomato's "cost for one", which covers a couple of courses —
    // a single dish sits well under it. Clamping also stops a ₹2400 fine-dine
    // listing from quoting ₹2199 for a margherita.
    const costForOne = Number(data.price) || 250;
    const base = Math.max(120, Math.min(costForOne * 0.6, 700));

    // Collect every pool whose cuisine keyword appears in this restaurant's
    // `variety` string, keeping the order the pools are declared in.
    const matched = Object.entries(POOLS)
        .filter(([key]) => variety.includes(key))
        .flatMap(([, dishes]) => dishes);

    const chosen = (matched.length ? matched : HOUSE).concat(SIDES);

    return chosen.map((dish, i) => ({
        ...dish,
        // The seed nudges prices a little per restaurant so two places serving
        // the same dish don't quote identical rupees.
        price: nicePrice(base * dish.mult + ((seed * 13 + i * 7) % 40)),
    }));
};
