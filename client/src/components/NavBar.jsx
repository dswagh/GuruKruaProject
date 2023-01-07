import { AppBar, Toolbar, styled } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import background from "../images/ukade.png";
const Header = styled(AppBar)`
  background: #111111;
`;

const Tabs = styled(NavLink)`
  font-size: 20px;
  margin-right: 20px;
  color: inherit;
  text-decoration: none;
`;
const navBar = () => {
  return (
    <>
      <div style={{ backgroundImage: `url(${background})` }}></div>
      <Header position="static">
        <Toolbar>
          <Tabs to="/">Gurukrupa Dairy</Tabs>
          <Tabs to="/allProduct">All Products</Tabs>
          <Tabs to="/addProduct">Add Entry</Tabs>
          <Tabs to="/addProdDetails">Add Prod Details</Tabs>
          <Tabs to="/report">Report</Tabs>
        </Toolbar>
      </Header>
    </>
  );
};

export default navBar;
