import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    marginBottom: "1.5em",
  },
}));

const BulkLooseRadioGroup = ({ parentCB }) => {
  const [value, setValue] = React.useState("loose");
  const classes = useStyles();
  const handleChange = (event) => {
    setValue(event.target.value);
    console.log("Selected " + event.target.value);
    parentCB(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            className={classes.paper}
            style={{
              fontSize: "16",
              fontFamily: "Roboto",
              fontWeight: "100",
              lineHeight: "1.43",
              letterSpacing: "0.1em",
            }}
          >
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="orderType"
                name="orderType"
                value={value}
                onChange={handleChange}
              >
                <div
                  style={{
                    top: "50%",
                    right: 0,
                    // color: "#26A541",
                    // fontSize: "1.25rem",
                    // fontFamily: "Raleway",
                    // fontWeight: "500",
                    // lineHeight: "1.6",
                    // letterSpacing: "0.0075em",
                  }}
                  className="position-absolute mid-right"
                >
                  <FormControlLabel
                    value="bulk"
                    style={{
                      color: "#26A541",
                      fontSize: "0.75rem",
                      fontFamily: "Raleway",
                      fontWeight: "300",
                      lineHeight: "1.6",
                      letterSpacing: "0.0075em",
                    }}
                    control={<Radio />}
                    label="Bulk"
                  />
                </div>
                <div
                  style={{ top: "50%", left: 0 }}
                  className="position-absolute mid-left"
                >
                  <FormControlLabel
                    value="loose"
                    control={<Radio />}
                    label="Loose"
                  />
                </div>
              </RadioGroup>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
export default BulkLooseRadioGroup;
