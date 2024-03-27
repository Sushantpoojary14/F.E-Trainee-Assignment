import { configureStore } from "@reduxjs/toolkit";
import { signupReducers, authReducers } from "./mainAction";
export default configureStore({
  reducer: { signupData: signupReducers, authData: authReducers },
});
