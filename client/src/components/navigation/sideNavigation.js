import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

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
import { ListItemIcon } from "@mui/material";
import { ListGroup } from "react-bootstrap";

const SideDrawer = () => {
  const [state, setState] = useState(false);
  return (
    <>
      <DehazeIcon className='drawer_btn' onClick={() => setState(true)} />
      <Drawer anchor={"right"} open={state} onClose={() => setState(false)}>
        <form style={{ margin: "20px" }}>
          <TextField
            id='outlined-basic'
            label='Search Movie'
            variant='outlined'
          />
        </form>
        <List>
          <ListItem
            button
            component={RouterLink}
            to='/'
            onClick={() => setState(false)}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            to='/contact'
            onClick={() => setState(false)}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary='Contact' />
          </ListItem>
          <Divider />

          <ListItem
            button
            component={RouterLink}
            to='/auth'
            onClick={() => setState(false)}>
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary='Sign In' />
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            to='/auth'
            onClick={() => setState(false)}>
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary='Sign Out' />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            component={RouterLink}
            to='/dashboard'
            onClick={() => setState(false)}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary='dashboard' />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default SideDrawer;
