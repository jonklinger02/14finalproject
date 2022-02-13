import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import DehazeIcon from "@mui/icons-material/Dehaze";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import DashboardIcon from "@mui/icons-material/Dashboard";

const SideDrawer = () => {
  return (
    <>
      <DehazeIcon className='drawer_btn' onClick={() => alert("open")} />
      <Drawer anchor={"right"} open={true} onClose={() => alert("close")}>
        <form style={{ margin: "20px" }}>
          <TextField
            id='outlined-basic'
            label='Search Movie'
            variant='outlined'
          />
        </form>
      </Drawer>
    </>
  );
};

export default SideDrawer;
