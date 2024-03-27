import { createSlice } from "@reduxjs/toolkit";

export const signupSlice = createSlice({
  name: "signup",
  initialState: {
    message: "",
    value: localStorage.getItem("userDB")
      ? JSON.parse(localStorage.getItem("userDB"))
      : [],
  },
  reducers: {
    signup: (state, action) => {
      const exist = state?.value?.find((item) => {
        return item.name.toLowerCase == action.payload.name.toLowerCase;
      });

      if (exist) {
        return {
          message: "Already Exist",
          value: state.value,
        };
      }
      let data = [action.payload, ...state.value];
      localStorage.setItem("userDB", JSON.stringify(data));

      return {
        message: "Success",
        value: data,
      };
    },
  },
});

export const { signup } = signupSlice.actions;
export const signupReducers = signupSlice.reducer;

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    access: localStorage.getItem("user") ? true : false,
    message: "",
    value: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
  reducers: {
    login: (state, action) => {
      let userDB = JSON.parse(localStorage.getItem("userDB"));

      const data = userDB?.find((item) => {
        return item.name.toLowerCase == action.payload.name.toLowerCase;
      });
      if (data && data.password == action.payload.password) {
        localStorage.setItem("user", JSON.stringify(data));
        return {
          access: true,
          message: "Successful Login ",
          value: data,
        };
      }

      return {
        access: false,
        message: "Does not match",
        value: null,
      };
    },

    logout: () => {
      console.log("log");
      localStorage.removeItem("user");
      return {
        access: false,
        message: "Successful Logout",
        value: null,
      };
    },
  },
});
export const { login, logout } = authSlice.actions;
export const authReducers = authSlice.reducer;
