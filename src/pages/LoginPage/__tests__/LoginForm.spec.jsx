import React from "react";
import ReactDOM from "react-dom";
import LoginForm from "pages/LoginPage/components/LoginForm";

test("should correct render LoginForm", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LoginForm />, div);
});
