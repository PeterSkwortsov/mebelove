import React, { useState } from "react";

import menu from "../images/menu.svg";

function Menu() {
    const [isOpen, setOpen] = useState(false);


    return (
      <button
        className="header_menu-button"
        style={{ border: "none", top: "0.5rem", right: "0.5rem" }}
        onClick={() => setOpen(!isOpen)}
      >
        {" "}
        {isOpen ? (
          <img src={menu} alt="close" />
        ) : (
          <img src={menu} alt="menu" />
        )}
      </button>
    );
}

export default Menu;
