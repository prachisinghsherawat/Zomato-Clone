import { Collections } from "../Home/Collection"
import { CategoryListing } from "../Utils/Listing/CategoryListing"
import { HERO_FALLBACK } from "../Utils/Listing/categories"
import "./Dinning.css"

export const DinningOut = () => (
    <CategoryListing
        endpoint="/restaurants"
        basePath="/dinning"
        title="Dine-Out Restaurants in Delhi NCR"
        subtitle="Book a table at the city's most-loved rooftops, bistros and fine-dine rooms — with live ratings and average spend up front."
        crumb="Dining Out"
        crumbTo="/dinning"
        heroFallback={HERO_FALLBACK.dinning}
        spotlightTitle="Delhi's highest rated tables"
    >
        <div className="collectionBox">
            <Collections />
        </div>
    </CategoryListing>
)
