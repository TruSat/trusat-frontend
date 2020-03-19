import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import { useAuthState } from "../../auth/auth-context";
import IconWave from "../../assets/icon-wave.svg";
import IconGlobe from "../../assets/icon-globe.svg";
import IconSat from "../../assets/icon-satellite.svg";
import IconUser from "../../assets/icon-user.svg";
import IconQuestion from "../../assets/icon-question.svg";

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
      {userAddress === "none" ? (
        <NavLink
          onClick={() => closeMenu()}
          to={`/signup`}
          className="app__nav-link--mobile-join"
        >
          JOIN
        </NavLink>
      ) : null}

      {userAddress === "none" ? (
        <NavLink onClick={() => closeMenu()} to={`/login`}>
          LOG IN
        </NavLink>
      ) : null}
      <br></br>

      <NavLink onClick={() => closeMenu()} to={`/`}>
        <img className="app__nav__icon" src={IconWave} alt="icon"></img>
        WELCOME
      </NavLink>

      <NavLink onClick={() => closeMenu()} to={`/catalog/priorities`}>
        <img className="app__nav__icon" src={IconSat} alt="icon"></img>
        CATALOG
      </NavLink>

      <div>
        <img className="app__nav__icon" src={IconQuestion} alt="icon"></img>
        <a
          className="app__nav-link nav-bar__link--lowlight--welcome"
          href="https://learn.trusat.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          LEARNING HUB
        </a>
      </div>

      {userAddress !== "none" ? (
        <NavLink onClick={() => closeMenu()} to={`/profile/${userAddress}`}>
          <img className="app__nav__icon" src={IconUser} alt="icon"></img>
          MY PROFILE
        </NavLink>
      ) : null}

      <div>
        <img className="app__nav__icon" src={IconQuestion} alt="icon"></img>
        <a
          className="app__nav-link nav-bar__link--lowlight--welcome"
          href="https://discuss.trusat.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          FORUM
        </a>
      </div>

      <NavLink onClick={() => closeMenu()} to={`/about`}>
        <img className="app__nav__icon" src={IconGlobe} alt="icon"></img>
        ABOUT
      </NavLink>
    </Menu>
  );
}
