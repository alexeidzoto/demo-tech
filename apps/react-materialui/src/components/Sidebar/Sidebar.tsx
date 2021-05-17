import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  // NotificationsNone as NotificationsIcon,
  // FormatSize as TypographyIcon,
  // FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  // QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  // HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
// import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  { id: 1, type: "divider" },
  { id: 2, type: "title", label: "Chinook Catalog" },
  { id: 3, label: "Playlists", link: "/app/playlists", icon: <TableIcon /> },
  { id: 4, label: "Tracks", link: "/app/tracks", icon: <TableIcon /> },
  { id: 5, label: "Genres", link: "/app/genres", icon: <TableIcon /> },
  { id: 6, type: "divider" },
  { id: 7, type: "title", label: "HELP" },
  { id: 8, label: "Service Stack", link: "https://flatlogic.com/templates", icon: <LibraryIcon /> },
  { id: 9, label: "Chinook", link: "https://flatlogic.com/templates", icon: <LibraryIcon /> },
  { id: 10, label: "React", link: "https://flatlogic.com/templates", icon: <LibraryIcon /> },
  { id: 11, label: "Auth0", link: "https://flatlogic.com/templates", icon: <LibraryIcon /> },
  // {
  //   id: 1,
  //   label: "Typography",
  //   link: "/app/typography",
  //   icon: <TypographyIcon />,
  // },
  // { id: 2, label: "Tables", link: "/app/tables", icon: <TableIcon /> },
  // {
  //   id: 3,
  //   label: "Notifications",
  //   link: "/app/notifications",
  //   icon: <NotificationsIcon />,
  // },
  // {
  //   id: 4,
  //   label: "UI Elements",
  //   link: "/app/ui",
  //   icon: <UIElementsIcon />,
  //   children: [
  //     { label: "Icons", link: "/app/ui/icons" },
  //     { label: "Charts", link: "/app/ui/charts" },
  //     { label: "Maps", link: "/app/ui/maps" },
  //   ],
  // },
  // { id: 8, label: "Support", link: "https://flatlogic.com/forum", icon: <SupportIcon /> },
  // { id: 9, label: "FAQ", link: "https://flatlogic.com/forum", icon: <FAQIcon /> },
  // { id: 10, type: "divider" },
  // { id: 11, type: "title", label: "PROJECTS" },
  // {
  //   id: 12,
  //   label: "My recent",
  //   link: "",
  //   icon: <Dot size="small" color="warning" />,
  // },
  // {
  //   id: 13,
  //   label: "Starred",
  //   link: "",
  //   icon: <Dot size="small" color="primary" />,
  // },
  // {
  //   id: 14,
  //   label: "Background",
  //   link: "",
  //   icon: <Dot size="small" color="secondary" />,
  // },
];

function Sidebar({ location }: any) {
  const classes: any = useStyles();
  const theme: any = useTheme();

  // global
  const { isSidebarOpened }: any = useLayoutState();
  const layoutDispatch: any = useLayoutDispatch();

  // local
  const [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    const windowWidth = window.innerWidth;
    const breakpointWidth = theme.breakpoints.values.md;
    const isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
