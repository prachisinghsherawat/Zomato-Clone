import { TabsNav } from "../Navbar/TabsNav"
import { ZomatoNav } from "../Navbar/ZomatoNav"
import { Filter } from "../FilterPage/Filter"
import { FoodFilter } from "../FilterPage/FoodFilter"
import {FoodData}  from "../Data/FilterData"


export const FoodItems = () => {

    console.log(FoodData)

    return(
        
        <>
        
        < ZomatoNav />
        < TabsNav />
        < Filter />
        < FoodFilter data = {FoodData}/>

        </>
    )
}