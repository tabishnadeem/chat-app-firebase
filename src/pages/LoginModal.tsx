import React, { useState } from "react";
import {
  Modal,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Loading,
} from "@nextui-org/react";
import { Mail } from "../assets/svgs/Mail";
import { Password } from "../assets/svgs/Password";
import { Link } from "react-router-dom";

export default function LoginModal(props: any) {
  const [visible, setVisible] = React.useState(props.visible);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailInputHasError, setEmailInputHasError] = useState(false);
  const [passwordInputHasError, setPasswordInputHasError] = useState(false);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const handleLogin = () => {
    let emailInput = document.getElementById("emailInput") as HTMLInputElement;
    let passInput = document.getElementById("passInput") as HTMLInputElement;
    if (!email) {
      setEmailInputHasError(true);
      emailInput.focus();
    } else if (!password) {
      setPasswordInputHasError(true);
      passInput.focus();
    } else if (!email && !password) {
      setEmailInputHasError(true);
      setPasswordInputHasError(true);
      emailInput.focus();
    } else {
      props.emailPass({ email: email, pass: password });
    }
  };



  

  return (
    <div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={props.visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to .
            <Text b size={18}>
              My App
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            id="emailInput"
            bordered
            required
            fullWidth
            color={emailInputHasError ? "error" : "primary"}
            size="lg"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailInputHasError(false);
            }}
            placeholder="Email"
            contentLeft={<Mail fill="currentColor" />}
          />
          <Input.Password
            id="passInput"
            bordered
            fullWidth
            color={passwordInputHasError ? "error" : "primary"}
            size="lg"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordInputHasError(false);
            }}
            placeholder="Password"
            contentLeft={<Password fill="currentColor" />}
          />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto light>
            <Link to="/signup">SignUp</Link>
          </Button>
          <Button auto color="secondary" onClick={handleLogin}>
            <Loading
              style={{ display: props.loading ? "block" : "none" }}
              type="points"
              color="currentColor"
              size="sm"
            />
            <span style={{ display: !props.loading ? "block" : "none" }}>
              Sign In
            </span>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
