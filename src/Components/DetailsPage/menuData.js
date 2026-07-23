// ---------------------------------------------------------------------------
// Menu generator for the restaurant detail page.
//
// db.json has no per-restaurant dish list, so we build a plausible menu from
// the cuisines in `variety`, priced around the restaurant's own cost for one
// and seeded by its id (same restaurant → same menu on every render).
//
// Two rules keep it honest:
//
//   1. Every photo below was checked against the dish it is attached to. An
//      earlier pass paired invented dish names with whatever Zomato CDN URLs
//      were free, which is how a cappuccino ended up labelled "Choco Chip
//      Cookie" and sliders ended up as "Truffle Parmesan Fries".
//
//   2. A restaurant only gets pools that match its own cuisines. Coffee shops
//      no longer sell wood-fired pizza and parmesan fries just because their
//      `variety` happens to contain the word "Cafe".
// ---------------------------------------------------------------------------

const PIZZA = [
    { name: "Margherita Pizza", desc: "Blistered crust, buffalo mozzarella and torn basil.", mult: 0.85, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/2df/28d1140c095dad518bf4c0b00a7452df.jpg" },
    { name: "Pepperoni Pizza", desc: "Cup-and-char pepperoni over a slow-cooked tomato base.", mult: 1.3, veg: false, imgUrl: "https://b.zmtcdn.com/data/dish_photos/f95/d9b95c93f774525d98288216d728cf95.jpg" },
    { name: "Chilli Pepperoni Pan Pizza", desc: "Deep-pan pizza loaded with pepperoni and pickled jalapeños.", mult: 1.45, veg: false, imgUrl: "https://b.zmtcdn.com/data/pictures/1/18153541/12e9f8eccf868a5348591f92cf696561_featured_v2.jpg?output-format=webp" },
    { name: "Veggie Supreme Pizza", desc: "Peppers, olives, sweetcorn and herbs on a hand-tossed base.", mult: 1.1, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/11b/6081f0ef60c9a2d032dca41eeddfc11b.jpg" },
    { name: "Farmhouse Pizza", desc: "Onion, capsicum, mushroom and tomato under a mozzarella blanket.", mult: 1.15, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/7b4/9ed51f9a90b75717631681cfa9ac27b4.jpg" },
    { name: "Four Cheese Pizza", desc: "Mozzarella, cheddar, parmesan and a blue cheese finish.", mult: 1.35, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/6a8/c4ed04db6587c3b9cc5562f75ad0e6a8.jpg" },
    { name: "Peri Peri Pizza", desc: "Fiery peri peri sauce, red paprika and double cheese.", mult: 1.25, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/e27/ca8acd8c6ad33a9e33816b85921a0e27.jpg" },
    { name: "Jalapeño & Olive Pizza", desc: "Green chillies, black olives and oregano on a thin crust.", mult: 1.2, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/b48/043ea980801536177ffdd08abac3eb48.jpg" },
];

const BURGER = [
    { name: "Classic Cheeseburger", desc: "Beef-style patty, molten cheddar, lettuce and house sauce.", mult: 0.95, veg: false, imgUrl: "https://b.zmtcdn.com/data/dish_photos/d0f/02be5bded9b55108435eff0f4a417d0f.jpg" },
    { name: "Crispy Chicken Burger", desc: "Buttermilk-fried chicken with slaw, served with fries.", mult: 1.2, veg: false, imgUrl: "https://b.zmtcdn.com/data/dish_photos/2cd/554a151953be2415e44e3d561e8742cd.jpg" },
    { name: "Double Decker Cheese Burger", desc: "Two patties, twice the cheese, toasted sesame bun.", mult: 1.35, veg: false, imgUrl: "https://b.zmtcdn.com/data/dish_photos/6ce/aafab7fd85d60aed9ae66190ec42d6ce.jpg" },
    { name: "Avocado Chicken Burger", desc: "Grilled chicken, smashed avocado and rocket in a soft bun.", mult: 1.3, veg: false, imgUrl: "https://b.zmtcdn.com/data/dish_photos/a67/5d73a3bd4d7704ba324eed714ca5ca67.jpg" },
    { name: "Mini Slider Trio", desc: "Three sliders — cheese, chicken and smoky barbecue.", mult: 1.15, veg: false, imgUrl: "https://b.zmtcdn.com/data/dish_photos/bfa/9ae3cdb1c4ba0e2480c770d979facbfa.jpg" },
    { name: "Grilled Cheese Sandwich", desc: "Griddled sourdough with a three-cheese melt.", mult: 0.8, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/4f9/c164f1abfc6b3e9ea4e67538c19074f9.jpg" },
    { name: "Double Veg Burger", desc: "Two crunchy veg patties, pickled onion and mint mayo.", mult: 0.9, veg: true, imgUrl: "https://b.zmtcdn.com/data/pictures/chains/1/310301/0bb4ccbc6a9fb81b05c4870715419519_o2_featured_v2.jpg?output-format=webp" },
    { name: "Smoky BBQ Burger Combo", desc: "Barbecue burger with fries and a chilled cola.", mult: 1.5, veg: false, imgUrl: "https://b.zmtcdn.com/data/dish_photos/729/65a56bb6fc80afd8202b87cc6a447729.jpg" },
    { name: "Gourmet Burger Platter", desc: "Chef's burger served with three house dips.", mult: 1.4, veg: false, imgUrl: "https://b.zmtcdn.com/data/dish_photos/5c3/da2957865acacba7fa05c0b36e1b45c3.jpg" },
];

const COFFEE = [
    { name: "Cappuccino", desc: "Double shot espresso under velvety steamed milk.", mult: 0.6, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/736/53a4e7723dace47214c3f5f4118cb736.png" },
    { name: "Vanilla Latte", desc: "Espresso, vanilla syrup and silky micro-foam.", mult: 0.75, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/9dc/432d248a9f7dd20817ba48a8686749dc.jpg?output-format=webp" },
    { name: "Café Latte", desc: "A long, mellow pour with a thin layer of foam.", mult: 0.7, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/0a4/9597a0877fcb37cfa58472b0505370a4.jpg" },
    { name: "Flat White", desc: "Ristretto shots and steamed milk, no foam cap.", mult: 0.7, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/b2f/bc0e4ec9c42ab463a9882d56f2b5bb2f.jpg" },
    { name: "Café Mocha", desc: "Espresso, cocoa and steamed milk with latte art.", mult: 0.8, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/c3f/fd075c98b6ee7f594ec8b4e3bb08fc3f.jpg?output-format=webp" },
    { name: "Cold Brew", desc: "Steeped 18 hours over ice for a smooth, low-acid finish.", mult: 0.85, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/b37/300527a10284c1dea3bde6132fec8b37.jpg?output-format=webp" },
    { name: "Cold Coffee", desc: "Blended cold coffee topped with a thick froth.", mult: 0.8, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/c3a/ed504a8d137fc6e1ff27291cfce41c3a.jpg" },
    { name: "Caramel Frappe", desc: "Iced coffee blend crowned with whipped cream and caramel.", mult: 0.95, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/113/b3d79815f2bab840c03bbdb12651a113.jpg" },
    { name: "Bottled Cold Coffee", desc: "Our house cold coffee, bottled and chilled to go.", mult: 0.75, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/82c/6da995f930f764f1f582d487a670282c.jpg" },
    { name: "Coffee & Cookie", desc: "Any hot coffee with a butter cookie on the side.", mult: 0.85, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/e51/11c06414570ebd50fb598c7c7eb14e51.jpg" },
    { name: "Coffee & Macarons", desc: "Coffee of the day with two French macarons.", mult: 1.0, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/67b/578488e8750ab630f54e013d24b8067b.jpg?output-format=webp" },
];

const CAKE = [
    { name: "Chocolate Truffle Cake", desc: "Layered sponge soaked in ganache, finished with a cherry.", mult: 1.25, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/1b8/aba9d5ea63bf8b80e8c93b65275c81b8.jpg" },
    { name: "Red Velvet Cake", desc: "Cocoa-kissed sponge layered with cream cheese frosting.", mult: 1.2, veg: true, imgUrl: "https://b.zmtcdn.com/data/pictures/0/19215190/499ec6e19ee26e5e00e7e602557bb538_o2_featured_v2.jpg" },
    { name: "Fresh Fruit Gateau", desc: "Vanilla sponge, whipped cream and glazed seasonal fruit.", mult: 1.15, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/c35/4471b19e8c65d4349d0af66598a0ac35.jpg" },
    { name: "Butterscotch Caramel Cake", desc: "Praline crunch folded through cream, caramel spun on top.", mult: 1.1, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/a20/d4fd5ac662cc8cc69a0d64359d28ba20.jpg" },
    { name: "Dark Chocolate Rose Cake", desc: "Piped dark chocolate roses over a rich fudge base.", mult: 1.3, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/7ae/c4d38b91aa0c86c528e681e8e535f7ae.jpg" },
    { name: "Chocolate Pastry", desc: "A single slice of our chocolate sponge, cream layered.", mult: 0.55, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/734/00d8c91368a10863688d59ddd6dec734.jpg" },
    { name: "Walnut Banana Loaf", desc: "Moist banana bread studded with toasted walnuts.", mult: 0.6, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/276/9c9756c9c390f8b5810542429fd50276.jpg" },
    { name: "Pista Mango Cake", desc: "Pistachio cream and alphonso mango on a light sponge.", mult: 1.2, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/dd9/6460e568b4d970f88c4d64329319fdd9.jpg" },
    { name: "Chocolate Fudge Cake", desc: "Dense fudge cake with a mirror-glaze finish.", mult: 1.15, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/af6/432c26f4c1dd6fd0b9f41f87ce6a5af6.jpg" },
];

const ICE_CREAM = [
    { name: "Strawberry Scoop", desc: "Slow-churned strawberry with real fruit pieces.", mult: 0.5, veg: true, imgUrl: "https://b.zmtcdn.com/data/pictures/3/20187433/394854cdfe52cc7b8c4cb46695ec8ea7_o2_featured_v2.jpg" },
    { name: "Chocolate Nut Sundae", desc: "Chocolate scoops, hot fudge and roasted nuts.", mult: 0.95, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/b11/ba5cd34d7557dc94213f5c816df68b11.jpg" },
    { name: "Choco-Dipped Cone", desc: "Vanilla soft serve dipped in chocolate and hazelnut crumb.", mult: 0.6, veg: true, imgUrl: "https://b.zmtcdn.com/data/pictures/chains/2/2532/2267ef82b019512eea9fb36efa096f16_o2_featured_v2.jpg?output-format=webp" },
    { name: "Belgian Chocolate Bowl", desc: "Three scoops of dark Belgian chocolate ice cream.", mult: 0.9, veg: true, imgUrl: "https://b.zmtcdn.com/data/pictures/chains/2/19676052/229cc3b0186e2a926506b12d5721dabd_o2_featured_v2.jpg" },
    { name: "Falooda Sundae", desc: "Rose syrup, sabja, vermicelli and a scoop of kulfi.", mult: 0.85, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/d27/81d8245bf7bac57cbbb241d9b2f45d27.jpg" },
    { name: "Strawberry Sundae", desc: "Strawberry ice cream, fresh berries and whipped cream.", mult: 0.9, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/9e1/ce30d09038f8474b271927e0c4a079e1.jpg" },
    { name: "Kiwi Pista Jar", desc: "Layered kiwi and pistachio dessert served in a jar.", mult: 1.0, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/8db/a8f461695944e648b429304d35b298db.jpg" },
    { name: "Chocolate Wafer Bowl", desc: "Chocolate ice cream loaded with wafer sticks and sauce.", mult: 1.05, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/73a/f92470bd2ef4c1c0a9db26411babc73a.jpg" },
];

const SHAKE = [
    { name: "Oreo Thickshake", desc: "Blended cookies and cream, topped with crumble.", mult: 0.75, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/194/aab2479d72c040574842e4bfc10a7194.jpg?output-format=webp" },
    { name: "Belgian Chocolate Shake", desc: "Real Belgian chocolate blended with vanilla ice cream.", mult: 0.85, veg: true, imgUrl: "https://b.zmtcdn.com/data/pictures/chains/7/18843927/0a826a53492d471c421e97116e2a31f6_o2_featured_v2.jpg?output-format=webp" },
    { name: "Strawberry Shake", desc: "Fresh strawberries, chilled milk and a swirl of cream.", mult: 0.7, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/c47/dfe63dbd3d77df168da7bd2251f95c47.jpg" },
    { name: "Cold Coffee Shake", desc: "Double espresso blended with ice cream and cocoa.", mult: 0.75, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/bbf/022e247bac5100827852e93a8e8d0bbf.jpg" },
    { name: "Banana Smoothie", desc: "Ripe banana blended with yoghurt and a drizzle of honey.", mult: 0.7, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/4d7/b6d5c397c366684a3e82ba48521c14d7.jpg" },
    { name: "Oreo Cream Shake", desc: "Thick shake finished with whipped cream and whole Oreos.", mult: 0.85, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/501/2422454c0f990e75d8860a04d52b3501.jpg" },
    { name: "Chocolate Milkshake", desc: "Classic chocolate shake with shaved chocolate on top.", mult: 0.7, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/7c0/d9134ccd345574403a27320f517867c0.jpg" },
    { name: "Butterscotch Cream Shake", desc: "Butterscotch praline blended thick and topped with cream.", mult: 0.8, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/b8d/3e022e0c5e718d9ba2e17c742b11cb8d.jpg?output-format=webp" },
    { name: "Mango Cooler", desc: "Alphonso mango and lime, bottled and served chilled.", mult: 0.55, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/899/f91dd712b028715316c7df0b8f569899.jpg" },
    { name: "Thickshake Trio", desc: "Three bottled thickshakes — chocolate, vanilla and coffee.", mult: 1.3, veg: true, imgUrl: "https://b.zmtcdn.com/data/pictures/chains/0/19640740/8d8ca44c755ea86ada0c5c0784d709df_o2_featured_v2.jpg" },
];

const CHAAT = [
    { name: "Golgappa (8 pcs)", desc: "Crisp puris with spiced potato and chilled jaljeera.", mult: 0.5, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/f72/a9a7391ff814c3248e83a60f61579f72.jpg" },
    { name: "Papdi Chaat", desc: "Crisp papdi, curd, sprouts and tamarind chutney.", mult: 0.6, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/3c0/11aa20dd6b635a118a63e2ef6b1843c0.jpg" },
    { name: "Aloo Chaat", desc: "Griddled potato tossed with chaat masala and lime.", mult: 0.55, veg: true, imgUrl: "https://b.zmtcdn.com/data/pictures/6/18535616/0799bb69876e4aa4e42dbbfbba5b8238_o2_featured_v2.jpg" },
    { name: "Pani Puri Platter", desc: "A full plate of puris with four flavoured waters.", mult: 0.7, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/f39/2c0da4f66093790ac101f3d1d1808f39.jpg" },
    { name: "Chole Chawal", desc: "Punjabi chole with steamed rice, onion and pickle.", mult: 0.75, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/fc7/4d5bd7946c83dba62935ddbf5ff82fc7.jpg" },
    { name: "Veg Frankie Roll", desc: "Spiced veg filling rolled in a griddled paratha.", mult: 0.6, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/057/d6de3ccf74e9556f3fa06122291c5057.jpg" },
    { name: "Dhokla", desc: "Steamed gram-flour cakes with green chutney.", mult: 0.5, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/02d/27bdf788a990da1affbf87b00631502d.jpg" },
    { name: "Golgappa Basket", desc: "A sharing basket of puris with all the chutneys.", mult: 0.8, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/8f0/f71e31b180d5a564baabf20151cc78f0.jpg" },
];

// The one dish that has a photo but belongs to no single pool.
const PASTA = {
    name: "Chilli Garlic Pasta", desc: "Penne tossed in chilli, garlic and olive oil.",
    mult: 0.8, veg: true,
    imgUrl: "https://b.zmtcdn.com/data/dish_photos/06a/962034c5855fe767c0c038e0decaa06a.jpg",
};

const pick = (pool, name) => pool.find((d) => d.name === name);

// Fallback for multi-cuisine and dine-out kitchens (Italian / Continental /
// European / Mediterranean / Asian) that match none of the pools above.
// It reuses the dish objects themselves rather than re-describing them, so a
// photo can never end up attached to two different dish names.
const CONTINENTAL = [
    pick(PIZZA, "Jalapeño & Olive Pizza"),
    PASTA,
    pick(BURGER, "Avocado Chicken Burger"),
    pick(BURGER, "Grilled Cheese Sandwich"),
    pick(COFFEE, "Cappuccino"),
    pick(CAKE, "Chocolate Truffle Cake"),
    pick(ICE_CREAM, "Chocolate Nut Sundae"),
    pick(SHAKE, "Mango Cooler"),
];

// Added on top when the restaurant lists an Indian cuisine.
const INDIAN = [
    pick(CHAAT, "Chole Chawal"),
    pick(CHAAT, "Veg Frankie Roll"),
    pick(CHAAT, "Dhokla"),
    pick(CHAAT, "Aloo Chaat"),
];

// A cuisine keyword in `variety` pulls in exactly one pool. "Beverages" is
// deliberately absent — nearly every restaurant lists it, and matching on it
// would drop milkshakes into every menu in the app.
const POOLS = [
    { keys: ["pizza"], dishes: PIZZA },
    { keys: ["burger", "sandwich"], dishes: BURGER },
    { keys: ["coffee"], dishes: COFFEE },
    { keys: ["cake", "bakery", "dessert"], dishes: CAKE },
    { keys: ["ice cream"], dishes: ICE_CREAM },
    { keys: ["shake", "juice"], dishes: SHAKE },
    { keys: ["chaat", "street food"], dishes: CHAAT },
];

const INDIAN_CUISINES = ["north indian", "modern indian", "mughlai", "biryani", "punjabi", "indian"];

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
const nicePrice = (value) => Math.max(49, Math.round(value / 10) * 10) - 1;

export const buildMenu = (data = {}) => {
    // The name matters as much as the cuisine list: "Kwality Cakes & Bakes"
    // lists its `variety` as "Rolls, Fast Food, Sandwich", which on its own
    // would hand a cake shop a menu full of burgers.
    const variety = `${data.name || ""} ${data.variety || ""}`.toLowerCase();
    const cuisineCount = String(data.variety || "").split(",").filter(Boolean).length;
    const seed = Number(data.id) || 1;

    // `price` is Zomato's "cost for one", which covers a couple of courses —
    // a single dish sits well under it. Clamping also stops a ₹2400 fine-dine
    // listing from quoting ₹2199 for a margherita.
    const costForOne = Number(data.price) || 250;
    const base = Math.max(120, Math.min(costForOne * 0.6, 700));

    const hits = POOLS.filter((pool) => pool.keys.some((key) => variety.includes(key)));

    // A single-cuisine place shows its whole pool; once several cuisines match
    // we take the top six of each, so a place that ticks four boxes doesn't
    // render a forty-item wall.
    const matched = hits.length === 1
        ? hits[0].dishes
        : hits.flatMap((pool) => pool.dishes.slice(0, 6));

    // Only fall back to the all-rounder menu when no cuisine matched, so a
    // coffee shop stays a coffee shop.
    let chosen = matched.length ? matched : CONTINENTAL;

    // Broad multi-cuisine kitchens (five or more cuisines — the dine-out and
    // nightlife venues) get the all-rounder selection on top, so a rooftop
    // that happens to list "Pizza" doesn't serve nothing but eight pizzas.
    if (matched.length && cuisineCount >= 5) {
        chosen = [...chosen, ...CONTINENTAL];
    }

    if (INDIAN_CUISINES.some((c) => variety.includes(c))) {
        chosen = [...chosen, ...INDIAN];
    }

    // A cafe that also serves cake shouldn't list the same dish twice.
    const seen = new Set();
    chosen = chosen.filter((dish) => {
        if (seen.has(dish.name)) return false;
        seen.add(dish.name);
        return true;
    });

    return chosen.slice(0, 24).map((dish, i) => ({
        ...dish,
        restaurant: data.name || "",
        // The seed nudges prices per restaurant so two places serving the same
        // dish don't quote identical rupees.
        price: nicePrice(base * dish.mult + ((seed * 13 + i * 7) % 40)),
    }));
};
