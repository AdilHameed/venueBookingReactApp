import { authActions } from "../Reducers/Auth";
import { login, logOut, SignUp } from "../Apis";

export const loginCheck = (loginData, navigate) => async (dispatch) => {
  try {
    const fetchedData = await login(loginData);

    dispatch(authActions.login(fetchedData.data));
    console.log("1");
    navigate("/venues");
    console.log("2");
  } catch (err) {
    dispatch(authActions.authError(err.message));
  }
};
export const signUp = (loginData, navigate) => async (dispatch) => {
  try {
    const fetchedData = await SignUp(loginData);

    dispatch(authActions.login(fetchedData.data));
    console.log("1");
    navigate("/venues");
    console.log("2");
  } catch (err) {
    dispatch(authActions.authError(err.message));
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    await logOut();

    dispatch(authActions.logout());
    navigate("/login");
  } catch (err) {
    dispatch(authActions.authError(err.message));
  }
};
