import React from "react";
import { slide as Menu } from "react-burger-menu";
import { useCatalogState } from "../../catalog/catalog-context";
import { useUserState } from "../../user/user-context";

export default function BurgerMenu(props) {
  const { address } = useUserState();
  const { catalogFilter } = useCatalogState();

  return (
    // Pass on our props
    <Menu {...props}>
      <a id="home" className="menu-item" href="/">
        Home
      </a>

      <a id="catalog" className="menu-item" href={`/catalog/${catalogFilter}`}>
        Catalog
      </a>

      {address ? (
        <a id="profile" className="menu-item" href={`/profile${address}`}>
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
