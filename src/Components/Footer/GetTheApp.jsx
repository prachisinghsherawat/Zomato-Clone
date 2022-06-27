
import Apps from "../Images/Apps.png"
import Explore from "../Images/Explore.png"
import ZomatoApp from "../Images/ZomatoApp.png"
import Localities from "../Images/Localities.png"


export const GetTheLocalities = () => {

    return(

        <>

        <div className="localities">
            <div>
                <img src={Localities} alt="" height="100%" width="100%" />
            </div>
            <div>
                <img src={ZomatoApp} alt="" height="100%" width="100%" />
            </div>
            <div>
                <img src={Explore} alt="" height="100%" width="100%" />
            </div>
            <div>
                <img src={Apps} alt="" height="100%" width="100%" />
            </div>
        </div>

        
        </>
    )
}