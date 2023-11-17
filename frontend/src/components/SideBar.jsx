import {
  AccountBox,
  Bookmarks,
  Forum,
  Group,
  Groups,
  Home,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const SideBar = () => {
  const menuOptions = [
    { text: "Usuario 1", icon: <Avatar /> },
    { text: "Home", icon: <Home /> },
    { text: "Messages", icon: <Forum /> },
    { text: "Profile", icon: <AccountBox /> },
    { text: "Amigos", icon: <Group /> },
    { text: "Grupos", icon: <Groups /> },
    { text: "Guardado", icon: <Bookmarks /> },
  ];

  const list = () => (
    <List>
      {menuOptions.map((option) => (
        <ListItem key={option.text}>
          <ListItemButton
            sx={{
              "&:hover": {
                backgroundColor: (theme) => theme.palette.drawer.hover,
              },
            }}
          >
            <ListItemIcon>{option.icon}</ListItemIcon>
            <ListItemText primary={option.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  const drawerWidth = 282;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.drawer.main,
          height: "100%",
        }}
      >
        {list()}
      </Box>
    </Drawer>
  );
};

export default SideBar;
