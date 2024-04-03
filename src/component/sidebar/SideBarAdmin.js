import CheckIcon from "@mui/icons-material/Check";
import DraftsIcon from "@mui/icons-material/Drafts";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GridViewIcon from "@mui/icons-material/GridView";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import "./SideBar.css";

export default function SideBarAdmin() {

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDashboard =()=>{
    navigate("/admin/dashboard")
  }
  const handleMember =()=>{
    navigate("/admin/member")
  }
  const handleBook =()=>{
    navigate("/admin/book")
  }
  const handleIssued =()=>{
    navigate("/admin/issued")
  }
  const handleReturn =()=>{
    navigate("/admin/return")
  }

  return (
    <div className="sidebar">
      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItemButton onClick={handleDashboard}>
          <ListItemIcon>
            <GridViewIcon />
          </ListItemIcon>
          <ListItemText primary="DashBoard" />
        </ListItemButton>
        <ListItemButton onClick={handleMember}>
          <ListItemIcon>
            <PeopleAltIcon />
          </ListItemIcon>
          <ListItemText primary="Member" />
        </ListItemButton>
        <ListItemButton onClick={handleBook}>
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText primary="Book" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <CheckBoxOutlineBlankIcon />
          </ListItemIcon>
          <ListItemText primary="Other" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <SettingsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Issue/Return" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary="Issued" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ThumbUpIcon />
              </ListItemIcon>
              <ListItemText primary="Return" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ThumbDownAltIcon />
              </ListItemIcon>
              <ListItemText primary="Not return" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );
}
