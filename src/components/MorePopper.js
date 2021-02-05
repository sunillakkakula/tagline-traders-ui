import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import DialogContent from "@material-ui/core/DialogContent";
import NotificationsIcon from "@material-ui/icons/Notifications";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  scrollContainer: {
    height: 400,
    overflow: "auto",
    marginBottom: theme.spacing(3),
  },
  scroll: {
    position: "relative",
    width: "230%",
    backgroundColor: theme.palette.background.paper,
    height: "230%",
  },
  legend: {
    marginTop: theme.spacing(2),
    maxWidth: 300,
  },
  paper: {
    maxWidth: 400,
    overflow: "auto",
  },
  select: {
    width: 200,
  },
  popper: {
    zIndex: 1,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${theme.palette.background.paper} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent ${theme.palette.background.paper}`,
      },
    },
  },
  moreBtn: {
    color: "#2874f0",
    fontWeight: "500",
    backgroundColor: "#fff",
    cursor: "pointer",
    borderRadius: "2px",
    height: "32px",
    padding: "5px 40px",
    border: "1px solid #dbdbdb",
  },
  arrow: {
    position: "absolute",
    fontSize: 7,
    width: "3em",
    height: "3em",
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid",
    },
  },
}));

export default function MorePopper() {
  const anchorRef = React.useRef(null);
  const [arrowRef, setArrowRef] = React.useState(null);

  const [arrow, setArrow] = React.useState(true);
  const [disablePortal, setDisablePortal] = React.useState(false);
  const [flip, setFlip] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState("bottom");
  const [preventOverflow, setPreventOverflow] = React.useState("scrollParent");

  const handleClickButton = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const classes = useStyles();

  const jsx = `
  <Popper
    placement="${placement}"
    disablePortal={${disablePortal}}
    modifiers={{
      flip: {
        enabled: ${flip},
      },
      preventOverflow: {
        enabled: ${preventOverflow !== "disabled"},
        boundariesElement: '${
          preventOverflow === "disabled" ? "scrollParent" : preventOverflow
        }',
      },
      arrow: {
        enabled: ${arrow},
        element: arrowRef,
      },
    }}
  >
  `;
  const id = open ? "scroll-playground" : null;

  return (
    <div
      className={classes.root}
      style={{
        color: "green",
        backgroundColor: "white",
        height: "2rem",
        margin: "0.5rem",
        alignContent: "center",
        verticalAlign: "baseline",
      }}
    >
      <div>
        <Grid container alignItems="center" justify="center">
          <div>
            <Button
              ref={anchorRef}
              variant="contained"
              onClick={handleClickButton}
              aria-describedby={id}
              className={classes.moreBtn}
            >
              More
            </Button>

            <Popper
              id={id}
              open={open}
              anchorEl={anchorRef.current}
              placement={placement}
              disablePortal={disablePortal}
              className={classes.popper}
              modifiers={{
                flip: {
                  enabled: flip,
                },
                arrow: {
                  enabled: arrow,
                  element: arrowRef,
                },
                preventOverflow: {
                  enabled: preventOverflow !== "disabled",
                  boundariesElement:
                    preventOverflow === "disabled"
                      ? "scrollParent"
                      : preventOverflow,
                },
              }}
            >
              {arrow ? (
                <span className={classes.arrow} ref={setArrowRef} />
              ) : null}
              <Paper className={classes.paper}>
                <DialogContent>
                  <p>About Us</p>
                  <Divider />
                  <p>History</p>
                  <Divider />
                  <p>Contact Us</p>
                  <Divider />
                  <p>Copyrights</p>
                  <Divider />
                  <p>Custmore Care</p>
                </DialogContent>
              </Paper>
            </Popper>
          </div>
        </Grid>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}></Grid>
      </Grid>
    </div>
  );
}
