import { CategoryListing } from "../Utils/Listing/CategoryListing"
import { HERO_FALLBACK } from "../Utils/Listing/categories"

export const Random = () => (
    <CategoryListing
        endpoint="/random"
        basePath="/delivery"
        title="Order Food Online in Delhi NCR"
        subtitle="From 10-minute biryani runs to a slow Sunday brunch — every kitchen worth ordering from, in one place."
        crumb="Delivery"
        heroFallback={HERO_FALLBACK.delivery}
        showRail
        railKey="All"
        spotlightTitle="Trending on Zomato today"
    />
)
