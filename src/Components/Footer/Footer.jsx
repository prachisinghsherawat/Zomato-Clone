import "./Footer.css"
import twitter from "../Images/twitter.png"
import instagram from "../Images/instagram.png"
import linkedin from "../Images/linkedin.png"
import youtube from "../Images/youtube.png"
import facebook from "../Images/facebook.png"

const footerColumns = [
    {
        heading: "About Zomato",
        links: ["Who We Are", "Blog", "Work With Us", "Investor Relations", "Report Fraud", "Contact Us"],
    },
    {
        heading: "Zomaverse",
        links: ["Zomato", "Blinkit", "Feeding India", "Hyperpure", "Zomato Live", "Zomaland"],
    },
    {
        heading: "For Restaurants",
        links: ["Partner With Us", "Apps For You"],
    },
    {
        heading: "Learn More",
        links: ["Privacy", "Security", "Terms", "Sitemap"],
    },
]

const socials = [
    { src: linkedin, alt: "LinkedIn" },
    { src: instagram, alt: "Instagram" },
    { src: twitter, alt: "Twitter" },
    { src: youtube, alt: "YouTube" },
    { src: facebook, alt: "Facebook" },
]

export const Footer = () => {

    return(

        <footer className="siteFooter">

            <div className="footerMain">
                <h2 className="footerBrand">zomato</h2>

                <div className="footerColumns">
                    {footerColumns.map((col) => (
                        <div className="footerCol" key={col.heading}>
                            <h4>{col.heading}</h4>
                            <ul>
                                {col.links.map((link) => (
                                    <li key={link}>{link}</li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="footerCol footerSocialCol">
                        <h4>Social</h4>
                        <div className="footerSocials">
                            {socials.map((s) => (
                                <img key={s.alt} src={s.src} alt={s.alt} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="footerBottom">
                <p>By continuing past this page, you agree to our Terms of Service, Cookie Policy,
                    Privacy Policy and Content Policies.</p>
                <p className="footerCopy">© 2008–{new Date().getFullYear()} Zomato Clone™ Ltd. All rights reserved.</p>
            </div>

        </footer>
    )
}
