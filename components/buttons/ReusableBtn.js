import React from "react";
import { Dimensions, Text } from "react-native";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  reusableButton: {
    width: Dimensions.get("screen").width * 0.8,
    backgroundColor: "black",
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 15,
    marginBottom: 50
  }
});

const ReusableBtn = props => {
  const classes = useStyles();

  return (
    <Button className={classes.reusableButton}>
      <Text style={{ color: "white", fontWeight: "bold" }}>
        {props.btnText}
      </Text>
    </Button>
  );
};

export default ReusableBtn;
