/** @format */
import React from "react";
import { render } from "react-dom";
import "./app.css";

export function App() {
  return <div>Test qweq 33</div>;
}
const domElement = document.getElementById("root");
render(<App />, domElement);
