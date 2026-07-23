import { CategoryListing } from "../Utils/Listing/CategoryListing"
import { HERO_FALLBACK } from "../Utils/Listing/categories"

export const Coffee = () => (
    <CategoryListing
        endpoint="/Coffee"
        basePath="/delivery/coffee"
        title="Coffee in Delhi NCR"
        subtitle="Cold brews, flat whites and cosy cafés for every kind of caffeine emergency."
        heroFallback={HERO_FALLBACK.delivery}
        showRail
        railKey="Coffee"
        spotlightTitle="Highest rated coffee right now"
    />
)
