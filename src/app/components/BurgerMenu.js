import React from "react";
import { slide as Menu } from "react-burger-menu";
import { useAuthState } from "../../auth/auth-context";

export default function BurgerMenu(props) {
  const { userAddress } = useAuthState();
  const catalogFilter = "priorities";

  // TODO - test NavLinks to see if they stop api getting hit
  return (
    // Pass on our props
    <Menu {...props}>
      <a id="home" className="menu-item" href="/">
        Home
      </a>

      <a id="catalog" className="menu-item" href={`/catalog/${catalogFilter}`}>
        Catalog
      </a>

      {userAddress ? (
        <a id="profile" className="menu-item" href={`/profile/${userAddress}`}>
          My Profile
        </a>
      ) : null}

      <a id="about" className="menu-item" href="/about">
        About
      </a>

      <a id="how" className="menu-item" href="/how">
        How To
      </a>
    </Menu>
  );
}
