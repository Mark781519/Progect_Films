import { MemoryRouter as Router } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "pages/LoginPage/components/LoginForm";
import faker from "faker";

const buildFormData = (overiddes) => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  ...overiddes,
});

test("should ivoke handleChange", () => {
  render(
    <Router>
      <LoginForm />
    </Router>
  );
  const { email, password } = buildFormData();

  const emailEl = screen.getByLabelText(/email/i);
  const passwordEl = screen.getByLabelText(/password/i);

  fireEvent.change(emailEl, { target: { value: email } });
  fireEvent.change(passwordEl, { target: { value: password } });

  expect(emailEl).toHaveValue(email);
  expect(passwordEl).toHaveValue(password);
});

test("should invoke submit", () => {
  const submit = jest.fn(() => Promise.resolve());
  render(
    <Router>
      <LoginForm submit={submit} />
    </Router>
  );
  const { email, password } = buildFormData();

  const form = screen.getByTestId("login-form");
  const emailEl = screen.getByLabelText(/email/i);
  const passwordEl = screen.getByLabelText(/password/i);
  const btnEl = screen.getByText(/login/i);

  userEvent.type(emailEl, email);
  userEvent.type(passwordEl, password);
  userEvent.click(btnEl);

  expect(submit).toHaveBeenCalledTimes(1);
  expect(submit).toHaveBeenCalledWith({ email, password });
  expect(form).toHaveClass("loading");
});

test("should show error mesage", () => {
  const submit = jest.fn(() => Promise.resolve());

  render(
    <Router>
      <LoginForm submit={submit} />
    </Router>
  );

  const emailEl = screen.getByLabelText(/email/i);
  const passwordEl = screen.getByLabelText(/password/i);
  const btnEl = screen.getByText(/login/i);

  userEvent.type(emailEl, "not correct email");
  userEvent.type(passwordEl, "secret");
  userEvent.click(btnEl);

  const formMsg = screen.queryByRole("alert");
  expect(formMsg).not.toBeEmptyDOMElement();
  //expect(formMsg).toBeNull();
});
