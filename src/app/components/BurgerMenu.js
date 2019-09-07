import React from "react";
import { slide as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";

export default function BurgerMenu(props) {
  return (
    // Pass on our props
    <Menu {...props}>
      <NavLink className="app__nav-link" to="/">
        Home
      </NavLink>
      <NavLink className="app__nav-link" to="/catalog">
        Catalog
      </NavLink>
      <NavLink className="app__nav-link" to="/profile">
        My Profile
      </NavLink>
      <NavLink className="app__nav-link" to="/about">
        About
      </NavLink>
      <NavLink className="app__nav-link" to="/how">
        How
      </NavLink>
    </Menu>
  );
}
