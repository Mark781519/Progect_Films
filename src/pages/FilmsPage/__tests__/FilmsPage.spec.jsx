import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { AppProviders } from "contexts";
import FilmsPage from "pages/FilmsPage";

import { rest } from "msw";
import { setupServer } from "msw/node";

const mockFilms = [
  {
    _id: "1",
    title: "Road to Hell",
    director: "Roberto D'Antona",
    duration: 110,
    price: 76,
    img: "/img/roadtohell.jpg",
    featured: false,
    description: "Three robbers",
  },
];
const mockUserState = { token: "12345", role: "admin" };

jest.mock("contexts/UserContext", () => ({
  ...jest.requireActual("contexts/UserContext"),
  useUserState: () => mockUserState,
}));

const server = setupServer(
  rest.get("/api/authfilms", async (req, res, ctx) => {
    return res(ctx.json({ films: mockFilms }));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

test("should render admin buttons", async () => {
  render(<FilmsPage />, { wrapper: AppProviders });
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  expect(screen.queryByTestId("admin-buttons")).toBeInTheDocument();
});

test("should render spinner", async () => {
  server.use(
    rest.get("/api/authfilms", async (req, res, ctx) => {
      return res(ctx.json({ films: [] }));
    })
  );
  render(<FilmsPage />, { wrapper: AppProviders });
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  expect(screen.queryByLabelText("message")).toBeInTheDocument();
});
