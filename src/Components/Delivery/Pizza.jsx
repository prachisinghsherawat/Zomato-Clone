import { CategoryListing } from "../Utils/Listing/CategoryListing"
import { HERO_FALLBACK } from "../Utils/Listing/categories"

export const Pizza = () => (
    <CategoryListing
        endpoint="/Pizza"
        basePath="/delivery/pizza"
        title="Pizza in Delhi NCR"
        subtitle="Wood-fired, hand-tossed or thin crust — the city's best pies, delivered hot and cheesy."
        heroFallback={HERO_FALLBACK.delivery}
        showRail
        railKey="Pizza"
        spotlightTitle="Highest rated pizza right now"
    />
)
