
import "./Filter.css"
import React, { useState } from "react";
import Carousel from "react-simply-carousel";
import { Heading, Box, Text, Divider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


export const FoodFilter = ({ data, title, minititle }) => {

  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate()

  return (
    <Box className="minicard" p={3} pt={5}>
      <Heading
        size={{ base: "md", md: "md", lg: "md" }}
        align={"start"}
        ml={{ base: 20, md: 40, lg: 40 }}
      >
        {title}
      </Heading>
      <Text
        size={{ base: "md", md: "lg", lg: "lg" }}
        align={"start"}
        ml={{ base: 20, md: 40, lg: 40 }}
      >
        {minititle}
      </Text>
      <Carousel
        p={6}
        updateOnItemClick
        containerProps={{
          style: {
            width: "100%",
            justifyContent: "space-between",
          },
        }}
        activeSlideIndex={activeSlide}
        activeSlideProps={{
          style: {
            // background: "blue",
          },
        }}
        onRequestChange={setActiveSlide}
        forwardBtnProps={{
          children: ">",
          style: {
            width: 50,
            height: 60,
            minWidth: 60,
            fontSize: 28,
            backgroundColor : "white",
            border: "none",
            alignSelf: "center",
          },
        }}
        backwardBtnProps={{
          children: "<",
          style: {
            width: 60,
            height: 60,
            minWidth: 60,
            fontSize: 28,
            backgroundColor : "white",
            border: "none",
            alignSelf: "center",
          },
        }}
        // itemsToShow={{ base: 2, md: 4, lg: 5 }}
        itemsToShow={7}
        speed={400}
      >
        {data.map((item, index) => (
          <Box id="caroBoxes" onClick={()=> navigate(`${item.route}`)}
            width={{ base: "320px", md: "320px", lg: "320px" }}
            p={5}
            style={{
              height: 170,
              marginLeft : 40,
              textAlign: "center",
              borderRadius: "100px",
            }}
            key={index}>

            <img
              style={{
                borderRadius: "100px",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
              }}
              src={item.image}
            />
          </Box>
        ))}
      </Carousel>
      <Divider borderWidth="6px" ml={5} mr={5} colorScheme="gray.100" />
    </Box>
  );
};