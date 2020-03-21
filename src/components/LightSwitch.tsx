import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Brightness1 from "@material-ui/icons/Brightness1";
import { useLight } from "@utils/actions/useLight";

export default function LightSwitch() {
  const { light, turnOffLight, turnOnLight } = useLight();
  return (
    <IconButton onClick={light ? turnOffLight : turnOnLight}>
      <Brightness1>test</Brightness1>
    </IconButton>
  );
}
