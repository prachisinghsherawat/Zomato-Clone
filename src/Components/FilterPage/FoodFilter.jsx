
import "./Filter.css"
import React, { useState } from "react";
import Carousel from "react-simply-carousel";
import { useNavigate } from "react-router-dom";


export const FoodFilter = ({ data, title = "Eat what makes you happy", minititle = "Order in from the best restaurants near you" }) => {

  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate()

  const arrowStyle = {
    width: 44,
    height: 44,
    minWidth: 44,
    fontSize: 20,
    fontWeight: 700,
    color: "#cb202d",
    backgroundColor: "#fff",
    border: "1px solid #e8e8e8",
    borderRadius: "50%",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    cursor: "pointer",
    alignSelf: "center",
  };

  return (
    <div className="carouselSection">
      <div className="carouselHead">
        <h2>{title}</h2>
        <p>{minititle}</p>
      </div>

      <Carousel
        updateOnItemClick
        containerProps={{
          style: {
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          },
        }}
        activeSlideIndex={activeSlide}
        onRequestChange={setActiveSlide}
        forwardBtnProps={{ children: "›", style: arrowStyle }}
        backwardBtnProps={{ children: "‹", style: arrowStyle }}
        itemsToShow={6}
        speed={400}
      >
        {data.map((item, index) => (
          <div
            className="caroItem"
            onClick={() => navigate(`${item.route}`)}
            key={index}
          >
            <div className="caroImgWrap">
              <img src={item.image} alt={item.food} />
            </div>
            <p>{item.food}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
