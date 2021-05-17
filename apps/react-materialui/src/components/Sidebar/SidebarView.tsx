import React from 'react';
import {
  Drawer,
  IconButton,
  List,
  withStyles } from "@material-ui/core";
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
import classNames from 'classnames';

import SidebarLink from './components/SidebarLink/SidebarLink';
// import Dot from './components/Dot';

const structure = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  { id: 1, type: "divider" },
  { id: 2, type: "title", label: "Chinook Catalog" },
  { id: 3, label: "Playlists", link: "/app/playlists", icon: <TableIcon /> },
  { id: 4, label: "Tracks", link: "/app/tracks", icon: <TableIcon /> },
  { id: 5, label: "Genres", link: "/app/genres", icon: <TableIcon /> },
  { id: 6, label: "Artists", link: "/app/artists", icon: <TableIcon /> },
  { id: 7, type: "divider" },
  { id: 8, type: "title", label: "HELP" },
  { id: 9, label: "Service Stack", link: "https://flatlogic.com/templates", icon: <LibraryIcon /> },
  { id: 10, label: "Chinook", link: "https://flatlogic.com/templates", icon: <LibraryIcon /> },
  { id: 11, label: "React", link: "https://flatlogic.com/templates", icon: <LibraryIcon /> },
  { id: 12, label: "Auth0", link: "https://flatlogic.com/templates", icon: <LibraryIcon /> },
  
  // { id: 0, label: 'Dashboard', link: '/app/dashboard', icon: <HomeIcon /> },
  // { id: 1, label: 'Typography', link: '/app/typography', icon: <TypographyIcon /> },
  // { id: 2, label: 'Tables', link: '/app/tables', icon: <TableIcon /> },
  // { id: 3, label: 'Notifications', link: '/app/notifications', icon: <NotificationsIcon />},
  // {
  //   id: 4,
  //   label: 'UI Elements',
  //   link: '/app/ui',
  //   icon: <UIElementsIcon />,
  //   children: [
  //     { label: 'Icons', link: '/app/ui/icons' },
  //     { label: 'Charts', link: '/app/ui/charts' },
  //     { label: 'Maps', link: '/app/ui/maps' },
  //   ],
  // },
  // { id: 5, type: 'divider' },
  // { id: 6, type: 'title', label: 'HELP' },
  // { id: 7, label: 'Library', link: 'https://flatlogic.com/templates', icon: <LibraryIcon /> },
  // { id: 8, label: 'Support', link: 'https://flatlogic.com/forum/', icon: <SupportIcon /> },
  // { id: 9, label: 'FAQ', link: 'https://flatlogic.com/forum/', icon: <FAQIcon />},
  // { id: 10, type: 'divider' },
  // { id: 11, type: 'title', label: 'Chinook Catalog' },
  // { id: 12, label: "Playlists", link: "/app/playlists", icon: <TableIcon /> },
  // { id: 13, label: "Tracks", link: "/app/tracks", icon: <TableIcon /> },
  // { id: 13, label: "Genres", link: "/app/genres", icon: <TableIcon /> },
  // { id: 12, label: 'My recent', link: '', icon: <Dot size="small" color="secondary" /> },
  // { id: 13, label: 'Starred', link: '', icon: <Dot size="small" color="primary" /> },
  // { id: 14, label: 'Background', link: '', icon: <Dot size="small" color="secondary" /> },
];

const SidebarView = ({ classes, theme, toggleSidebar, isSidebarOpened, isPermanent, location }: any) => {
  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames(classes.drawer, {
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.mobileBackButton}>
        <IconButton
          onClick={toggleSidebar}
        >
          <ArrowBackIcon classes={{ root: classNames(classes.headerIcon, classes.headerIconCollapse) }} />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => <SidebarLink key={link.id} location={location} isSidebarOpened={isSidebarOpened} {...link} />)}
      </List>
    </Drawer>
  );
}

const drawerWidth = 240;

const styles: any = (theme: any) => ({
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    top: theme.spacing.unit * 8,
    [theme.breakpoints.down("sm")]: {
      top: 0,
    }
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 40,
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
    }
  },
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: 'none',
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  mobileBackButton: {
    marginTop: theme.spacing.unit * .5,
    marginLeft: theme.spacing.unit * 3,
    [theme.breakpoints.only("sm")]: {
      marginTop: theme.spacing.unit * .625,
    },
    [theme.breakpoints.up("md")]: {
      display: 'none',
    }
  }
});

export default withStyles(styles, { withTheme: true })(SidebarView);
