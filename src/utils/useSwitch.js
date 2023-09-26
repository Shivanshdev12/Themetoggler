import {useDispatch} from "react-redux";
import {appActions} from "./redux/appSlice";

const useSwitch = () => {
  const dispatch = useDispatch();
  const switchHandler = () => {
    if (theme === "light") dispatch(appActions.themeToggler(true));
    else {
      dispatch(appActions.themeToggler(false));
    }
    return switchHandler;
  };
};

export default useSwitch;
