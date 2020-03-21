import { useSelector, useDispatch } from "react-redux";

export const useLight = () => {
  const light = useSelector(state => state.light);
  const dispatch = useDispatch();
  const turnOnLight = () => {
    dispatch({ type: "TURN_ON_LIGHT" });
  };
  const turnOffLight = () => {
    dispatch({ type: "TURN_OFF_LIGHT" });
  };
  return { light, turnOffLight, turnOnLight };
};
