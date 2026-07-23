// ---------------------------------------------------------------------------
// Menu generator for the restaurant detail page.
//
// db.json only stores a restaurant's headline info (name, cuisines, cost,
// rating) — there is no per-restaurant dish list. So we synthesise a plausible
// menu from the cuisines in `variety`, priced around the restaurant's own cost
// for one and seeded by its id, so a given restaurant always shows the same
// menu across renders and reloads.
//
// Every dish below has its OWN photo, and no URL is reused anywhere in this
// file — the earlier version served a chaat photo for garlic bread and a
// cappuccino for lime soda. All URLs are Zomato CDN images taken from db.json,
// matched to the dish they actually depict.
// ---------------------------------------------------------------------------

// Dish pools keyed by a cuisine keyword found in `variety`.
const POOLS = {
    pizza: [
        { name: "Margherita Pizza", desc: "Thin crust, San Marzano sauce, fresh mozzarella and basil.", mult: 0.9, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/e27/ca8acd8c6ad33a9e33816b85921a0e27.jpg" },
        { name: "Farmhouse Pizza", desc: "Onion, capsicum, mushroom and tomato on a hand-tossed base.", mult: 1.1, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/f95/d9b95c93f774525d98288216d728cf95.jpg" },
        { name: "Peri Peri Chicken Pizza", desc: "Spicy peri peri chicken, red paprika and a double cheese blend.", mult: 1.4, veg: false, imgUrl: "https://b.zmtcdn.com/data/dish_photos/2d1/e0b25764746e75ea239f5ae6149502d1.jpg?output-format=webp" },
        { name: "Truffle Mushroom Pizza", desc: "Wild mushrooms, mozzarella and a finish of truffle oil.", mult: 1.35, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/11b/6081f0ef60c9a2d032dca41eeddfc11b.jpg" },
        { name: "Cheese Burst Pizza", desc: "Molten cheese sealed inside the crust, baked to order.", mult: 1.2, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/7b4/9ed51f9a90b75717631681cfa9ac27b4.jpg" },
        { name: "Garlic Bread Sticks", desc: "Buttery garlic bread baked fresh, served with cheesy dip.", mult: 0.5, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/2df/28d1140c095dad518bf4c0b00a7452df.jpg" },
    ],
    burger: [
        { name: "Classic Veg Burger", desc: "Crunchy patty, lettuce, tomato and house mayo in a toasted bun.", mult: 0.7, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/6ce/aafab7fd85d60aed9ae66190ec42d6ce.jpg" },
        { name: "Double Cheese Burger", desc: "Two smashed patties, molten cheddar and caramelised onion.", mult: 1.15, veg: false, imgUrl: "https://b.zmtcdn.com/data/dish_photos/d0f/02be5bded9b55108435eff0f4a417d0f.jpg" },
        { name: "Crispy Chicken Burger", desc: "Buttermilk-fried chicken thigh with slaw and chipotle sauce.", mult: 1.3, veg: false, imgUrl: "https://b.zmtcdn.com/data/dish_photos/729/65a56bb6fc80afd8202b87cc6a447729.jpg" },
        { name: "Paneer Tikka Burger", desc: "Char-grilled paneer, mint mayo and pickled onion.", mult: 1.0, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/fb2/afc5683bd3d260186b06d6813583efb2.jpg" },
        { name: "Loaded Peri Peri Fries", desc: "Golden fries tossed in peri peri, topped with cheese sauce.", mult: 0.55, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/2cd/554a151953be2415e44e3d561e8742cd.jpg" },
        { name: "Crispy Chicken Wings", desc: "Six wings glazed in smoky barbecue, served with dip.", mult: 0.95, veg: false, imgUrl: "https://b.zmtcdn.com/data/dish_photos/684/797b6c075553c0194ea537a3fef9d684.jpg" },
    ],
    coffee: [
        { name: "Cappuccino", desc: "Double shot espresso with velvety steamed milk and cocoa dust.", mult: 0.6, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/736/53a4e7723dace47214c3f5f4118cb736.png" },
        { name: "Cold Brew", desc: "Slow-steeped for 18 hours for a smooth, low-acidity finish.", mult: 0.8, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/9dc/432d248a9f7dd20817ba48a8686749dc.jpg?output-format=webp" },
        { name: "Hazelnut Latte", desc: "Espresso, roasted hazelnut syrup and silky micro-foam.", mult: 0.85, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/67b/578488e8750ab630f54e013d24b8067b.jpg?output-format=webp" },
        { name: "Classic Espresso", desc: "A single origin shot, pulled short and strong.", mult: 0.45, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/c3a/ed504a8d137fc6e1ff27291cfce41c3a.jpg" },
        { name: "Choco Chip Cookie", desc: "Warm, gooey centre with Belgian dark chocolate chunks.", mult: 0.35, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/46c/3228748042b79c1be2ec769fb14ba46c.jpg" },
        { name: "Caramel Macchiato", desc: "Vanilla, steamed milk, espresso and a caramel drizzle.", mult: 0.85, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/ad2/05729c110f50d7bde8f4fbb1b26c1ad2.jpg" },
    ],
    cake: [
        { name: "Belgian Chocolate Truffle", desc: "Layered sponge soaked in ganache, finished with dark truffle.", mult: 1.25, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/7bb/3a5ee0417cb34c83afcfb8ecd99af7bb.jpg" },
        { name: "Red Velvet Pastry", desc: "Cocoa-kissed sponge with classic cream cheese frosting.", mult: 0.7, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/a20/d4fd5ac662cc8cc69a0d64359d28ba20.jpg" },
        { name: "Blueberry Cheesecake", desc: "New York style baked cheesecake under a blueberry compote.", mult: 1.05, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/1b8/aba9d5ea63bf8b80e8c93b65275c81b8.jpg" },
        { name: "Assorted Brownie Box", desc: "Six fudge brownies — walnut, sea salt and triple chocolate.", mult: 0.9, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/7ae/c4d38b91aa0c86c528e681e8e535f7ae.jpg" },
        { name: "Fresh Fruit Gateau", desc: "Vanilla sponge, whipped cream and seasonal fruit.", mult: 1.15, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/276/9c9756c9c390f8b5810542429fd50276.jpg" },
        { name: "Butterscotch Pastry", desc: "Caramelised butterscotch crunch folded through fresh cream.", mult: 0.65, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/af6/432c26f4c1dd6fd0b9f41f87ce6a5af6.jpg" },
    ],
    chaat: [
        { name: "Dahi Puri", desc: "Crisp puris filled with potato, chilled curd and tamarind chutney.", mult: 0.55, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/f72/a9a7391ff814c3248e83a60f61579f72.jpg" },
        { name: "Aloo Tikki Chaat", desc: "Griddled potato tikki with chole, curd and sweet-sour chutneys.", mult: 0.6, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/3c0/11aa20dd6b635a118a63e2ef6b1843c0.jpg" },
        { name: "Raj Kachori", desc: "A giant kachori loaded with sprouts, curd, sev and pomegranate.", mult: 0.75, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/803/5ca47cc8d292db89602d5741c6754803.jpg" },
        { name: "Pav Bhaji", desc: "Buttery mashed vegetable bhaji with toasted pav and onion.", mult: 0.7, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/f39/2c0da4f66093790ac101f3d1d1808f39.jpg" },
        { name: "Golgappe (8 pcs)", desc: "Semolina puris with spiced potato and chilled jaljeera.", mult: 0.5, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/fc7/4d5bd7946c83dba62935ddbf5ff82fc7.jpg" },
        { name: "Samosa Chole", desc: "Two crisp samosas smothered in Punjabi chole.", mult: 0.6, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/06a/962034c5855fe767c0c038e0decaa06a.jpg" },
    ],
    "ice cream": [
        { name: "Belgian Chocolate Scoop", desc: "Slow-churned dark chocolate with cocoa nibs.", mult: 0.5, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/73a/f92470bd2ef4c1c0a9db26411babc73a.jpg" },
        { name: "Sundae Supreme", desc: "Three scoops, hot fudge, roasted nuts and whipped cream.", mult: 0.95, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/1af/50662575103454eb64ef88633f7c41af.jpg" },
        { name: "Brownie Fudge Tub", desc: "500 ml tub with brownie chunks folded through vanilla bean.", mult: 1.2, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/b11/ba5cd34d7557dc94213f5c816df68b11.jpg" },
        { name: "Fresh Fruit Falooda", desc: "Rose syrup, sabja, vermicelli and a scoop of kulfi.", mult: 0.8, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/d27/81d8245bf7bac57cbbb241d9b2f45d27.jpg" },
        { name: "Butterscotch Cone", desc: "Butterscotch swirl with praline crunch in a waffle cone.", mult: 0.45, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/9e1/ce30d09038f8474b271927e0c4a079e1.jpg" },
        { name: "Choco Lava Ice Cream Cake", desc: "Warm chocolate cake layered with vanilla ice cream.", mult: 1.1, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/990/547bf7089209a09163c86820cf47a990.jpg" },
    ],
    shake: [
        { name: "Thick Oreo Shake", desc: "Blended cookies and cream, topped with crumble.", mult: 0.7, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/194/aab2479d72c040574842e4bfc10a7194.jpg?output-format=webp" },
        { name: "Belgian Chocolate Shake", desc: "Real chocolate blended with vanilla bean ice cream.", mult: 0.8, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/bbf/022e247bac5100827852e93a8e8d0bbf.jpg" },
        { name: "Strawberry Shake", desc: "Fresh strawberries, chilled milk and a swirl of cream.", mult: 0.65, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/716/2ba893d0828d837c7357dc72a715b716.jpg" },
        { name: "Cold Coffee Frappe", desc: "Double espresso, ice cream and a thick chocolate drizzle.", mult: 0.7, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/7c0/d9134ccd345574403a27320f517867c0.jpg" },
        { name: "Mango Smoothie", desc: "Alphonso mango blended with yoghurt and honey.", mult: 0.7, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/899/f91dd712b028715316c7df0b8f569899.jpg" },
        { name: "Kitkat Thickshake", desc: "Loaded with Kitkat, whipped cream and chocolate sauce.", mult: 0.85, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/4d7/b6d5c397c366684a3e82ba48521c14d7.jpg" },
    ],
};

// Multi-cuisine and dine-out restaurants (Italian / Continental / European /
// Mediterranean / Cafe) get this. Every dish here is something such a kitchen
// genuinely serves, so the photos stay honest.
const CONTINENTAL = [
    { name: "Wood-Fired Margherita", desc: "Blistered crust, buffalo mozzarella and torn basil.", mult: 0.75, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/b48/043ea980801536177ffdd08abac3eb48.jpg" },
    { name: "Penne Alfredo", desc: "Penne folded through a slow-reduced parmesan cream.", mult: 0.7, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/6a8/c4ed04db6587c3b9cc5562f75ad0e6a8.jpg" },
    { name: "Grilled Chicken Burger", desc: "Herb-marinated chicken, aioli and rocket in a brioche bun.", mult: 0.8, veg: false, imgUrl: "https://b.zmtcdn.com/data/dish_photos/bfa/9ae3cdb1c4ba0e2480c770d979facbfa.jpg" },
    { name: "Truffle Parmesan Fries", desc: "Skin-on fries with truffle oil and shaved parmesan.", mult: 0.5, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/a67/5d73a3bd4d7704ba324eed714ca5ca67.jpg" },
    { name: "Baked Cheesecake", desc: "Vanilla bean cheesecake on a digestive biscuit base.", mult: 0.65, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/60d/c4794df12114dc1297e337e159c3660d.jpg" },
    { name: "Tiramisu", desc: "Espresso-soaked savoiardi layered with mascarpone.", mult: 0.7, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/734/00d8c91368a10863688d59ddd6dec734.jpg" },
    { name: "Flat White", desc: "Ristretto shots under a thin layer of steamed milk.", mult: 0.35, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/e51/11c06414570ebd50fb598c7c7eb14e51.jpg" },
    { name: "Virgin Mojito", desc: "Lime, mint and soda over crushed ice.", mult: 0.3, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/b37/300527a10284c1dea3bde6132fec8b37.jpg?output-format=webp" },
];

// Added on top when the restaurant lists an Indian cuisine.
const INDIAN = [
    { name: "Paneer Tikka", desc: "Cottage cheese marinated in hung curd, charred in the tandoor.", mult: 0.8, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/8f0/f71e31b180d5a564baabf20151cc78f0.jpg" },
    { name: "Chole Bhature", desc: "Punjabi chole with two puffed bhature and pickled onion.", mult: 0.6, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/ea6/a6544e465cce1f7f9b15431eaa33dea6.jpg" },
    { name: "Masala Papad", desc: "Roasted papad topped with onion, tomato and chaat masala.", mult: 0.25, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/6a3/ccc2819391248da24428ff31cf6546a3.jpg" },
    { name: "Gulab Jamun (2 pcs)", desc: "Warm khoya dumplings soaked in cardamom syrup.", mult: 0.35, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/057/d6de3ccf74e9556f3fa06122291c5057.jpg" },
];

// Always-available add-ons so every menu has some breadth.
const SIDES = [
    { name: "Masala Fries", desc: "Crisp fries dusted with our house masala.", mult: 0.35, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/4f9/c164f1abfc6b3e9ea4e67538c19074f9.jpg" },
    { name: "Fresh Lime Soda", desc: "Sweet or salted, served ice cold.", mult: 0.2, veg: true, imgUrl: "https://b.zmtcdn.com/data/dish_photos/c3f/fd075c98b6ee7f594ec8b4e3bb08fc3f.jpg?output-format=webp" },
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

const INDIAN_CUISINES = ["north indian", "modern indian", "mughlai", "biryani", "punjabi", "indian"];
const CONTINENTAL_CUISINES = ["italian", "continental", "european", "mediterranean", "cafe", "pasta", "oriental", "asian", "japanese", "turkish"];

// Round to a price that looks like a real menu (…9 endings, never below ₹49).
const nicePrice = (value) => Math.max(49, Math.round(value / 10) * 10) - 1;

export const buildMenu = (data = {}) => {
    const variety = String(data.variety || "").toLowerCase();
    const seed = Number(data.id) || 1;

    // `price` is Zomato's "cost for one", which covers a couple of courses —
    // a single dish sits well under it. Clamping also stops a ₹2400 fine-dine
    // listing from quoting ₹2199 for a margherita.
    const costForOne = Number(data.price) || 250;
    const base = Math.max(120, Math.min(costForOne * 0.6, 700));

    // Every pool whose cuisine keyword appears in this restaurant's `variety`.
    const matched = Object.entries(POOLS)
        .filter(([key]) => variety.includes(key))
        .flatMap(([, dishes]) => dishes);

    let chosen = matched;
    if (CONTINENTAL_CUISINES.some((c) => variety.includes(c))) {
        chosen = [...chosen, ...CONTINENTAL];
    }
    if (INDIAN_CUISINES.some((c) => variety.includes(c))) {
        chosen = [...chosen, ...INDIAN];
    }
    if (!chosen.length) chosen = CONTINENTAL;

    // De-dupe by name — a cafe that also serves pizza shouldn't list two
    // margheritas from two different pools.
    const seen = new Set();
    chosen = [...chosen, ...SIDES].filter((dish) => {
        if (seen.has(dish.name)) return false;
        seen.add(dish.name);
        return true;
    });

    return chosen.map((dish, i) => ({
        ...dish,
        restaurant: data.name || "",
        // The seed nudges prices a little per restaurant so two places serving
        // the same dish don't quote identical rupees.
        price: nicePrice(base * dish.mult + ((seed * 13 + i * 7) % 40)),
    }));
};
