import { CategoryListing } from "../Utils/Listing/CategoryListing"
import { HERO_FALLBACK } from "../Utils/Listing/categories"

export const Shake = () => (
    <CategoryListing
        endpoint="/Shake"
        basePath="/delivery/shake"
        title="Shakes & Smoothies in Delhi NCR"
        subtitle="Thick shakes, frappes and fruit blends — the thickest straws in town."
        heroFallback={HERO_FALLBACK.delivery}
        showRail
        railKey="Shake"
        spotlightTitle="Highest rated shake right now"
    />
)
