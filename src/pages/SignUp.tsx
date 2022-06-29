import "./Styles/SignUp.css";
import signupBack from "../assets/loginBack.jpg";
import { Button, Input, Loading } from "@nextui-org/react";
import { UnLockIcon } from "../assets/svgs/UnLockIcon";
import { LockIcon } from "../assets/svgs/LockIcon";
import { useState } from "react";
import LoginModal from "./LoginModal";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCSU } from "../redux/currentSelectedUsernameSlice";
import { Link, useNavigate } from "react-router-dom";
import { initializeApp, getApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase.config";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import Alert from "../component/Alert";
import { setErrorVisible } from "../redux/ErrorVisibleSlice";
import { message } from "antd";

initializeApp(firebaseConfig);
const auth = getAuth(getApp());
const firestore = getFirestore(getApp());

export default function SignUp() {
  // const [createUserWithEmailAndPassword, user, loading, error] =
  //   useCreateUserWithEmailAndPassword(auth,{sendEmailVerification:true});

  const nav = useNavigate();

  const [nameInputHasError, setNameInputHasError] = useState(false);
  const [emailInputHasError, setEmailInputHasError] = useState(false);
  const [passwordInputHasError, setPasswordInputHasError] = useState(false);

  const [visible, setVisible] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);

  const [username, setUsername] = useState("");
  // const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleBtnClick = async (e: any) => {
    e.preventDefault();
    setBtnLoader(true);
    let nameInput = document.getElementById("nameInput") as HTMLInputElement;
    let emailInput = document.getElementById("emailInput") as HTMLInputElement;
    let passInput = document.getElementById("passInput") as HTMLInputElement;

    if (!username) {
      setNameInputHasError(true);
      nameInput.focus();
      setBtnLoader(false);
    } else if (!email) {
      setEmailInputHasError(true);
      emailInput.focus();
      setBtnLoader(false);
    } else if (!password) {
      setPasswordInputHasError(true);
      passInput.focus();
      setBtnLoader(false);
    } else if (!email && !password && !username) {
      setEmailInputHasError(true);
      setPasswordInputHasError(true);
      setNameInputHasError(true);
      emailInput.focus();
      setBtnLoader(false);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          createUserInDB()
          console.log(user);
        })
        .catch((err) => {
          let error = err.code.split('/')[1];
          if(error === 'invalid-email'){
            message.error('Your Email ID is invalid... Please check and try again');
            setEmailInputHasError(true);
            emailInput.focus();
          }
          // dispatch(setErrorVisible(true));
          console.log(err);
          setBtnLoader(false);
          // invalid-email
        });
    }
    // createUserWithEmailAndPassword(email, password).then(()=>{
    //   createUserInDB()
    // })
  };

  const createUserInDB = async () => {
    const dataRef = doc(firestore, `/${auth.currentUser?.uid}/Info`);
    let email = auth.currentUser?.email ?? "null";

    // setting user info in user collection
    const userRef = doc(firestore, "/Users", email);

    let userData = {
      username: username,
      uid: auth.currentUser?.uid,
    };
    let data = {
      username: username,
      isOnline: true,
    };
    setDoc(dataRef, data, { merge: true })
      .then(() => {
        setDoc(userRef, userData, { merge: true })
          .then(() => {
            if (auth.currentUser)
              updateProfile(auth.currentUser, { displayName: username });
              setBtnLoader(false);
            nav("/");
          })
          .catch(() => {
            console.log("error occured");
          });
      })
      .catch((rea) => {
        console.log("error occured", rea);
      });
  };

  return (
    <>
      <div>
        <Alert
          backgroundColor="red"
          color="white"
          errorHead="Sign Up Failed"
          errorDesc="Error"
        />
        <div className="signupContainer">
          <div className="imgContainer">
            <img src={signupBack} alt="" />
          </div>

          <div className="signupMain">
            <h2>Sign Up</h2>
            <div className="mform">
              <Input
                bordered
                labelPlaceholder="Enter Name"
                width="300px"
                id="nameInput"
                color={nameInputHasError ? "error" : "primary"}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setNameInputHasError(false);
                }}
              />
              <Input
                bordered
                labelPlaceholder="Enter Email"
                value={email}
                id="emailInput"
                color={emailInputHasError ? "error" : "primary"}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailInputHasError(false);
                }}
              />
              <Input.Password
                bordered
                id="passInput"
                labelPlaceholder="Enter Password"
                value={password}
                color={passwordInputHasError ? "error" : "primary"}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordInputHasError(false);
                }}
                visibleIcon={<UnLockIcon fill="currentColor" />}
                hiddenIcon={<LockIcon fill="currentColor" />}
              />

              {/* <Input
              bordered
              type="number"
              labelPlaceholder="Enter Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            /> */}

              <Button color="error" auto onClick={handleBtnClick}>
                <Loading
                  style={{ display: btnLoader ? "block" : "none" }}
                  type="points"
                  color="currentColor"
                  size="sm"
                />
                <p style={{ display: !btnLoader ? "block" : "none" }}>
                  SIGN UP
                </p>
              </Button>
              <div>
                <span> Already have an account?</span>
                <Link to="/login">
                  {" "}
                  <b>Login Here</b>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
