import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: "5rem",
    width: "5rem",
  },
  control: {
    padding: theme.spacing(2),
  },
  imageContainer: {
    height: "5rem",
    width: "5rem",
    backgroundRepeat: "no-repeat",
    backgroundSize: "5rem 5rem",
    backgroundImage: `url(${"/images/products/Chilli.jpg"})`,
  },
}));

const DashboardGrid = () => {
  const [spacing, setSpacing] = React.useState(1);
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            <Grid key="1" item>
              <Paper className={classes.paper}>
                <Button className={classes.imageContainer} />
              </Paper>
            </Grid>
            <Grid key="2" item>
              <Paper className={classes.paper}>
                <img
                  style={{ opacity: "1", width: "5rem", height: "5rem" }}
                  alt="Turmeric"
                  src="/images/products/Turmeric.jpg"
                />
              </Paper>
            </Grid>
            <Grid key="3" item>
              <Paper className={classes.paper}>
                <Paper className={classes.paper}>
                  <img
                    style={{ opacity: "1", width: "5rem", height: "5rem" }}
                    alt="Coriander"
                    src="/images/products/Coriander.jpg"
                  />
                </Paper>
              </Paper>
            </Grid>
            <Grid key="1" item>
              <Paper className={classes.paper}>
                <img
                  style={{ opacity: "1", width: "5rem", height: "5rem" }}
                  alt="Chillis"
                  src="/images/products/Chilli.jpg"
                />
              </Paper>
            </Grid>
            <Grid key="2" item>
              <Paper className={classes.paper}>
                <img
                  style={{ opacity: "1", width: "5rem", height: "5rem" }}
                  alt="Turmeric"
                  src="/images/products/Turmeric.jpg"
                />
              </Paper>
            </Grid>
            <Grid key="3" item>
              <Paper className={classes.paper}>
                <Paper className={classes.paper}>
                  <img
                    style={{ opacity: "1", width: "5rem", height: "5rem" }}
                    alt="Coriander"
                    src="/images/products/Coriander.jpg"
                  />
                </Paper>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            <Grid key="1" item>
              <Paper className={classes.paper}>
                <img
                  style={{ opacity: "1", width: "5rem", height: "5rem" }}
                  alt="Chillis"
                  src="/images/products/Chilli.jpg"
                />
              </Paper>
            </Grid>
            <Grid key="2" item>
              <Paper className={classes.paper}>
                <img
                  style={{ opacity: "1", width: "5rem", height: "5rem" }}
                  alt="Turmeric"
                  src="/images/products/Turmeric.jpg"
                />
              </Paper>
            </Grid>
            <Grid key="3" item>
              <Paper className={classes.paper}>
                <Paper className={classes.paper}>
                  <img
                    style={{ opacity: "1", width: "5rem", height: "5rem" }}
                    alt="Coriander"
                    src="/images/products/Coriander.jpg"
                  />
                </Paper>
              </Paper>
            </Grid>
            <Grid key="1" item>
              <Paper className={classes.paper}>
                <img
                  style={{ opacity: "1", width: "5rem", height: "5rem" }}
                  alt="Chillis"
                  src="/images/products/Chilli.jpg"
                />
              </Paper>
            </Grid>
            <Grid key="2" item>
              <Paper className={classes.paper}>
                <img
                  style={{ opacity: "1", width: "5rem", height: "5rem" }}
                  alt="Turmeric"
                  src="/images/products/Turmeric.jpg"
                />
              </Paper>
            </Grid>
            <Grid key="3" item>
              <Paper className={classes.paper}>
                <Paper className={classes.paper}>
                  <img
                    style={{ opacity: "1", width: "5rem", height: "5rem" }}
                    alt="Coriander"
                    src="/images/products/Coriander.jpg"
                  />
                </Paper>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default DashboardGrid;
