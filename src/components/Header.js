import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { Container, Link } from "@material-ui/core";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { logout } from "../actions/userAction";
import ZipCodeTracker from "./ZipCodeTracker";
import logo from "../assets/images/logo.jpg";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));
function ElevationScroll(props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function Header(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logoutHandler = () => {
    dispatch(logout());
  };
  const renderLoggedInMenu = () => {
    return <h3>LoggedIn</h3>;
  };

  const renderNonLoggedInMenu = () => {
    return (
      <h3>
        return <h3>NOT LoggedIn</h3>;
      </h3>
    );
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar disableGutters={true}>
            <div>
              <img
                className="img-thumbnail"
                alt="Staples"
                src={logo}
                style={{
                  height: "3.5rem",
                  width: "3.5rem",
                  marginRight: "5em",
                  marginLeft: "5em",
                }}
              />
            </div>
            <Link to="/">
              <span style={{ fontSize: "1.75rem" }}>
                <b>
                  <i>
                    <h5>Tagline Traders</h5>
                  </i>
                </b>
              </span>
            </Link>
            {/* IMPLEMENT GRID HERE TO ENSURE THE ELEMENBTS ARE PLACED ALIGNED CENTER AND HAVING SPACE IN BETWEEN -KSP */}
            <div style={{ marginLeft: "5em" }}>
              <ZipCodeTracker />
            </div>
            <Link to="/cart">
              <ShoppingCartIcon count="10" style={{ marginTop: "2.0em" }} />
            </Link>
            {userInfo ? (
              <>
                <Link to="/profile">
                  <div style={{ marginRight: "1.5em" }}>{userInfo.name}</div>
                </Link>
                <Link to="/logout" style={{ marginRight: "1.5em" }}>
                  <div onClick={logoutHandler} style={{ marginLeft: "1.5em" }}>
                    Logout
                  </div>
                </Link>
              </>
            ) : (
              <div
                style={{
                  marginLeft: "3em",
                  display: "flex",
                  alignItems: "right",
                  cursor: "pointer",
                  paddingRight: "0px",
                }}
              >
                <Link to="/login">
                  <i className="fas fa-user" />
                </Link>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
}
