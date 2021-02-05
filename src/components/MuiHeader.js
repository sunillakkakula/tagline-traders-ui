import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import ZipCodeTracker from "./ZipCodeTracker";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import logo from "../assets/images/logo.jpg";
import { Link } from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";
import Tippy from "@tippyjs/react";
import MoreTippy from "../screens/MoreTippy";
import MorePopper from "./MorePopper";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    fontSize: "20px",
    fontFamily: "Roboto",
    fontWeight: "500",
    fontStyle: "italic",

    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  appTitle: {
    fontSize: "1.75rem",
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  loginBtn: {
    color: "#2874f0",
    fontWeight: "500",
    backgroundColor: "#fff",
    cursor: "pointer",
    borderRadius: "2px",
    height: "32px",
    padding: "5px 40px",
    border: "1px solid #dbdbdb",
  },
}));
export default function MuiHeader({ location, history }) {
  // const history = { props };
  let [alreadyLoggedIn, setAlreadyLoggedIn] = useState("false");
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Button color="primary">login!</Button>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  alreadyLoggedIn = userInfo !== null ? true : false;
  console.log("alreadyLoggedIn : " + alreadyLoggedIn);
  let loginBtnTitle = alreadyLoggedIn === true ? "logout" : "login";
  let loginBtnUrl = alreadyLoggedIn === true ? "/logout" : "/login";
  console.log("loginBtnTitle : " + loginBtnTitle);
  const loggedInContent = (
    <div onClick={logoutHandler} style={{ marginLeft: "1.5em" }}>
      <Link to="/logout">Click Logout</Link>
    </div>
  );
  const loggedOutContent = (
    <div>
      <Link to="/login">Logout</Link>
    </div>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <div>
            <img
              className="img-thumbnail"
              alt="Staples"
              src={logo}
              style={{
                height: "3.5rem",
                width: "3.5rem",
                marginRight: "5em",
              }}
            />
          </div>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            style={{ color: "white" }}
          >
            Tagline Traders Groceries
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <ZipCodeTracker />
            {/* {alreadyLoggedIn === "true" ? loggedInContent : loggedOutContent} */}
            <Button
              component={Link}
              className={classes.loginBtn}
              to={loginBtnUrl}
              size="small"
              variant="contained"
              style={{
                color: "green",
                backgroundColor: "white",
                height: "2rem",
                margin: "0.5rem",
                alignContent: "center",
                verticalAlign: "baseline",
              }}
            >
              {loginBtnTitle}
            </Button>
            <MorePopper
            // style={{
            //   color: "green",
            //   backgroundColor: "white",
            //   height: "2rem",
            //   margin: "0.5rem",
            //   alignContent: "center",
            //   verticalAlign: "baseline",
            // }}
            />
            {/* <Tippy content={<MoreTippy />} interactive={true}>
              <Button>More</Button>
            </Tippy> */}
            {/* <Link
              className={classes.loginBtn}
              to={"/login"}
              size="small"
              variant="contained"
              style={{
                color: "green",
                backgroundColor: "white",
                height: "2rem",
                margin: "0.5rem",
                alignContent: "center",
                verticalAlign: "baseline",
              }}
            >
              More
            </Link> */}
            {/* {userInfo ? (
              <>
                {/* <Link
                  to="/profile"
                  style={{
                    color: "white",
                    // backgroundColor: "white",
                    fontWeight: "500",
                    cursor: "pointer",
                    height: "2rem",
                    margin: "0.5rem",
                    alignContent: "center",
                    verticalAlign: "baseline",
                  }}
                >
                  {userInfo.name}
                </Link> }
              </>
            ) : (
              <div>
                <Link to="/login">
                  <i className="fas fa-user" />
                </Link>
              </div>
            )} */}

            <IconButton
              style={{ color: "white" }}
              aria-label="upload picture"
              component="span"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <ShoppingCartIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
