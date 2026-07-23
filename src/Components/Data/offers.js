// Coupon catalogue. The Offers page renders these, the cart applies them and
// the payment summary prices them — all three read this one list so a code can
// never mean two different things on two different screens.
//
// `type: "percent"` uses percent + maxDiscount; `type: "flat"` uses amount.

export const COUPONS = [
    {
        code: "WELCOME50", type: "percent", percent: 50, maxDiscount: 100, minOrder: 0,
        title: "50% OFF up to ₹100", sub: "On your first order",
        tag: "New users", color: "#ff5a5f",
    },
    {
        code: "ZOMATO60", type: "percent", percent: 60, maxDiscount: 120, minOrder: 199,
        title: "60% OFF up to ₹120", sub: "On orders above ₹199",
        tag: "All users", color: "#7b2ff7",
    },
    {
        code: "HDFC15", type: "percent", percent: 15, maxDiscount: 150, minOrder: 399,
        title: "Flat 15% OFF", sub: "Up to ₹150 on orders above ₹399",
        tag: "HDFC Bank", color: "#0f9d58",
    },
    {
        code: "FEAST40", type: "percent", percent: 40, maxDiscount: 80, minOrder: 149,
        title: "40% OFF up to ₹80", sub: "On orders above ₹149",
        tag: "Weekends", color: "#f4820a",
    },
    {
        code: "ICICI20", type: "percent", percent: 20, maxDiscount: 200, minOrder: 499,
        title: "Flat 20% OFF", sub: "Up to ₹200 on orders above ₹499",
        tag: "ICICI Bank", color: "#1a73e8",
    },
    {
        code: "FLAT75", type: "flat", amount: 75, minOrder: 249,
        title: "₹75 OFF", sub: "Flat discount on orders above ₹249",
        tag: "Everyone", color: "#c48f00",
    },
];

export const findCoupon = (code) =>
    COUPONS.find((c) => c.code.toLowerCase() === String(code || "").trim().toLowerCase());

// Charges shown in the bill. Delivery is free past the threshold, which is
// why the cart can nudge you towards it.
export const FREE_DELIVERY_ABOVE = 499;
export const DELIVERY_FEE = 39;
export const GST_RATE = 0.05;

export const buildBill = (subtotal, discount) => {
    const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
    const taxes = Math.round((subtotal - discount) * GST_RATE);
    return {
        subtotal,
        discount,
        delivery,
        taxes,
        total: Math.max(0, subtotal - discount + delivery + taxes),
    };
};
