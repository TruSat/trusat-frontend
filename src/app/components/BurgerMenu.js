import React from "react";
import { slide as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";

export default function BurgerMenu(props) {
  return (
    // Pass on our props
    <Menu {...props}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/catalog">Catalog</NavLink>
      <NavLink to="/profile">My Profile</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/how">How</NavLink>
    </Menu>
  );
}
