import React,{useContext} from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from '@mui/material/MenuItem';

import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import ApprovalIcon from "@mui/icons-material/Approval";
import CategoryIcon from "@mui/icons-material/Category";
import TvIcon from "@mui/icons-material/Tv";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Menu } from "@mui/material";
import { Globalcontext } from "../context/Externalcontext";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
let array = [
  { name: "Dashbord", icon: <DashboardIcon /> },
  { name: "Users", icon: <GroupIcon /> },
  { name: "Hosting-Request", icon: <ApprovalIcon /> },
  { name: "Bookings", icon: <AutoStoriesIcon /> },
  { name: "Property-Management", icon: <MapsHomeWorkIcon /> },
  { name: "Property-Category", icon: <CategoryIcon /> },
  { name: "Property-Facility", icon: <TvIcon /> },
];

export default function MiniDrawer({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {setadminLogged}=useContext(Globalcontext)
  const Open=Boolean(anchorEl)
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleClick(e) {
    setAnchorEl(e.currentTarget)
  }

  function handleclose() {
    setAnchorEl(null)
  }

  function handlelogout() {
    setadminLogged(false)
  }

  return (
    <Box sx={{ display: "flex", }}>
      <CssBaseline />
      <AppBar position="fixed" color="primary" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">

          </Typography>
          <IconButton
            id="basic-button"
            aria-controls={Open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={Open ? "true" : undefined}
            onClick={handleClick}
            sx={{ color: 'white'}}
          >
            <AccountCircleIcon  />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Open}
            onClose={handleclose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
          <MenuItem onClick={handleclose}>Profile</MenuItem>
          <MenuItem onClick={handleclose}>My account</MenuItem>
          <MenuItem onClick={handlelogout}>Logout</MenuItem>
          
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            color: "white",
            bgcolor: "#2c2c31",
          },
        }}
        open={open}
      >
        <DrawerHeader>
          <img src="/asset/hotelova1.png" width="150" height="80" alt="" />
          <IconButton sx={{ color: "white" }} onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {array.map((elemt) => (
          <List>
            <Link to={`/${elemt.name}`} >
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "white",
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {elemt.icon}
                </ListItemIcon>
                <ListItemText
                  primary={elemt.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
              </ListItem>
              </Link>
          </List>
        ))}
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Settings"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
