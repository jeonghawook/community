  import React from "react";
  import { Box, Image, Icon } from "@chakra-ui/react";
  import { Link } from "react-router-dom";
  import { useLocation } from "react-router-dom";
  import { CgProfile } from "react-icons/cg";
  import { BsHouseHeartFill, BsSearch } from "react-icons/bs";
  import { IoCreateOutline } from "react-icons/io5";
  import CreatePage from "../../pages/CreatePage";


  const linkStyle = {
    display: "flex",
    alignItems: "center",
    fontSize: "2.0rem",
    paddingTop: "1.5rem",
    paddingLeft: "1.0rem",
  };

  const LeftSidebar = () => {
    const location = useLocation();

    return (
      <Box
        className="custom-scrollbar leftsidebar"
        height={"100%"}
        paddingTop={"50px"}
      >
        <Link  to={"/search"}  style={linkStyle}>
          <BsSearch style={{ marginRight: "0.25rem" }} /> Search
        </Link>

        <Link to={"/create"} style={linkStyle} >
          <IoCreateOutline style={{ marginRight: "0.25rem" }} /> Write
        </Link>

        <Link to={'/community'} style={linkStyle}>
          <BsHouseHeartFill style={{ marginRight: "0.25rem" }} /> Community
        </Link>

        <Link style={linkStyle}>
          <CgProfile style={{ marginRight: "0.25rem" }} /> Profile
        </Link>
      </Box>
    );
  };

  export default LeftSidebar;
