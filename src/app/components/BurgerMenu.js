import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import { useAuthState } from "../../auth/auth-context";

export default function BurgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userAddress } = useAuthState();

  const handleStateChange = state => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  return (
    <Menu
      isOpen={menuOpen}
      onStateChange={state => handleStateChange(state)}
      closeMenu={closeMenu}
    >
      <NavLink onClick={() => closeMenu()} to={`/`}>
        Home
      </NavLink>

      <NavLink onClick={() => closeMenu()} to={`/catalog/priorities`}>
        Catalog
      </NavLink>

      {userAddress ? (
        <NavLink onClick={() => closeMenu()} to={`/profile/${userAddress}`}>
          My Profile
        </NavLink>
      ) : null}

      <NavLink onClick={() => closeMenu()} to={`/about`}>
        About
      </NavLink>

      <NavLink onClick={() => closeMenu()} to={`/how`}>
        How To
      </NavLink>
    </Menu>
  );
}
