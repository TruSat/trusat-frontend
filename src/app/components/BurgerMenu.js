import React from "react";
import { slide as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";
import { useCatalogState } from "../../catalog/catalog-context";
import { useUserState } from "../../user/user-context";

export default function BurgerMenu(props) {
  const { address } = useUserState();
  const { catalogFilter } = useCatalogState();

  return (
    // Pass on our props
    <Menu {...props}>
      <NavLink className="app__nav-link" to="/">
        Home
      </NavLink>
      <NavLink className="app__nav-link" to={`/catalog/${catalogFilter}`}>
        Catalog
      </NavLink>
      <NavLink className="app__nav-link" to={`/profile${address}`}>
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
