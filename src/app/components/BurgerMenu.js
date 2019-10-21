import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import { useAuthState } from "../../auth/auth-context";
import IconWave from "../../assets/icon-wave.svg"
import IconGlobe from "../../assets/icon-globe.svg"
import IconSat from "../../assets/icon-satellite.svg"
import IconLight from "../../assets/icon-light.svg"
import IconUser from "../../assets/icon-user.svg"
import IconQuestion from "../../assets/icon-question.svg"

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

      {userAddress ? null : (
        <NavLink onClick={() => closeMenu()} to={`/join`}
        className="app__nav-link--mobile-join">
          Join
        </NavLink>
      )}

      {userAddress ? null : (
        <NavLink onClick={() => closeMenu()} to={`/login`}>
          Log In
        </NavLink>
      )}
      <br></br>

      <NavLink onClick={() => closeMenu()} to={`/`}>
        <img className="app__nav__icon" src={IconWave} alt="icon"></img>
        Welcome
      </NavLink>

      <NavLink onClick={() => closeMenu()} to={`/catalog/priorities`}>
        <img className="app__nav__icon" src={IconSat} alt="icon"></img>
        Catalog
      </NavLink>

      {userAddress ? (
        <NavLink onClick={() => closeMenu()} to={`/profile/${userAddress}`}>
          <img className="app__nav__icon" src={IconUser} alt="icon"></img>
          My Profile
        </NavLink>
      ) : null}

      <NavLink onClick={() => closeMenu()} to={`/about`}>
      <img className="app__nav__icon" src={IconGlobe} alt="icon"></img>
        About
      </NavLink>

      <NavLink onClick={() => closeMenu()} to={`/how`}>
        <img className="app__nav__icon" src={IconQuestion} alt="icon"></img>
        How To
      </NavLink>

    </Menu>
  );
}
