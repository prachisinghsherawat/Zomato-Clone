import { CategoryListing } from "../Utils/Listing/CategoryListing"
import { HERO_FALLBACK } from "../Utils/Listing/categories"

export const Cake = () => (
    <CategoryListing
        endpoint="/cake"
        basePath="/delivery/cake"
        title="Cakes & Bakes in Delhi NCR"
        subtitle="Truffle, red velvet and cheesecake from patisseries that never miss an occasion."
        heroFallback={HERO_FALLBACK.delivery}
        showRail
        railKey="Cake"
        spotlightTitle="Highest rated cake right now"
    />
)
