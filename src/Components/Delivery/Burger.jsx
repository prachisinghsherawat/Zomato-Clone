import { CategoryListing } from "../Utils/Listing/CategoryListing"
import { HERO_FALLBACK } from "../Utils/Listing/categories"

export const Burger = () => (
    <CategoryListing
        endpoint="/Burger"
        basePath="/delivery/burger"
        title="Burgers in Delhi NCR"
        subtitle="Juicy patties, molten cheese and buns toasted to order — from smash-burger joints to late-night classics."
        heroFallback={HERO_FALLBACK.delivery}
        showRail
        railKey="Burger"
        spotlightTitle="Highest rated burger right now"
    />
)
