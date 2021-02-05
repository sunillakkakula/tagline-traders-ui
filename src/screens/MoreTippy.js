import React from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import GetAppIcon from "@material-ui/icons/GetApp";
import "../assets/css/MoreTippy.css";

const MoreTippy = () => {
  return (
    <div className="moret">
      <div className="moret__in">
        <NotificationsIcon></NotificationsIcon>
        <p>Notification Preference</p>
      </div>
      <hr />
      <div className="moret__in">
        <LiveHelpIcon></LiveHelpIcon>
        <p>24*7 Customer Care </p>
      </div>
      <hr />
      <div className="moret__in">
        <TrendingUpIcon></TrendingUpIcon>
        <p>Advertise </p>
      </div>
      <hr />

      <div className="moret__in">
        <GetAppIcon></GetAppIcon>
        <p>Download App </p>
      </div>
    </div>
  );
};

export default MoreTippy;
