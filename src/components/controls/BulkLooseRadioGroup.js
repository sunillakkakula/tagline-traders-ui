import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { Grid } from "@material-ui/core";
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
  const [orderType, setOrderType] = React.useState("loose");
  const classes = useStyles();
  const handleChange = (event) => {
    setOrderType(event.target.value);
    console.log("Selected " + event.target.value);
    parentCB(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="orderType"
              name="orderType"
              value={orderType}
              onChange={handleChange}
            >
              <FormControlLabel value="bulk" control={<Radio />} label="Bulk" />

              <FormControlLabel
                value="loose"
                control={<Radio />}
                label="Loose"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};
export default BulkLooseRadioGroup;
