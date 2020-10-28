import React from "react";
import { View, Dimensions } from "react-native";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  inputField: {
    borderRadius: 20,
    width: Dimensions.get("screen").width * 0.8,
    paddingLeft: 1,
  },
});

const InputField = (props) => {
  const classes = useStyles();

  return (
    <TextField
      label={props.fieldLabel}
      margin="normal"
      name={props.fieldName}
      type={props.fieldType}
      variant="outlined"
      helperText={props.helperText}
      InputLabelProps={{
        required: true,
        color: "primary",
        shrink: true,
      }}
      InputProps={{
        className: classes.inputField,
      }}
    />
  );
};

export default InputField;
