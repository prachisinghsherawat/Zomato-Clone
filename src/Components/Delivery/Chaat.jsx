import { CategoryListing } from "../Utils/Listing/CategoryListing"
import { HERO_FALLBACK } from "../Utils/Listing/categories"

export const Chaat = () => (
    <CategoryListing
        endpoint="/Chaat"
        basePath="/delivery/chaat"
        title="Chaat & Street Food in Delhi NCR"
        subtitle="Golgappe, tikki and dahi puri — the tangy, chatpata classics Delhi does best."
        heroFallback={HERO_FALLBACK.delivery}
        showRail
        railKey="Chaat"
        spotlightTitle="Highest rated chaat right now"
    />
)
