import "./Navbar.css"
import delivery from "../Icons/delivery.png"
import order from "../Icons/order.png"
import night from "../Icons/night.png"
import deliveryCol from "../Icons/deliveryCol.png"
import orderCol from "../Icons/orderCol.png"
import nightCol from "../Icons/nightCol.png"
import {useState} from "react"
import {useNavigate} from "react-router-dom"


export const TabsNav = () => {

    const navigate = useNavigate()
    const [isDelivery , setDelivery] = useState(false)
    const [isDinning , setDinning] = useState(false)
    const [isNightLife , setNightLife] = useState(false)



    const HandleTabs = (val) => {

        if(val == "delivery"){

            setDelivery(true)
            setDinning(false)
            setNightLife(false)
            document.querySelector(".colorTab1").style.color = "red"
            document.querySelector(".colorBox1").style.borderBottom = "solid red"
            document.querySelector(".colorTab2").style.color = "black"
            document.querySelector(".colorBox2").style.borderBottom = "none"
            document.querySelector(".colorTab3").style.color = "black"
            document.querySelector(".colorBox3").style.borderBottom = "none"
            
        }

        else if(val == "dinning"){

            setDelivery(false)
            setDinning(true)
            setNightLife(false)
            document.querySelector(".colorTab1").style.color = "black"
            document.querySelector(".colorBox1").style.borderBottom = "none"
            document.querySelector(".colorTab2").style.color = "red"
            document.querySelector(".colorBox2").style.borderBottom = "solid red"
            document.querySelector(".colorTab3").style.color = "black"
            document.querySelector(".colorBox3").style.borderBottom = "none"
            
        }
        
        else{

            setDelivery(false)
            setDinning(false)
            setNightLife(true)
            document.querySelector(".colorTab1").style.color = "black"
            document.querySelector(".colorBox1").style.borderBottom = "none"
            document.querySelector(".colorTab2").style.color = "black"
            document.querySelector(".colorBox2").style.borderBottom = "none"
            document.querySelector(".colorTab3").style.color = "red"
            document.querySelector(".colorBox3").style.borderBottom = "solid red"
        
        }

        navigate("/" + val)
    }


    return(

        <>
            <div className="tabs">

                <div className="colorBox1" onClick={()=> {HandleTabs("delivery")}} >

                    <div className="icontab">
                        { !isDelivery ? 

                            <img src={delivery} alt="" height="100%" width="100%"/>
                         : 
                            <img src={deliveryCol} alt="" height="100%" width="100%"/>
                        }
                        
                    </div>

                    <p className="colorTab1">Delivery</p>
                </div>

                <div className="colorBox3" onClick={()=>HandleTabs("nightlife")}>

                    <div className="icontab">                       
                    { !isNightLife ? 

                        <img src={night} alt="" height="100%" width="100%"/>
                     : 
                        <img src={nightCol} alt="" height="100%" width="100%"/>
                    }

                    </div>

                    <p className="colorTab3">Nightlife</p>

                </div>

                <div className="colorBox2" onClick={()=>HandleTabs("dinning")} >

                    <div className="icontab">    
                    { !isDinning ? 
                        
                        <img src={order} alt="" height="100%" width="100%"/>
                     : 
                        <img src={orderCol} alt="" height="100%" width="100%"/>
                    } 
                  
                    </div>
                    <p className="colorTab2">Dinning Out</p>
                </div>

                
            </div>
        </>
    )
}
