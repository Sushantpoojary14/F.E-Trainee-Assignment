import { useEffect, useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { signup, login, logout } from "./app/mainAction";

function App() {
  const [tab, setTab] = useState(0);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const signupData = useSelector((state) => state.signupData);
  const authData = useSelector((state) => state.authData);

  useEffect(() => {
    if (signupData.message === "Success") {
      setTab(0);
    }
    setMessage(signupData.message);
  }, [signupData]);

  useEffect(() => {
    setMessage(authData.message);
  }, [authData]);

  useEffect(() => {
    setMessage(authData.message);
  }, [authData]);

  const clearFunc = () => {
    setName("");
    setPassword("");
    setMessage("");
  };

  const signupFunc = () => {
    if (name && password) {
      dispatch(signup({ name: name, password: password }));
      clearFunc();
      return null;
    }

    setMessage("Enter details");
  };

  const loginFunc = () => {
    if (name && password) {
      dispatch(login({ name: name, password: password }));
      return null;
    }
    setMessage("Enter details");
  };
  
  return (
    <>
      {authData.access ? (
        <div className="homepage">
          <h1>Home Page</h1>
          <p>NAME: { authData.value.name.toUpperCase()}</p>
          <button
            onClick={() => {
              dispatch(logout());
              clearFunc();
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="login_page">
          <h1>Login Page</h1>
          <div className="tab">
            <p
              style={{ color: tab == 1 ? "green" : "black" }}
              onClick={() => {
                clearFunc();
                setTab(1);
              }}
            >
              Sign up
            </p>
            <p
              style={{ color: tab == 0 ? "green" : "black" }}
              onClick={() => {
                clearFunc();
                setTab(0);
              }}
            >
              Login
            </p>
          </div>
          <div className="message">
            <p> {message}</p>
          </div>
          <div className="form">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setMessage("");
                setName(e.target.value);
              }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setMessage("");
                setPassword(e.target.value);
              }}
            />
          <button onClick={tab == 1 ? signupFunc : loginFunc}>{tab == 1 ? "Sign up" : "Login"}</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
