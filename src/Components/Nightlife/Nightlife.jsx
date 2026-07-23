import { CategoryListing } from "../Utils/Listing/CategoryListing"
import { HERO_FALLBACK } from "../Utils/Listing/categories"
import "./Nightlife.css"

export const Nightlife = () => (
    <CategoryListing
        endpoint="/restaurants"
        basePath="/nightlife"
        title="Nightlife & Clubs in Delhi NCR"
        subtitle="Rooftop bars, live-gig lounges and after-hours clubs — everything that keeps the city up past midnight."
        crumb="Nightlife"
        crumbTo="/nightlife"
        heroFallback={HERO_FALLBACK.nightlife}
        spotlightTitle="Where the city is tonight"
    />
)
