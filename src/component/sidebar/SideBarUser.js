import EmailIcon from '@mui/icons-material/Email';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PasswordIcon from '@mui/icons-material/Password';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ShopIcon from '@mui/icons-material/Shop';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";

export default function SideBarUser() {

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleUserBook =()=>{
    navigate("/user/book")
  }
  const handleUserBorrowed =()=>{
    navigate("/user/borrowed")
  }
  const handleChangePassword =()=>{
    navigate("/user/info/change-password")
  }
  const handleChangeEmail =()=>{
    navigate("/user/info/change-email")
  }
  const handleChangePhone =()=>{
    navigate("/user/info/change-phone")
  }

  return (
    <div className="sidebar">
      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItemButton onClick={handleUserBook}>
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText primary="Books" />
        </ListItemButton>
        <ListItemButton onClick={handleUserBorrowed}>
          <ListItemIcon>
            <ShopIcon />
          </ListItemIcon>
          <ListItemText primary="Borrowed" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <SettingsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Information" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}  onClick={handleChangePhone}>
              <ListItemIcon>
                <SmartphoneIcon />
              </ListItemIcon>
              <ListItemText primary="Change Phone" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}  onClick={handleChangeEmail}>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="Change Email" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}  onClick={handleChangePassword}>
              <ListItemIcon>
                <PasswordIcon />
              </ListItemIcon>
              <ListItemText primary="Change Password" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );
}
