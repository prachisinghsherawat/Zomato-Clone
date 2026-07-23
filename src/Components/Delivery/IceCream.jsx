import { CategoryListing } from "../Utils/Listing/CategoryListing"
import { HERO_FALLBACK } from "../Utils/Listing/categories"

export const IceCream = () => (
    <CategoryListing
        endpoint="/IceCream"
        basePath="/delivery/ice-cream"
        title="Ice Cream in Delhi NCR"
        subtitle="Scoops, sundaes and tubs from gelaterias and dessert bars across the city."
        heroFallback={HERO_FALLBACK.delivery}
        showRail
        railKey="Ice Cream"
        spotlightTitle="Highest rated ice cream right now"
    />
)
