import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorVisible } from "../redux/ErrorVisibleSlice";
import { RootState } from "../redux/store";
import "./Styles/Alert.css";

interface IAlert {
  backgroundColor: string;
  errorHead: string;
  errorDesc: string;
  color: string;
}

export default function Alert(props: IAlert) {
  const visible = useSelector((state: RootState) => state.errorVisible.value);
  const dispatch = useDispatch();

  return (
    <>
      <div
        className="alert"
        style={{
          display: visible ? "block" : "none",
          backgroundColor: props.backgroundColor,
          color: props.color,
        }}
      >
        <span
          className="closebtn"
          onClick={() => dispatch(setErrorVisible(false))}
        >
          &times;
        </span>
        <strong>{props.errorHead} </strong>
        {props.errorDesc}
      </div>
    </>
  );
}
