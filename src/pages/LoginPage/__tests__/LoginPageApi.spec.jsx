import { MemoryRouter as Router } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "pages/LoginPage";
import { UserContextProvider } from "contexts/UserContext";
import { rest } from "msw";
import { setupServer } from "msw/node";

const fakeData = { email: "test@com.ua", password: "secret" };
const mockToken = "12345";

const mockLogin = jest.fn();
jest.mock("contexts/UserContext", () => ({
  useLogin: () => mockLogin,
}));

const mockHistory = { push: jest.fn() };
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => mockHistory,
}));

const server = setupServer(
  rest.post("/api/auth", async (req, res, ctx) => {
    return res(ctx.json({ token: mockToken }));
  })
);

beforeAll(() => {
  server.listen();
});
afterAll(() => {
  server.close();
  jest.restoreAllMocks();
});

test("should correct render", async () => {
  render(
    <Router>
      <LoginPage />
    </Router>,
    { wrapper: UserContextProvider }
  );
  const emailEl = screen.getByLabelText(/email/i);
  const passwordEl = screen.getByLabelText(/password/i);
  const btnEl = screen.getByText(/login/i);

  userEvent.type(emailEl, fakeData.email);
  userEvent.type(passwordEl, fakeData.password);

  expect(emailEl).toHaveValue(fakeData.email);
  expect(passwordEl).toHaveValue(fakeData.password);

  userEvent.click(btnEl);

  await waitFor(() => expect(mockLogin).toHaveBeenCalledTimes(1));
  expect(mockLogin).toHaveBeenCalledWith(mockToken);

  expect(mockHistory.push).toHaveBeenCalledTimes(1);
  expect(mockHistory.push).toHaveBeenCalledWith("/films");
});
