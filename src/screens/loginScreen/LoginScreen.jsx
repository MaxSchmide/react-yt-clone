import React, { useEffect } from "react";
import "./_loginScreen.scss";
import logo from "../../images/Logo.svg";
import { Container } from "react-bootstrap";
import {
  accessToken,
  Fail,
  Success,
  Request,
  AddProfile,
} from "../../redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const token = useSelector(accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    token && navigate("/");
  }, [token, navigate]);

  const login = async () => {
    try {
      dispatch(Request());
      const provider = new GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");
      await signInWithPopup(auth, provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const profile = {
          name: result.user.displayName,
          photo: result.user.photoURL,
        };
        sessionStorage.setItem("ytc-access-token", token);
        sessionStorage.setItem("ytc-profile", JSON.stringify(profile));

        dispatch(Success(token));
        dispatch(AddProfile(profile));
      });
    } catch (err) {
      dispatch(Fail(err));
    }
  };
  const handleLogin = (event) => {
    event.preventDefault();
    login();
  };

  return (
    <>
      <Container>
        <div className="login ">
          <div className="login__logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="login__title">
            <h3>Sign in</h3>
            <p>to continue to YouTube-clone</p>
          </div>
          <div className="login__button">
            <button onClick={handleLogin}>Sign in with Google</button>
          </div>
          <div className="login__footer">
            Not your computer? Use Guest mode to sign in privately.
            <br />
            <span>based on YouTube's API</span>
          </div>
        </div>
      </Container>
    </>
  );
};

export default LoginScreen;
