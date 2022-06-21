import { TabsNav } from "../Navbar/TabsNav"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import { Filter } from "../FilterPage/Filter"
import { FoodFilter } from "../FilterPage/FoodFilter"


export const FoodItems = () => {

    return(
        
        <>
        
        < ZomatoNav />
        < TabsNav />
        < Filter />
        < FoodFilter />

        </>
    )
}