import React from "react";
import { auth } from '../../Firebase';
import classNames from "classnames";
import { Field, reduxForm, reset } from 'redux-form';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import logout from 'actions/UserActions';

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";



const useStyles = makeStyles(styles);
var user2 = "sample text";

//this function will get the email the user entered from the local storage
function userName() {
  if (localStorage.getItem('user')) {
    user2 = localStorage.getItem('user');// this sets the local var with the one in the local storage
    // console.log(user2); //display the the username to check in the console 
  }
}

export default function AdminNavbarLinks() {
  userName();
  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  return (
    <div className={classes.typo}>
      <h6><b>Welcome, {user2}</b></h6>
      <div style={{ float: 'right' }}>
        <button className="btn btn-danger" onClick={() => { auth.signOut(); }}>Sign out</button>
      </div>
      <div style={{ clear: 'both' }}></div>
    </div>
  );

}
