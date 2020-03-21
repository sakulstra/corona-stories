import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  helperText: {
    textAlign: "right"
  }
});

export default function CustomTextField(props) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  function handleChange(e) {
    setValue(e.target.value);
  }
  const currentValue = props.value || value;
  const maxLength = props.maxLength || 400;
  return (
    <TextField
      {...props}
      fullWidth
      value={currentValue}
      onChange={props.onChange || handleChange}
      multiline
      inputProps={{ maxLength }}
      FormHelperTextProps={{ className: classes.helperText }}
      helperText={`${currentValue.length}/${maxLength}`}
      variant="outlined"
      rows={6}
    />
  );
}
