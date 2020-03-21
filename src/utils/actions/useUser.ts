import { useSelector, useDispatch } from "react-redux";

export const useUser = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const setUser = (user: any) => {
    dispatch({ type: "SET_USER", user });
  };
  const unsetUser = () => {
    dispatch({ type: "UNSET_USER" });
  };
  return { user, setUser, unsetUser };
};
