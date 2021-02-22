import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Col } from "shards-react";

import SidebarMainNavbar from "./SidebarMainNavbar";
import SidebarSearch from "./SidebarSearch";
import SidebarNavItems from "./SidebarNavItems";

import { Store } from "../../../flux";

function MainSidebar(props) {
  const [menuVisible, setMenuVisible] = React.useState(false);
  // eslint-disable-next-line
  const [sidebarNavItems, setSidebarNavItems] = React.useState(
    Store.getSidebarItems()
  );

  React.useEffect(() => {
    Store.addChangeListener(onChange);
    return () => {
      Store.removeChangeListener(onChange);
    };
  }, []);

  function onChange() {
    setMenuVisible(Store.getMenuState());
    setSidebarNavItems(Store.getSidebarItems());
  }

  const classes = classNames(
    "main-sidebar",
    "px-0",
    "col-12",
    menuVisible && "open"
  );

  return (
    <Col tag="aside" className={classes} lg={{ size: 2 }} md={{ size: 3 }}>
      <SidebarMainNavbar hideLogoText={props.hideLogoText} />
      <SidebarSearch />
      <SidebarNavItems />
    </Col>
  );
}

MainSidebar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool,
};

MainSidebar.defaultProps = {
  hideLogoText: false,
};

export default MainSidebar;
