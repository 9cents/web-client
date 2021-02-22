import React from "react";
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";
import { Store } from "../../../flux";

function SidebarNavItems(props) {
  const [navItems, setNavItems] = React.useState(Store.getSidebarItems());

  React.useEffect(() => {
    Store.addChangeListener(onChange);
    return () => {
      Store.removeChangeListener(onChange);
    };
  }, []);

  function onChange() {
    setNavItems(Store.getSidebarItems());
  }

  return (
    <div className="nav-wrapper">
      <Nav className="nav--no-borders flex-column">
        {navItems.map((item, idx) => (
          <SidebarNavItem key={idx} item={item} />
        ))}
      </Nav>
    </div>
  );
}

export default SidebarNavItems;
